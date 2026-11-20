const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

console.log(`\x1b[36m
      /▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓\\
     /  ████████████████████████████████   \\
    |   ██   \x1b[33m⚡ TOKEN GUARD & SAVINGS ⚡\x1b[36m   ██    |
    |   ██      \x1b[32m[ 3-PHASE PROTOCOL ]\x1b[36m      ██    |
     \\  ████████████████████████████████   /
      \\_______________ 🛡️ _______________/
\x1b[0m`);

const workspace = 'C:\\Users\\Admin\\Desktop\\My_PROJE';
const geminiDir = 'C:\\Users\\Admin\\.gemini';
const zcodeDir = 'C:\\Users\\Admin\\.zcode';
const configJsonPath = path.join(geminiDir, 'config', 'config.json');
const geminiMdPath = path.join(geminiDir, 'GEMINI.md');
const zcodeAgentsMd = path.join(zcodeDir, 'AGENTS.md');

function copyDirRecursive(src, dst) {
  if (!fs.existsSync(src)) return false;
  if (!fs.existsSync(dst)) {
    fs.mkdirSync(dst, { recursive: true });
  }
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (['node_modules', '.git'].includes(entry.name)) continue;
    const sPath = path.join(src, entry.name);
    const dPath = path.join(dst, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(sPath, dPath);
    } else if (entry.isFile()) {
      fs.copyFileSync(sPath, dPath);
    }
  }
  return true;
}

// 1. Ağır eklentileri kapatma
console.log('[1/5] Global Eklenti Kontrolü (Gereksiz token yakanlar kapatılıyor)...');
if (fs.existsSync(configJsonPath)) {
  try {
    const raw = fs.readFileSync(configJsonPath, 'utf8');
    const cfg = JSON.parse(raw);
    const heavy = ['android-cli-plugin', 'firebase', 'gemini-api', 'google-antigravity-sdk'];
    let changed = false;
    if (cfg.plugins) {
      for (const h of heavy) {
        if (cfg.plugins[h] && cfg.plugins[h].enabled === true) {
          cfg.plugins[h].enabled = false;
          changed = true;
        }
      }
    }
    if (changed) {
      fs.writeFileSync(configJsonPath, JSON.stringify(cfg, null, 2), 'utf8');
      console.log('  \x1b[32m-> Ağır eklentiler kapatıldı (android, firebase, gemini-api, sdk).\x1b[0m');
    } else {
      console.log('  \x1b[32m-> Eklentiler zaten optimize durumda (Kapalı).\x1b[0m');
    }
  } catch (err) {
    console.error('  \x1b[31m-> config.json okunamadı:\x1b[0m', err.message);
  }
}

// 2. Global GEMINI.md ve ZCode AGENTS.md kontrolü
console.log('[2/5] Global Sistem Kuralları (Antigravity & ZCode kontrol ediliyor)...');
if (fs.existsSync(geminiMdPath)) {
  console.log('  \x1b[32m-> Antigravity (GEMINI.md) kuralları tam ve aktif.\x1b[0m');
}
if (fs.existsSync(zcodeAgentsMd)) {
  console.log('  \x1b[32m-> ZCode (AGENTS.md + /kapat, /devam) kuralları tam ve aktif.\x1b[0m');
}

// 3. Proje Taraması, Koruması ve gempro-guard Eklenti Dağıtımı
console.log('[3/5] My_PROJE altındaki projeler taranıp korunuyor & eklenti aktarılıyor...');

const tokenBlock = `## Autonomous Goal Execution & Token Efficiency (Kesintisiz Çalışma)
- **Otonom Hedef Odaklılık (/goal Uyumlu):** Verilen işi veya hedefi ara onay beklemeden, duraksamadan uçtan uca tamamla. Yapay dur-bekle engelleri yoktur.
- **Paralel & Alt Ajanlar (Serbest):** Görev gerektirdiğinde veya bağımsız paralel iş parçalarında alt ajanlar (subagents), paralel oturumlar ve swarm serbestçe kullanılabilir; sonuçlar ana oturumda toplanıp doğrulanır.
- **Targeted Reads & No Broad Scans:** Tüm projeyi tarama; yalnızca ilgili 1-3 dosyayı hedefli satır aralığıyla oku (\`StartLine\`/\`EndLine\`).
- **Scope Creep Guard:** Tahmin edilenden büyük mimari bir engel çıkarsa veya harici müdahale gerekirse bildir.
- **Scoped Testing:** Testlerde yalnızca değişiklikle doğrudan ilgili olanları çalıştır.
- **Kesintisiz Faz Akışı:** Keşif -> Uygulama -> Doğrulama adımlarını duraksamadan birbirine bağla; iş bitince \`HANDOFF.md\` dosyasını güncelle ve tamamlandı bildir.
- **Single-Task Session Boundary:** Uygulama bitince aynı oturumda başka özellik başlatma; yeni oturum veya \`/compact\` öner.
- **Lean Outputs & Terse Updates:** Çıktıları tight/rtk ile tut; \`HANDOFF.md\` ve commit mesajlarını kısa tut.

## Execution & Session Handshake
- **Açılış Ritüeli & Görev:** \`HANDOFF.md\` dosyasını oku, bağlamı al ve eğer bir hedef/görev verildiyse durup beklemeden doğrudan icraya başla.
- **Kapanış Ritüeli ("Bu oturumu bitiriyoruz..." veya "kapat" / "/kapat"):** Yeni kod yazma veya test koşma. \`HANDOFF.md\` dosyasını 3-4 maddede özetleyip güncelle ve oturumu kapat.`;

const backupMinimalContent = `.git/
node_modules/
dist/
build/
.venv/
venv/
.pytest_cache/
__pycache__/
artifacts/
logs/
*.log
.zcode/
.claude/
*.7z
*.zip
`;

// gempro-guard eklenti kaynak dizini
const pluginSrcCandidates = [
  path.join(__dirname, '..', 'plugins', 'gempro-guard'),
  path.join(geminiDir, 'config', 'plugins', 'gempro-guard'),
  path.join(workspace, '.herproje', 'plugins', 'gempro-guard')
];
const pluginSrc = pluginSrcCandidates.find(p => fs.existsSync(p));

const items = fs.readdirSync(workspace, { withFileTypes: true });
const projects = items.filter(d => d.isDirectory() && !['.devstack', '.backup'].includes(d.name) && !d.name.startsWith('.arsiv-') && !d.name.startsWith('temp'));

let updatedCount = 0;
let alreadyProtected = 0;
let pluginsDeployed = 0;

for (const p of projects) {
  const pPath = path.join(workspace, p.name);
  const bmFile = path.join(pPath, '.backup-minimal');
  if (!fs.existsSync(bmFile)) {
    fs.writeFileSync(bmFile, backupMinimalContent, 'utf8');
  }

  // Eklentiyi projenin .agents/plugins/gempro-guard dizinine aktar
  if (pluginSrc) {
    const pPluginDst = path.join(pPath, '.agents', 'plugins', 'gempro-guard');
    const copied = copyDirRecursive(pluginSrc, pPluginDst);
    if (copied) pluginsDeployed++;
  }

  const agentsFile = path.join(pPath, 'AGENTS.md');
  const quickTools = `## Quick Tool Paths (Shared Devstack)
- **Toolbox Root:** \`%DEVSTACK%\` = \`C:\\Users\\Admin\\Desktop\\My_PROJE\\.devstack\`
- **PATH Shim:** \`C:\\Users\\Admin\\bin\` (already first on PATH)
- **Archive Tool:** \`%DEVSTACK%\\tools\\7z\\7za.exe\` or \`7z\`
- **Secrets Audit:** \`%DEVSTACK%\\tools\\gitleaks\\gitleaks.exe\`
- **Minimal Backup:** \`%DEVSTACK%\\scripts\\backup.ps1 ${p.name} <label> -Minimal\``;

  if (!fs.existsSync(agentsFile)) {
    const initial = `# Project Guidelines: ${p.name}\n\n${tokenBlock}\n\n${quickTools}\n`;
    fs.writeFileSync(agentsFile, initial, 'utf8');
    console.log(`  \x1b[32m[+] ${p.name}: AGENTS.md + .agents/plugins/gempro-guard eklendi.\x1b[0m`);
    updatedCount++;
  } else {
    let content = fs.readFileSync(agentsFile, 'utf8');
    let needUpdate = false;

    if (content.includes('5-Step Circuit Breaker') || content.includes('Phase 1 (Handoff Okuma)') || content.includes('Token Frugality & Circuit Breaker')) {
      content = content.replace(
        /## Token Frugality & Circuit Breaker[\s\S]*?(?=## Quick Tool Paths|## Repo Layout|## Lean App|$)/,
        tokenBlock + '\n\n'
      );
      needUpdate = true;
    }

    if (!content.includes('Quick Tool Paths')) {
      content += '\n\n' + quickTools + '\n';
      needUpdate = true;
    }

    if (needUpdate) {
      fs.writeFileSync(agentsFile, content, 'utf8');
      console.log(`  \x1b[32m[*] ${p.name}: Kurallar ve eklenti güncellendi.\x1b[0m`);
      updatedCount++;
    } else {
      console.log(`  \x1b[90m[OK] ${p.name}: Tam korumalı + eklenti senkronize.\x1b[0m`);
      alreadyProtected++;
    }
  }
}

// 4. Şablon Güncellemesi
console.log('\n[4/5] Proje Şablonları Güncelleniyor...');
const tplFolders = ['proje-temeli-minimal', 'starter-webpage', 'starter-webapp', 'starter-desktop', 'starter-android'];
for (const tf of tplFolders) {
  const tplAgents = path.join(__dirname, '..', 'templates', tf, 'AGENTS.md');
  if (fs.existsSync(tplAgents)) {
    let tplContent = fs.readFileSync(tplAgents, 'utf8');
    let changed = false;
    if (tplContent.includes('5-Step Circuit Breaker') || tplContent.includes('Phase 1 (Handoff Okuma)') || tplContent.includes('Token Frugality & Circuit Breaker')) {
      tplContent = tplContent.replace(
        /## Token Frugality & Circuit Breaker[\s\S]*?(?=## Quick Tool Paths|## Repo Layout|## Lean App|$)/,
        tokenBlock + '\n\n'
      );
      changed = true;
    }
    if (changed) {
      fs.writeFileSync(tplAgents, tplContent, 'utf8');
      console.log(`  \x1b[32m-> ${tf} şablonu güncellendi.\x1b[0m`);
    } else {
      console.log(`  \x1b[90m-> ${tf} şablonu zaten güncel.\x1b[0m`);
    }
  }
}

// 5. RTK Kontrolü
console.log('\n[5/5] RTK CLI Durumu Kontrol Ediliyor...');
try {
  const rtkGain = execSync('rtk gain', { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
  const firstLines = rtkGain.split('\n').slice(0, 6).join('\n     ');
  console.log('  \x1b[32m-> RTK CLI yüklü ve aktif:\x1b[0m\n     ' + firstLines);
} catch (e) {
  console.log('  \x1b[33m-> [UYARI] RTK durumu okunamadı veya kurulu değil.\x1b[0m');
}

console.log('\n\x1b[36m==========================================================\x1b[0m');
console.log(`\x1b[33m SONUÇ: Toplam ${projects.length} proje tarandı.\x1b[0m`);
console.log(`\x1b[32m ${pluginsDeployed} projeye .agents/plugins/gempro-guard eklentisi aktarıldı/senkronize edildi.\x1b[0m`);
console.log(`\x1b[32m Hem Antigravity hem ZCode (%100 senkronize ve korumalı)!\x1b[0m`);
console.log('\x1b[36m==========================================================\x1b[0m\n');
