# herproje — Oturum Devri (Handoff)

> Ajanlar için: oturuma **bu dosyayı okuyarak** başla; oturumu **güncelleyerek** bitir.

## Durum (v1.0.0)

- **Akıllı Başlangıç Platformu:** `starter-webpage`, `starter-webapp` (PWA + Node API), `starter-desktop` (`--app` çerçevesiz masaüstü) ve `starter-android` + `proje-temeli-minimal` şablonları tek taşınabilir repoda toplandı.
- **Sıfır Bağımlılıklı Web Bileşenleri:** `snippets/web/ui-kit.js` (accessible modal, toast, tablo filtreleme, 3-tema değiştirici) ve `snippets/web/storage.js` (LocalStorage + JSON dışa/içe aktarma) hazırlandı.
- **Token Koruma & Protokoller:** `Token-Koruma-Aktif-Et.bat` (`scripts/apply-token-guard.js`), 3-Fazlı Çalışma Protokolü ve `/devam` / `/kapat` Session Handshake kuralları tüm şablonlara ve çalışma alanı senkronizasyonuna işlendi.
- **Taşınabilir GitHub Sürümü:** Sabit kişisel dosya yolları kaldırıldı, `assets/*.ico` (yüksek DPI çok boyutlu ikon seti) ve `Yeni-Proje-Olustur.bat` sihirbazı eklendi; `validate-structure.ps1` ile doğrulandı.

## Devam Eden

- Yok — v1.0.0 açık kaynak paylaşım paketi tamamlandı.

## Sıradaki Adımlar

1. Yeni bir uygulama başlatmak için `Yeni-Proje-Olustur.bat` çalıştırın veya `scripts\new-project.ps1` komutunu kullanın.
2. Çalışma alanındaki mevcut projeleri Token Frugality kurallarıyla senkronize etmek için `Token-Koruma-Aktif-Et.bat` dosyasını çalıştırın.
3. Yeni proje şablonlarını ihtiyaca göre `templates/` ve `snippets/web/` altında genişletin.

## Ortam Notları

- Yapı doğrulama: `powershell -NoProfile -ExecutionPolicy Bypass -File scripts\validate-structure.ps1`
- Kısayol dosyaları (`*.lnk`) ve Android yerel SDK ayarı (`local.properties`) bilinçli olarak `.gitignore` kapsamındadır.
