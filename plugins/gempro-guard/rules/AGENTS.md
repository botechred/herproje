# Rules: gempro-guard

## Autonomous Goal Execution & Token Efficiency (Kesintisiz Çalışma)
- **Otonom Hedef Odaklılık (/goal Uyumlu):** Verilen işi veya hedefi ara onay beklemeden, duraksamadan uçtan uca tamamla. Yapay dur-bekle engelleri yoktur.
- **Paralel & Alt Ajanlar (Serbest):** Görev gerektirdiğinde veya bağımsız paralel iş parçalarında alt ajanlar (subagents), paralel oturumlar ve swarm serbestçe kullanılabilir; sonuçlar ana oturumda birleştirilip doğrulanır.
- **Targeted Reads & No Broad Scans:** Tüm projeyi tarama; yalnızca ilgili 1-3 dosyayı hedefli satır aralığıyla oku (`StartLine`/`EndLine`).
- **Scope Creep Guard:** Tahmin edilenden büyük mimari bir engel çıkarsa veya harici müdahale gerekirse bildir.
- **Scoped Testing:** Testlerde yalnızca değişiklikle doğrudan ilgili olanları çalıştır.
- **Kesintisiz Faz Akışı:** Keşif -> Uygulama -> Doğrulama adımlarını duraksamadan birbirine bağla; iş bitince `HANDOFF.md` dosyasını güncelle ve tamamlandı bildir.
- **Single-Task Session Boundary:** Uygulama/özellik bitince aynı oturumda başka özellik başlatma; yeni oturum veya `/compact` öner.
- **Lean Outputs & Terse Updates:** Çıktıları tight/rtk ile tut; `HANDOFF.md` ve commit mesajlarını kısa tut.

## Execution & Session Handshake
- **Açılış Ritüeli & Görev:** `HANDOFF.md` dosyasını oku, bağlamı al ve eğer bir hedef/görev verildiyse durup beklemeden doğrudan icraya başla.
- **Kapanış Ritüeli ("Bu oturumu bitiriyoruz..." veya "kapat" / "/kapat"):** Yeni kod yazma veya test koşma. `HANDOFF.md` dosyasını 3-4 maddede özetleyip güncelle ve oturumu kapat.
