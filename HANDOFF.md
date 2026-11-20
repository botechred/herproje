# herproje — Oturum Devri (Handoff)

> Ajanlar için: oturuma **bu dosyayı okuyarak** başla; oturumu **güncelleyerek** bitir.

## Durum (v1.1.0)

- **gempro-guard Antigravity Eklentisi:** `PreToolUse` (otomatik RTK sarmalama) ve `PreInvocation` (gempro derleyicisiyle siber-argo ve jargon arındırma) kancaları entegre edildi; `plugins/gempro-guard` ve `.agents/plugins/gempro-guard` paketlendi.
- **Otonom Hedef Odaklılık (/goal Uyumlu):** 5-adımlı devre kesici ("dur, onay bekle") kaldırıldı; paralel ve alt ajanlar (subagents, swarm) serbest bırakıldı; kesintisiz uçtan uca icra akışı devreye alındı.
- **Akıllı Başlangıç Platformu:** `starter-webpage`, `starter-webapp` (PWA + Node API), `starter-desktop` (`--app` çerçevesiz masaüstü) ve `starter-android` + `proje-temeli-minimal` şablonları yeni kurallarla güncellendi.
- **Otomatik Bat Entegrasyonu:** `Yeni-Proje-Olustur.bat` ve `Token-Koruma-Aktif-Et.bat` yeni projelerin içine `.agents/plugins/gempro-guard` eklentisini ve otonom kuralları otomatik aktaracak şekilde bağlandı.

## Devam Eden

- Yok — v1.1.0 açık kaynak sürümü hazırlandı.

## Sıradaki Adımlar

1. Yeni bir uygulama başlatmak için `Yeni-Proje-Olustur.bat` çalıştırın veya `scripts\new-project.ps1` komutunu kullanın.
2. Çalışma alanındaki mevcut projeleri senkronize etmek için `Token-Koruma-Aktif-Et.bat` dosyasını çalıştırın.
3. İhtiyaca göre `templates/` ve `snippets/web/` altındaki kalıpları genişletin.

## Ortam Notları

- Yapı doğrulama: `powershell -NoProfile -ExecutionPolicy Bypass -File scripts\validate-structure.ps1`
- Kısayol dosyaları (`*.lnk`) ve Android yerel SDK ayarı (`local.properties`) bilinçli olarak `.gitignore` kapsamındadır.
