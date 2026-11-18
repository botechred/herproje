# Project Guidelines: herproje

## Token Frugality & Circuit Breaker (Strict)
- **Zero Subagents:** Alt ajan, paralel oturum ve arka plan görevi başlatma. Tek oturumda çöz.
- **Targeted Reads & No Broad Scans:** Tüm projeyi tarama; yalnızca ilgili 1-3 dosyayı hedefli satır aralığıyla oku (`StartLine`/`EndLine`).
- **5-Step Circuit Breaker:** En fazla 5 araç adımından sonra bulguları ve sonraki adımı özetleyip dur, onay bekle.
- **Scope Creep Guard:** Tahmin edilenden büyük iş çıkarsa veya kapsam büyürse uygulamadan önce durup bildir.
- **Scoped Testing:** Testlerde yalnızca değişiklikle doğrudan ilgili olanları çalıştır.
- **Single-Task Session Boundary:** Uygulama bitince aynı oturumda başka özellik başlatma; yeni oturum veya `/compact` öner.
- **Lean Outputs & Terse Updates:** Çıktıları tight/rtk ile tut; `HANDOFF.md` ve commit mesajlarını kısa tut.

## 3-Phase Execution Protocol
- **Phase 1 (Handoff Okuma):** Yalnızca `HANDOFF.md` oku, durumu özetle ve HEMEN DUR. Asla kendi kendine dosya tarama veya değişiklik yapma.
- **Phase 2 (Odaklı İş):** Yalnızca verilen tek görevi yap; ilgili 1-3 dosyayı düzenle. Kapsam büyürse DUR ve bildir. Deploy veya refactor yapma. İlgili testi koş ve dur.
- **Phase 3 (Güvenli Deploy):** Yalnızca zorunlu tek ön kontrolü ve tek son kontrolü yap. Deploy hatasında kod düzeltme döngüsüne girme; hatayı bildir, DUR ve talimat bekle.

## Session Handshake Protocol (Açılış & Kapanış Sözleşmesi)
- **Kapanış Ritüeli ("Bu oturumu bitiriyoruz..." veya "kapat" / "/kapat"):** Yeni kod yazma veya test koşma. `HANDOFF.md` dosyasını 3-4 maddede özetleyip güncelle ve oturumu kapat.
- **Açılış Ritüeli ("HANDOFF.md dosyasını oku..." veya "devam" / "/devam"):** Yalnızca `HANDOFF.md` oku. Durumu ve sıradaki adımı 3 maddede özetle; "Hazırım, başlayabiliriz" diyerek bekle.

## Repo Layout & Portable Paths
- **Scripts:** `scripts/new-project.ps1`, `scripts/apply-token-guard.js`, `scripts/validate-structure.ps1`, `scripts/generate-icons.py`
- **Starter Templates:** `templates/{starter-webpage,starter-webapp,starter-desktop,starter-android,proje-temeli-minimal}`
- **Web Snippets:** `snippets/web/{ui-kit.js,storage.js}`
- **Toolbox Env (Optional):** `%DEVSTACK%` tanımlıysa ortak yerel araçlarla senkronize çalışır.

## Design & Quality Conventions
- **UI Contract:** CSS `:root` tokenlarına sadık kal; WCAG AA kontrast, `:focus-visible` ve `prefers-reduced-motion` desteğini koru. Mor/mavi AI gradyanı ve stock kart ızgaralarından kaçın.
- **Secrets:** Asla gizli anahtar/token commit etme; şüphede `gitleaks detect --source .` çalıştır.
- **Commits:** `feat:` / `fix:` / `chore:` / `docs:` ön ekleri ile tek konulu commit at.
