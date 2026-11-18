# Project Guidelines: {{PROJE}}

## Session Opening Checklist (priority order)
1. Read `HANDOFF.md` and this `AGENTS.md`; understand current state before acting.
2. Confirm the task, expected outcome, and scope with the user; avoid unrelated work.
3. For broad or multi-file tasks, present a plan first; handle small, clear tasks directly.
4. Use RTK wrappers for long/repetitive command output (`rtk rg`, `rtk test`, `rtk git`, etc.); batch short commands. RTK is not automatic in ZCode.
5. Keep unrelated tasks in separate sessions; compact long context or hand off to a fresh session.
6. At task/session end, update `HANDOFF.md` with concise state, next steps, blockers, and verification results.

## Token Frugality & Circuit Breaker (Strict)
- **Zero Subagents:** Alt ajan, paralel oturum ve arka plan görevi başlatma. Tek oturumda çöz.
- **Targeted Reads & No Broad Scans:** Tüm projeyi tarama; yalnızca ilgili 1-3 dosyayı hedefli satır aralığıyla oku (`StartLine`/`EndLine`).
- **5-Step Circuit Breaker:** En fazla 5 araç adımından sonra bulguları ve sonraki adımı özetleyip dur, onay bekle.
- **Scope Creep Guard:** Tahmin edilenden büyük iş çıkarsa veya kapsam büyürse uygulamadan önce durup bildir.
- **Scoped Testing:** Testlerde yalnızca değişiklikle doğrudan ilgili olanları çalıştır.
- **Single-Task Session Boundary:** Uygulama bitince aynı oturumda başka özellik başlatma; yeni oturum veya `/compact` öner.
- **Lean Outputs & Terse Updates:** Çıktıları tight/rtk ile tut; HANDOFF ve commit mesajlarını kısa tut.

## 3-Phase Execution Protocol
- **Phase 1 (Handoff Okuma):** Yalnızca `HANDOFF.md` oku, durumu özetle ve HEMEN DUR. Asla kendi kendine dosya tarama veya değişiklik yapma.
- **Phase 2 (Odaklı İş):** Yalnızca verilen tek görevi yap; ilgili 1-3 dosyayı düzenle. Kapsam büyürse DUR ve bildir. Deploy veya refactor yapma. İlgili testi koş ve dur.
- **Phase 3 (Güvenli Deploy):** Yalnızca zorunlu tek ön kontrolü ve tek son kontrolü yap. Deploy hatasında kod düzeltme döngüsüne girme; hatayı bildir, DUR ve talimat bekle.

## Session Handshake Protocol (Açılış & Kapanış Sözleşmesi)
- **Kapanış Ritüeli ("Bu oturumu bitiriyoruz..." veya "kapat" / "/kapat"):** Yeni kod yazma/test koşma. `HANDOFF.md` dosyasını 3-4 maddede özetleyip güncelle ve oturumu kapat.
- **Açılış Ritüeli ("HANDOFF.md dosyasını oku..." veya "devam" / "/devam"):** Yalnızca `HANDOFF.md` oku. Durumu ve sıradaki adımı 3 maddede özetle; "Hazırım, başlayabiliriz" diyerek bekle.


## Quick Tool Paths (Shared Devstack)
- **Toolbox Root:** `%DEVSTACK%` = `%DEVSTACK%`
- **PATH Shim:** `%USERPROFILE%\bin` (already on PATH)
- **Archive:** `%DEVSTACK%\tools\7z\7za.exe` or `7z`
- **Secrets Audit:** `%DEVSTACK%\tools\gitleaks\gitleaks.exe`
- **Backup:** `%DEVSTACK%\scripts\backup.ps1 {{PROJE}} <label> -Minimal`

## Lifecycle & Operational Rules
- Lifecycle: `UNDERSTAND` → `PLAN` → `IMPLEMENT` → `VERIFY`.
- Understand live workspace before edit; minimal safe changes; single writer.
- Empirical verification: never claim tests/build pass without running them.
- Windows & PowerShell discipline; UTF-8 output.
- User communication: Warm, everyday Turkish.

## Session Handoff & Tasks
- Start with `HANDOFF.md` and `AGENTS.md`; then read only the relevant active task file, never the full task archive.
- For each meaningful task, create a concise `tasks/active/YYYYMMDD-short-title.md` from `tasks/_template.md`; update only on meaningful progress, decisions, blockers, or verification.
- On completion, record outcome/tests and move the task file to `tasks/archive/YYYY/`.
- Keep `HANDOFF.md` as the brief current-state pointer to active task(s); keep `DEV-LOG.md` for meaningful completed changes. Avoid duplicate details.
- End every session by tersely updating the active task (if any) and `HANDOFF.md`.
