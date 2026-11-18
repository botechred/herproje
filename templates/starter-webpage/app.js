// app.js — Modüler başlangıç mantığı (250 satır sınırına sadık kalın)
const STORAGE_KEY = '{{PROJE}}-items';
const themes = ['editorial', 'obsidian', 'warm'];
const themeNames = { editorial: 'Açık', obsidian: 'Koyu', warm: 'Sıcak' };

function setupTheme() {
  const saved = localStorage.getItem('{{PROJE}}-theme') || 'editorial';
  document.documentElement.setAttribute('data-theme', saved);
  const btn = document.querySelector('[data-theme-toggle]');
  if (!btn) return;
  btn.textContent = `Tema: ${themeNames[saved] || saved}`;
  btn.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme') || 'editorial';
    const next = themes[(themes.indexOf(cur) + 1) % themes.length];
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('{{PROJE}}-theme', next);
    btn.textContent = `Tema: ${themeNames[next]}`;
  });
}

function loadItems() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { return []; }
}

function saveItems(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function render() {
  const listEl = document.getElementById('item-list');
  const items = loadItems();
  if (!items.length) {
    listEl.innerHTML = '<div class="empty-state">Henüz kayıt yok. Yukarıdan ilk öğeyi ekleyin.</div>';
    return;
  }
  listEl.innerHTML = items.map((item, idx) => `
    <div class="list-row">
      <span>${item.text.replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]))}</span>
      <button type="button" class="btn-ghost" data-remove="${idx}">Sil</button>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  setupTheme();
  render();

  const input = document.getElementById('item-input');
  const add = () => {
    const val = input.value.trim();
    if (!val) return;
    const items = loadItems();
    items.unshift({ text: val, createdAt: Date.now() });
    saveItems(items);
    input.value = '';
    render();
  };

  document.getElementById('add-btn').addEventListener('click', add);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') add(); });
  document.getElementById('item-list').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-remove]');
    if (!btn) return;
    const items = loadItems();
    items.splice(Number(btn.dataset.remove), 1);
    saveItems(items);
    render();
  });
});
