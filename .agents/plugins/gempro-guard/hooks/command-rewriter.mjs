#!/usr/bin/env node
import fs from 'node:fs';

function main() {
  let raw = '';
  try {
    raw = fs.readFileSync(0, 'utf8');
  } catch {
    process.stdout.write(JSON.stringify({ decision: 'allow' }));
    return;
  }

  if (!raw.trim()) {
    process.stdout.write(JSON.stringify({ decision: 'allow' }));
    return;
  }

  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    process.stdout.write(JSON.stringify({ decision: 'allow' }));
    return;
  }

  const toolName = data.toolCall?.name || '';
  if (toolName !== 'run_command') {
    process.stdout.write(JSON.stringify({ decision: 'allow' }));
    return;
  }

  const origCmd = data.toolCall?.args?.CommandLine || '';
  const trimmed = origCmd.trim();

  // 1. Güvenlik Sınırı İhlali Denetimi (Zero-Token Security Gate)
  const FORBIDDEN_PATTERNS = [
    /curl.*captcha/i,
    /bypass.*turnstile/i,
    /mimikatz/i,
    /gitleaks.*--no-git.*--leak/i
  ];

  for (const pat of FORBIDDEN_PATTERNS) {
    if (pat.test(trimmed)) {
      process.stdout.write(JSON.stringify({
        decision: 'deny',
        reason: '⚠️ GÜVENLİK SINIRI ENGELİ (gempro-guard): Komut yetkisiz bypass veya güvenlik ilkesi ihlali içeriyor.'
      }));
      return;
    }
  }

  let rewritten = trimmed;

  // 2. RTK Token Tasarrufu Entegrasyonu (git, cargo, rg komutları)
  // Desteklenen: git status, git diff, git log, git branch, git add
  if (/^git\s+(status|diff|log|branch)(\s+.*)?$/i.test(trimmed) && !trimmed.startsWith('rtk')) {
    rewritten = `rtk ${trimmed}`;
  } else if (/^rg\s+/i.test(trimmed) && !trimmed.startsWith('rtk')) {
    rewritten = `rtk ${trimmed}`;
  }

  // 3. Kontrolsüz Geniş Taramaları Sınırlandırma
  if (trimmed === 'git status') {
    rewritten = 'rtk git status -sb';
  }

  // 4. Sonuç Üretme
  if (rewritten !== trimmed) {
    process.stdout.write(JSON.stringify({
      decision: 'allow',
      overwrite: {
        CommandLine: rewritten
      }
    }));
  } else {
    process.stdout.write(JSON.stringify({ decision: 'allow' }));
  }
}

try {
  main();
} catch {
  process.stdout.write(JSON.stringify({ decision: 'allow' }));
}
