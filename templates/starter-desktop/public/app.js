// app.js — PWA + Yerel API İstemcisi
const themes = ['editorial', 'obsidian', 'warm'];
const names = { editorial: 'Açık', obsidian: 'Koyu', warm: 'Sıcak' };

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(() => {});
}

async function fetchItems() {
  const res = await fetch('/api/items');
  const items = await res.json();
  const listEl = document.getElementById('item-list');
  if (!items.length) {
    listEl.innerHTML = '<div class="empty-state">Henüz kayıt yok. İlk kaydınızı ekleyin.</div>';
    return;
  }
  listEl.innerHTML = items.map(it => `
    <div class="list-row">
      <span>${it.text.replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]))}</span>
      <span class="brand-tag">${new Date(it.createdAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</span>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('{{PROJE}}-theme') || 'editorial';
  document.documentElement.setAttribute('data-theme', saved);
  const toggle = document.querySelector('[data-theme-toggle]');
  toggle.textContent = `Tema: ${names[saved] || saved}`;
  toggle.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme') || 'editorial';
    const next = themes[(themes.indexOf(cur) + 1) % themes.length];
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('{{PROJE}}-theme', next);
    toggle.textContent = `Tema: ${names[next]}`;
  });

  fetchItems();

  const input = document.getElementById('item-input');
  const submit = async () => {
    const text = input.value.trim();
    if (!text) return;
    await fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    input.value = '';
    fetchItems();
  };
  document.getElementById('add-btn').addEventListener('click', submit);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') submit(); });
});
