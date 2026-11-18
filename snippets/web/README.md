# Web Mikro-Bileşen Kasası (Sıfır Token Tekrar Kullanım)

Ajanlar standart UI ve yerel veri ihtiyaçlarında sıfırdan kod üretmek yerine bu klasördeki hazır, erişilebilir modülleri projeye kopyalayıp uyarlar:

- `ui-kit.js`: `showToast()`, `openModal()` (yerleşik `<dialog>`), `filterRows()`, `initThemeSwitcher()`
- `storage.js`: `createStore(key, initial)` — LocalStorage okuma/yazma + tek tıkla JSON dışa/içe aktarma.
