const fs = require('fs');
const os = require('os');
const path = require('path');
const { execSync } = require('child_process');

console.log(`\x1b[36m
      /▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓\\
     /  ████████████████████████████████   \\
    |   ██   \x1b[33m⚡ TOKEN GUARD & SAVINGS ⚡\x1b[36m   ██    |
    |   ██      \x1b[32m[ 3-PHASE PROTOCOL ]\x1b[36m      ██    |
     \\  ████████████████████████████████   /
      \\_______________ 🛡️ _______________/
\x1b[0m`);

const repoRoot = path.resolve(__dirname, '..');
const workspace = process.argv[2] ? path.resolve(process.argv[2]) : path.dirname(repoRoot);
const homeDir = os.homedir();
const geminiDir = path.join(homeDir, '.gemini');
const zcodeDir = path.join(homeDir, '.zcode');
const configJsonPath = path.join(geminiDir, 'config', 'config.json');
const geminiMdPath = path.join(geminiDir, 'GEMINI.md');
const zcodeAgentsMd = path.join(zcodeDir, 'AGENTS.md');

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
} else {
  console.log('  \x1b[90m-> Antigravity config.json bulunamadı (atlandı).\x1b[0m');
}

// 2. Global GEMINI.md ve ZCode AGENTS.md kontrolü
console.log('[2/5] Global Sistem Kuralları (Antigravity & ZCode kontrol ediliyor)...');
if (fs.existsSync(geminiMdPath)) {
  console.log('  \x1b[32m-> Antigravity (GEMINI.md) kuralları mevcut.\x1b[0m');
}
if (fs.existsSync(zcodeAgentsMd)) {
  console.log('  \x1b[32m-> ZCode (AGENTS.md) kuralları mevcut.\x1b[0m');
}

// 3. Çalışma Alanındaki Projeleri Tarama ve Koruma
console.log(`[3/5] Çalışma alanı taranıp korunuyor: ${workspace}`);

const tokenBlock = `## Token Frugality & Circuit Breaker (Strict)
- **Zero Subagents:** Alt ajan, paralel oturum ve arka plan görevi başlatma. Tek oturumda çöz.
- **Targeted Reads & No Broad Scans:** Tüm projeyi tarama; yalnızca ilgili 1-3 dosyayı hedefli satır aralığıyla oku (\`StartLine\`/\`EndLine\`).
- **5-Step Circuit Breaker:** En fazla 5 araç adımından sonra bulguları ve sonraki adımı özetleyip dur, onay bekle.
- **Scope Creep Guard:** Tahmin edilenden büyük iş çıkarsa veya kapsam büyürse uygulamadan önce durup bildir.
- **Scoped Testing:** Testlerde yalnızca değişiklikle doğrudan ilgili olanları çalıştır.
- **Single-Task Session Boundary:** Uygulama bitince aynı oturumda başka özellik başlatma; yeni oturum veya \`/compact\` öner.
- **Lean Outputs & Terse Updates:** Çıktıları tight/rtk ile tut; HANDOFF ve commit mesajlarını kısa tut.

## 3-Phase Execution Protocol
- **Phase 1 (Handoff Okuma):** Yalnızca \`HANDOFF.md\` oku, durumu özetle ve HEMEN DUR. Asla kendi kendine dosya tarama veya değişiklik yapma.
- **Phase 2 (Odaklı İş):** Yalnızca verilen tek görevi yap; ilgili 1-3 dosyayı düzenle. Kapsam büyürse DUR ve bildir. Deploy veya refactor yapma. İlgili testi koş ve dur.
- **Phase 3 (Güvenli Deploy):** Yalnızca zorunlu tek ön kontrolü ve tek son kontrolü yap. Deploy hatasında kod düzeltme döngüsüne girme; hatayı bildir, DUR ve talimat bekle.

## Session Handshake Protocol (Açılış & Kapanış Sözleşmesi)
- **Kapanış Ritüeli ("Bu oturumu bitiriyoruz..." veya "kapat" / "/kapat"):** Yeni kod yazma/test koşma. \`HANDOFF.md\` dosyasını 3-4 maddede özetleyip güncelle ve oturumu kapat.
- **Açılış Ritüeli ("HANDOFF.md dosyasını oku..." veya "devam" / "/devam"):** Yalnızca \`HANDOFF.md\` oku. Durumu ve sıradaki adımı 3 maddede özetle; "Hazırım, başlayabiliriz" diyerek bekle.`;

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

const skipExact = new Set(['.git', 'node_modules', '.devstack', '.backup']);
const items = fs.readdirSync(workspace, { withFileTypes: true });
const projects = items.filter(d =>
  d.isDirectory() &&
  !skipExact.has(d.name) &&
  !d.name.startsWith('.arsiv-') &&
  !d.name.startsWith('temp')
);

let updatedCount = 0;
let alreadyProtected = 0;

for (const p of projects) {
  const pPath = path.join(workspace, p.name);
  const bmFile = path.join(pPath, '.backup-minimal');
  if (!fs.existsSync(bmFile)) {
    fs.writeFileSync(bmFile, backupMinimalContent, 'utf8');
  }

  const agentsFile = path.join(pPath, 'AGENTS.md');
  const quickTools = `## Quick Tool Paths (Portable Devstack / herproje)
- **Starter Platform:** \`%DEVSTACK%\` (veya \${repoRoot})
- **Web Snippets:** \`${path.join(repoRoot, 'snippets', 'web')}\`
- **PATH Shim:** \`%USERPROFILE%\\bin\` (first on PATH)
- **Archive Tool:** \`%DEVSTACK%\\tools\\7z\\7za.exe\` or \`7z\`
- **Secrets Audit:** \`%DEVSTACK%\\tools\\gitleaks\\gitleaks.exe\`
- **Minimal Backup:** \`%DEVSTACK%\\scripts\\backup.ps1 ${p.name} <label> -Minimal\``;

  if (!fs.existsSync(agentsFile)) {
    const initial = `# Project Guidelines: ${p.name}\n\n${tokenBlock}\n\n${quickTools}\n`;
    fs.writeFileSync(agentsFile, initial, 'utf8');
    console.log(`  \x1b[32m[+] ${p.name}: AGENTS.md sıfırdan oluşturuldu ve korundu.\x1b[0m`);
    updatedCount++;
  } else {
    let content = fs.readFileSync(agentsFile, 'utf8');
    let needUpdate = false;

    if (!content.includes('Session Handshake Protocol')) {
      if (content.includes('## 3-Phase Execution Protocol')) {
        content = content.replace(
          /(## 3-Phase Execution Protocol[\s\S]*?- \*\*Phase 3.*?\n)/,
          `$1\n## Session Handshake Protocol (Açılış & Kapanış Sözleşmesi)\n- **Kapanış Ritüeli ("Bu oturumu bitiriyoruz..." veya "kapat" / "/kapat"):** Yeni kod yazma/test koşma. \`HANDOFF.md\` dosyasını 3-4 maddede özetleyip güncelle ve oturumu kapat.\n- **Açılış Ritüeli ("HANDOFF.md dosyasını oku..." veya "devam" / "/devam"):** Yalnızca \`HANDOFF.md\` oku. Durumu ve sıradaki adımı 3 maddede özetle; "Hazırım, başlayabiliriz" diyerek bekle.\n\n`
        );
      } else {
        content = tokenBlock + '\n\n' + content;
      }
      needUpdate = true;
    }

    if (!content.includes('Quick Tool Paths')) {
      content += '\n\n' + quickTools + '\n';
      needUpdate = true;
    }

    if (needUpdate) {
      fs.writeFileSync(agentsFile, content, 'utf8');
      console.log(`  \x1b[32m[*] ${p.name}: Session Handshake & Kurallar güncellendi.\x1b[0m`);
      updatedCount++;
    } else {
      console.log(`  \x1b[90m[OK] ${p.name}: Zaten tam korumalı.\x1b[0m`);
      alreadyProtected++;
    }
  }
}

// 4. Minimal Şablon Kontrolü
console.log('\n[4/5] Minimal Proje Şablonu Kontrol Ediliyor...');
const tplAgents = path.join(repoRoot, 'templates', 'proje-temeli-minimal', 'AGENTS.md');
if (fs.existsSync(tplAgents)) {
  let tplContent = fs.readFileSync(tplAgents, 'utf8');
  if (!tplContent.includes('Session Handshake Protocol')) {
    tplContent = tplContent.replace(
      /(## 3-Phase Execution Protocol[\s\S]*?- \*\*Phase 3.*?\n)/,
      `$1\n## Session Handshake Protocol (Açılış & Kapanış Sözleşmesi)\n- **Kapanış Ritüeli ("Bu oturumu bitiriyoruz..." veya "kapat" / "/kapat"):** Yeni kod yazma/test koşma. \`HANDOFF.md\` dosyasını 3-4 maddede özetleyip güncelle ve oturumu kapat.\n- **Açılış Ritüeli ("HANDOFF.md dosyasını oku..." veya "devam" / "/devam"):** Yalnızca \`HANDOFF.md\` oku. Durumu ve sıradaki adımı 3 maddede özetle; "Hazırım, başlayabiliriz" diyerek bekle.\n\n`
    );
    fs.writeFileSync(tplAgents, tplContent, 'utf8');
    console.log('  \x1b[32m-> proje-temeli-minimal şablonuna Session Handshake eklendi.\x1b[0m');
  } else {
    console.log('  \x1b[90m-> Şablon zaten güncel.\x1b[0m');
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
console.log(`\x1b[32m ${alreadyProtected} proje zaten korumalıydı, ${updatedCount} proje güncellendi.\x1b[0m`);
console.log('\x1b[32m Hem Antigravity hem ZCode (%100 senkronize ve korumalı)!\x1b[0m');
console.log('\x1b[36m==========================================================\x1b[0m\n');
