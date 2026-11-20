# herproje — Minimal-Token AI Proje Başlangıç Platformu

Yapay zeka kodlama ajanlarıyla (**Antigravity**, **ZCode**, **Cursor**, **Claude Code**, **Codex**) çalışırken **%70–85 daha az token** harcamak ve sıfır şişkinlikle modern, yüksek kaliteli **Web Sayfaları, PWA'lar, Masaüstü ve Android** uygulamaları üretmek için tasarlanmış taşınabilir başlangıç platformu.

---

## Neden `herproje`?

Standart proje şablonları onlarca boş doküman, ağır framework bağımlılıkları ve dağınık dosya ağaçlarıyla ajanların her turda binlerce gereksiz token yakmasına yol açar. `herproje` bu sorunu üç katmanda çözer:

1. **5 Çekirdek Dosya Disiplini:** Gereksiz bürokrasi yerine yalnızca `AGENTS.md`, `HANDOFF.md`, `README.md`, `.gitignore` ve `.backup-minimal`.
2. **Hazır Başlangıç Kalıpları & Snippets:** Sıfır npm bağımlılıklı HTML5 + 3 WCAG AA temalı CSS + modüler ES6+ bileşenler (`ui-kit.js`, `storage.js`).
3. **Otonom Hedef Odaklılık & gempro Kalkanı:** `/goal` ile tam uyumlu kesintisiz icra, paralel & alt ajan serbestliği, otomatik RTK sarmalama ve siber-argo arındırma.

---

## 5 Hazır Başlangıç Şablonu (`templates/`)

| Tür (`-Type`) | Klasör | Stack & Özellikler |
|---|---|---|
| `webpage` *(Varsayılan)* | `templates/starter-webpage` | Sıfır paketli HTML5 + WCAG AA 3-tema `style.css` + modüler `app.js` + tek tık `Calistir.bat` |
| `webapp` | `templates/starter-webapp` | Kurulabilir PWA (`manifest.json`, `sw.js`) + sıfır bağımlılıklı Node HTTP/JSON API sunucusu (`server.js`) |
| `desktop` | `templates/starter-desktop` | Yerel Node motoru + Chrome/Edge `--app` çerçevesiz masaüstü pencere başlatıcısı |
| `android` | `templates/starter-android` | Yerel SDK otomatik bağlantılı (`local.properties.example`) yalın Android/Kotlin iskeleti |
| `minimal` | `templates/proje-temeli-minimal` | Genel amaçlı ultra-hafif 5 çekirdek kural dosyası |

### Dahili 3 WCAG AA Tema Sistemi
Web ve masaüstü şablonları yapay zeka klişelerinden (mor/mavi gradyanlar, stok kart ızgaraları) arındırılmış 3 hazır `:root` CSS temasıyla gelir:
- **Editorial (Varsayılan):** Okunabilirliği yüksek sıcak kâğıt & mürekkep kontrastı
- **Obsidian:** Düşük göz yorgunluklu koyu çalışma yüzeyi
- **Warm:** Yumuşak krem ve terracotta vurgular
- Tüm arayüzlerde `:focus-visible`, semantik `<dialog>` ve `prefers-reduced-motion` desteği standarttır.

---

## Hızlı Başlangıç

### 1. Tek Tık Sihirbazı ile Yeni Proje Oluşturma
Depoyu klonlayın ve kökteki `Yeni-Proje-Olustur.bat` dosyasına çift tıklayın (3 kısa soru: Proje Adı, Türü, 1 cümlelik Hedef).

### 2. Komut Satırından (CLI) Doğrudan Kurulum
```powershell
# Varsayilan modern web sayfasi / arac
.\scripts\new-project.ps1 -Name teklif-studyo -Type webpage -Goal "Musteri teklif hesaplayici"

# PWA Web Uygulamasi (Node API + Service Worker)
.\scripts\new-project.ps1 -Name gorev-panosu -Type webapp -Goal "Ekip gorev ve not uygulamasi"

# Cercevesiz Masauestu Uygulamasi
.\scripts\new-project.ps1 -Name hizli-fatura -Type desktop -Goal "Yerel fatura arsiv araci"
```
> Varsayılan olarak yeni projeler `herproje` klasörünün bir üst dizininde (ör. çalışma alanınızda) oluşturulur; farklı bir dizin için `-Parent C:\Projelerim` parametresini kullanabilirsiniz.

---

## Token Koruma Kalkanı & Otonom İcra Protokolleri

Kökteki `Token-Koruma-Aktif-Et.bat` (veya `node scripts/apply-token-guard.js [calisma-alani]`) şunları otomatik uygular:

- Çalışma alanındaki tüm projelere **Autonomous Goal Execution & Token Efficiency** kurallarını enjekte eder.
- Projelere `.agents/plugins/gempro-guard` eklentisini dağıtır (otomatik RTK sarmalama ve siber-argo arındırma).
- Varsa Antigravity (`~/.gemini/config/config.json`) ve ZCode (`~/.zcode/AGENTS.md`) yapılandırmalarını doğrular.
- Eksik projelere `.backup-minimal` ve `AGENTS.md` ekler.

### Yapay Zeka Ajanları ile Çalışma Ritüeli
- **Oturum Açılışı & Hedef:** Ajan sohbetine `/devam`, `HANDOFF.md oku` veya doğrudan görevinizi verin; ajan durup onay beklemeden hedefe başlar ve sonuca kadar kesintisiz ilerler.
- **Otonom Hedef Odaklılık:** `/goal` ile tam uyumludur; yapay 5-adım duraklamaları yoktur. Araştırma ve paralel işler için alt ajanları (subagents/swarm) serbestçe kullanır.
- **Oturum Kapanışı:** `/kapat` veya `Bu oturumu bitiriyoruz` dediğinizde ajan yeni kod yazmadan `HANDOFF.md` dosyasını günceller.

---

## Sıfır Bağımlılıklı Web Snippets (`snippets/web/`)

Yeni özellik yazarken sıfırdan kod ürettirmek yerine hazır modülleri kullanın:
- [`snippets/web/ui-kit.js`](snippets/web/ui-kit.js): `showToast`, erişilebilir `<dialog>` tabanlı `openModal`, `filterRows`, `initThemeSwitcher`
- [`snippets/web/storage.js`](snippets/web/storage.js): `createStore` (LocalStorage kalıcılığı + tek tık JSON yedek alma/geri yükleme)

---

## Depo Yapısı

```text
herproje/
├── Yeni-Proje-Olustur.bat      # 3 soruluk interaktif proje kurulum sihirbazi
├── Token-Koruma-Aktif-Et.bat   # Calisma alani token koruma senkronizasyonu
├── AGENTS.md                   # Yapay zeka ajan kurallari ve otonom icra protokolu
├── HANDOFF.md                  # Guncel surum ve devir-teslim durumu
├── LICENSE                     # MIT Lisansi
├── assets/                     # Cok boyutlu yuksek DPI .ico ikon seti (16-256px)
├── plugins/gempro-guard/       # Antigravity komut donusturucu ve prompt optimize edici
├── scripts/
│   ├── new-project.ps1         # Akilli proje olusturucu
│   ├── apply-token-guard.js    # Token koruma ve eklenti dagitim motoru
│   ├── generate-icons.py       # Pillow vektor-tarzi ICO ureticisi
│   └── validate-structure.ps1  # Platform yapi dogrulayici
├── snippets/web/               # Yeniden kullanilabilir JS mikro-moduller
└── templates/                  # 5 hazir baslangic sablonu
```

### Doğrulama
```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\validate-structure.ps1
```

## Lisans
Bu proje [MIT Lisansı](LICENSE) altında sunulmaktadır.
