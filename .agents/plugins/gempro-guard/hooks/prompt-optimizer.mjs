#!/usr/bin/env node
import fs from 'node:fs';
import { getGemproCompiler } from '../lib/compiler-bridge.mjs';

async function main() {
  let raw = '';
  try {
    raw = fs.readFileSync(0, 'utf8');
  } catch {
    process.stdout.write(JSON.stringify({}));
    return;
  }

  if (!raw.trim()) {
    process.stdout.write(JSON.stringify({}));
    return;
  }

  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    process.stdout.write(JSON.stringify({}));
    return;
  }

  const userInput = String(data.lastUserInput || '').trim();
  if (!userInput) {
    process.stdout.write(JSON.stringify({}));
    return;
  }

  const cwd = data.cwd || (Array.isArray(data.workspacePaths) ? data.workspacePaths[0] : process.cwd());

  try {
    const compiler = await getGemproCompiler();
    const res = compiler.compilePrompt({
      rawPrompt: userInput,
      targetDir: cwd
    });

    if (res.status === 'blocked_boundary') {
      const reason = res.boundaryAlerts?.[0]?.message || 'Güvenlik sınırı ihlali tespit edildi.';
      process.stdout.write(JSON.stringify({
        injectSteps: [
          {
            systemMessage: {
              systemMessage: `⚠️ GÜVENLİK SINIRI ENGELİ (gempro-guard): ${reason} (0-Token kuralı gereği yerelde durduruldu).`
            }
          }
        ]
      }));
      return;
    }

    if (res.normalizations && res.normalizations.length > 0) {
      const summary = res.normalizations.map(n => `"${n.from}" -> "${n.to}"`).join(', ');
      process.stdout.write(JSON.stringify({
        injectSteps: [
          {
            systemMessage: {
              systemMessage: `🛡️ gempro Kalkanı Devrede: Siber-argo arındırıldı (${summary}). 3-Fazlı Protokol ve Token Frugality kurallarına uyarak ilerle.`
            }
          }
        ]
      }));
      return;
    }
  } catch (err) {
    // Graceful fallback: do not block agent if compiler encounters an edge case
  }

  process.stdout.write(JSON.stringify({}));
}

main().catch(() => {
  process.stdout.write(JSON.stringify({}));
});
