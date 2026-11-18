// ui-kit.js — Sıfır bağımlılıklı, erişilebilir (WCAG AA) mikro UI yardımcıları
// Kullanım: Projeye kopyala veya modül olarak içe aktar.

export function showToast(message, type = 'info', durationMs = 3200) {
  let region = document.getElementById('toast-region');
  if (!region) {
    region = document.createElement('div');
    region.id = 'toast-region';
    region.className = 'toast-region';
    region.setAttribute('aria-live', 'polite');
    region.setAttribute('role', 'status');
    document.body.appendChild(region);
  }
  const item = document.createElement('div');
  item.className = `toast toast--${type}`;
  item.textContent = message;
  region.appendChild(item);
  setTimeout(() => {
    item.classList.add('is-leaving');
    setTimeout(() => item.remove(), 220);
  }, durationMs);
}

export function openModal({ title, contentHtml, onConfirm, confirmText = 'Onayla' }) {
  let dialog = document.getElementById('app-dialog');
  if (!dialog) {
    dialog = document.createElement('dialog');
    dialog.id = 'app-dialog';
    dialog.className = 'modal-dialog';
    document.body.appendChild(dialog);
  }
  dialog.innerHTML = `
    <form method="dialog" class="modal-surface">
      <header class="modal-header">
        <h2 class="modal-title">${title}</h2>
        <button type="submit" value="cancel" class="btn-ghost" aria-label="Kapat">✕</button>
      </header>
      <div class="modal-body">${contentHtml}</div>
      <footer class="modal-footer">
        <button type="submit" value="cancel" class="btn-secondary">Vazgeç</button>
        ${onConfirm ? `<button type="submit" value="confirm" class="btn-primary">${confirmText}</button>` : ''}
      </footer>
    </form>
  `;
  dialog.onclose = () => {
    if (dialog.returnValue === 'confirm' && typeof onConfirm === 'function') {
      onConfirm(dialog);
    }
  };
  dialog.showModal();
  return dialog;
}

export function filterRows(items, query, keys) {
  const q = String(query || '').trim().toLowerCase();
  if (!q) return items;
  return items.filter(item =>
    keys.some(k => String(item[k] ?? '').toLowerCase().includes(q))
  );
}

export function initThemeSwitcher(buttonSelector = '[data-theme-toggle]') {
  const themes = ['editorial', 'obsidian', 'warm'];
  const labels = { editorial: 'Açık (Editorial)', obsidian: 'Koyu (Obsidian)', warm: 'Sıcak (Warm)' };
  const saved = localStorage.getItem('app-theme') || 'editorial';
  document.documentElement.setAttribute('data-theme', saved);

  const btn = document.querySelector(buttonSelector);
  if (!btn) return;
  const updateLabel = (t) => { btn.textContent = `Tema: ${labels[t] || t}`; };
  updateLabel(saved);

  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'editorial';
    const next = themes[(themes.indexOf(current) + 1) % themes.length];
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('app-theme', next);
    updateLabel(next);
  });
}
