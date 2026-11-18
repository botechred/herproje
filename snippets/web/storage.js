// storage.js — Yerel veri saklama ve JSON yedekleme/geri yükleme yardımcısı

export function createStore(storageKey, initialData = []) {
  return {
    load() {
      try {
        const raw = localStorage.getItem(storageKey);
        return raw ? JSON.parse(raw) : structuredClone(initialData);
      } catch {
        return structuredClone(initialData);
      }
    },
    save(data) {
      localStorage.setItem(storageKey, JSON.stringify(data));
      return data;
    },
    exportJson(filename = `${storageKey}-yedek.json`) {
      const blob = new Blob([JSON.stringify(this.load(), null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    },
    importJson(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const parsed = JSON.parse(String(reader.result));
            this.save(parsed);
            resolve(parsed);
          } catch (err) {
            reject(new Error('Geçersiz JSON dosyası.'));
          }
        };
        reader.onerror = () => reject(new Error('Dosya okunamadı.'));
        reader.readAsText(file);
      });
    }
  };
}
