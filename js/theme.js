(() => {
  const button = document.getElementById('theme-toggle');
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  let manual = false;
  try { manual = ['dark', 'light'].includes(localStorage.getItem('color-theme')); } catch {}
  function apply(dark) {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
    button.textContent = dark ? '☀' : '☾';
    button.setAttribute('aria-pressed', String(dark));
    button.setAttribute('aria-label', dark ? 'Attiva tema chiaro' : 'Attiva tema scuro');
    button.title = button.getAttribute('aria-label');
  }
  apply(document.documentElement.dataset.theme === 'dark');
  button.addEventListener('click', () => {
    manual = true;
    const dark = document.documentElement.dataset.theme !== 'dark';
    apply(dark);
    try { localStorage.setItem('color-theme', dark ? 'dark' : 'light'); } catch {}
  });
  media.addEventListener('change', event => { if (!manual) apply(event.matches); });
})();
