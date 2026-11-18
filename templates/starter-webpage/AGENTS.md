# Project Guidelines: {{PROJE}} (Webpage / Digital Tool)

## Token Frugality & Circuit Breaker (Strict)
- **Zero Subagents:** Alt ajan, paralel oturum ve arka plan görevi başlatma. Tek oturumda çöz.
- **Targeted Reads & No Broad Scans:** Tüm projeyi tarama; yalnızca ilgili 1-3 dosyayı hedefli satır aralığıyla oku (`StartLine`/`EndLine`).
- **5-Step Circuit Breaker:** En fazla 5 araç adımından sonra bulguları ve sonraki adımı özetleyip dur, onay bekle.
- **Scope Creep Guard:** Tahmin edilenden büyük iş çıkarsa veya kapsam büyürse uygulamadan önce durup bildir.
- **Scoped Testing:** Testlerde yalnızca değişiklikle doğrudan ilgili olanları çalıştır.
- **Single-Task Session Boundary:** Uygulama bitince aynı oturumda başka özellik başlatma; yeni oturum veya `/compact` öner.
- **Lean Outputs & Terse Updates:** Çıktıları tight/rtk ile tut; HANDOFF ve commit mesajlarını kısa tut.

## Lean App & Design Architecture (Minimum Token, Premium UI)
- **250-Line Module Cap:** Hiçbir kaynak dosyayı 250 satırı geçirme; büyüyen mantığı küçük modüllere (`ui.js`, `store.js`, `api.js`) ayır.
- **Zero-Bloat Stack:** Sıfır paket (Vanilla HTML5 + CSS Variables + ES6+). Kullanıcı açıkça istemedikçe npm/bundler kurma.
- **Snippet Reuse:** Modal, toast, tablo filtreleme ve yerel depolama için sıfırdan yazmak yerine `%DEVSTACK%\snippets\web\` altındaki hazır modülleri kullan.
- **Design Standard:** `style.css` içindeki `:root` tokenlarına sadık kal. Mor/mavi yapay zeka gradyanları ve tekdüze kart ızgaraları kullanma; WCAG AA kontrast, `:focus-visible` ve `prefers-reduced-motion` desteğini koru.

## 3-Phase Execution Protocol
- **Phase 1 (Handoff Okuma):** Yalnızca `HANDOFF.md` oku, durumu özetle ve HEMEN DUR. Asla kendi kendine dosya tarama veya değişiklik yapma.
- **Phase 2 (Odaklı İş):** Yalnızca verilen tek görevi yap; ilgili 1-3 dosyayı düzenle. Kapsam büyürse DUR ve bildir. Deploy veya refactor yapma. İlgili testi koş ve dur.
- **Phase 3 (Güvenli Deploy):** Yalnızca zorunlu tek ön kontrolü ve tek son kontrolü yap. Deploy hatasında kod düzeltme döngüsüne girme; hatayı bildir, DUR ve talimat bekle.

## Session Handshake Protocol (Açılış & Kapanış Sözleşmesi)
- **Kapanış Ritüeli ("Bu oturumu bitiriyoruz..." veya "kapat" / "/kapat"):** Yeni kod yazma/test koşma. `HANDOFF.md` dosyasını 3-4 maddede özetleyip güncelle ve oturumu kapat.
- **Açılış Ritüeli ("HANDOFF.md dosyasını oku..." veya "devam" / "/devam"):** Yalnızca `HANDOFF.md` oku. Durumu ve sıradaki adımı 3 maddede özetle; "Hazırım, başlayabiliriz" diyerek bekle.

## Quick Tool Paths (Shared Devstack)
- **Toolbox Root:** `%DEVSTACK%` = `%DEVSTACK%`
- **Web Snippets:** `%DEVSTACK%\snippets\web` (`ui-kit.js`, `storage.js`)
- **PATH Shim:** `%USERPROFILE%\bin` (already first on PATH)
- **Archive Tool:** `%DEVSTACK%\tools\7z\7za.exe` or `7z`
- **Secrets Audit:** `%DEVSTACK%\tools\gitleaks\gitleaks.exe`
- **Minimal Backup:** `%DEVSTACK%\scripts\backup.ps1 {{PROJE}} <label> -Minimal`
