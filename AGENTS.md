# Project Guidelines: herproje

## Autonomous Goal Execution & Token Efficiency (Kesintisiz Çalışma)
- **Otonom Hedef Odaklılık (/goal Uyumlu):** Verilen işi veya hedefi ara onay beklemeden, duraksamadan uçtan uca tamamla. Yapay dur-bekle engelleri yoktur.
- **Paralel & Alt Ajanlar (Serbest):** Görev gerektirdiğinde veya bağımsız paralel iş parçalarında alt ajanlar (subagents), paralel oturumlar ve swarm serbestçe kullanılabilir; sonuçlar ana oturumda toplanıp doğrulanır.
- **Targeted Reads & No Broad Scans:** Tüm projeyi tarama; yalnızca ilgili 1-3 dosyayı hedefli satır aralığıyla oku (`StartLine`/`EndLine`).
- **Scope Creep Guard:** Tahmin edilenden büyük mimari bir engel çıkarsa veya harici müdahale gerekirse bildir.
- **Scoped Testing:** Testlerde yalnızca değişiklikle doğrudan ilgili olanları çalıştır.
- **Kesintisiz Faz Akışı:** Keşif -> Uygulama -> Doğrulama adımlarını duraksamadan birbirine bağla; iş bitince `HANDOFF.md` dosyasını güncelle ve tamamlandı bildir.
- **Single-Task Session Boundary:** Uygulama/özellik bitince aynı oturumda başka özellik başlatma; yeni oturum veya `/compact` öner.
- **Lean Outputs & Terse Updates:** Çıktıları tight/rtk ile tut; `HANDOFF.md` ve commit mesajlarını kısa tut.

## Execution & Session Handshake
- **Açılış Ritüeli & Görev:** `HANDOFF.md` dosyasını oku, bağlamı al ve eğer bir hedef/görev verildiyse durup beklemeden doğrudan icraya başla.
- **Kapanış Ritüeli ("Bu oturumu bitiriyoruz..." veya "kapat" / "/kapat"):** Yeni kod yazma veya test koşma. `HANDOFF.md` dosyasını 3-4 maddede özetleyip güncelle ve oturumu kapat.

## Repo Layout & Portable Paths
- **Scripts:** `scripts/new-project.ps1`, `scripts/apply-token-guard.js`, `scripts/validate-structure.ps1`, `scripts/generate-icons.py`
- **Starter Templates:** `templates/{starter-webpage,starter-webapp,starter-desktop,starter-android,proje-temeli-minimal}`
- **Web Snippets:** `snippets/web/{ui-kit.js,storage.js}`
- **Toolbox Env (Optional):** `%DEVSTACK%` tanımlıysa ortak yerel araçlarla senkronize çalışır.

## Design & Quality Conventions
- **UI Contract:** CSS `:root` tokenlarına sadık kal; WCAG AA kontrast, `:focus-visible` ve `prefers-reduced-motion` desteğini koru. Mor/mavi AI gradyanı ve stock kart ızgaralarından kaçın.
- **Secrets:** Asla gizli anahtar/token commit etme; şüphede `gitleaks detect --source .` çalıştır.
- **Commits:** `feat:` / `fix:` / `chore:` / `docs:` ön ekleri ile tek konulu commit at.


## Quick Tool Paths (Portable Devstack / herproje)
- **Toolbox Env:** `%DEVSTACK%` (isteğe bağlı ortak araç kutusu)
- **PATH Shim:** `%USERPROFILE%\bin` (varsa PATH öncelikli)
- **Archive Tool:** `%DEVSTACK%\tools\7z\7za.exe` or `7z`
- **Secrets Audit:** `%DEVSTACK%\tools\gitleaks\gitleaks.exe`
- **Minimal Backup:** `%DEVSTACK%\scripts\backup.ps1 herproje <label> -Minimal`
