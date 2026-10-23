(function () {
  async function loadPage(url, push) {
    try {
      const res = await fetch(url);
      if (!res.ok) { window.location.href = url; return; }

      const html  = await res.text();
      const doc   = new DOMParser().parseFromString(html, 'text/html');

      const swap = (sel) => {
        const incoming = doc.querySelector(sel);
        const current  = document.querySelector(sel);
        if (incoming && current) current.innerHTML = incoming.innerHTML;
      };

      // Close drawer before swapping — prevents transitionend race with innerHTML replacement
      const drawer = document.querySelector('.site-drawer');
      if (drawer && drawer.classList.contains('site-drawer--open')) {
        drawer.classList.remove('site-drawer--open');
        document.body.classList.remove('drawer-open');
        drawer.addEventListener('transitionend', () => drawer.setAttribute('hidden', ''), { once: true });
      }

      swap('.site-main__nav');
      swap('.site-main__content');
      swap('.site-page-nav');
      swap('.site-aside__body');
      swap('.site-drawer');

      document.title = doc.title;
      document.body.className = doc.body.className;
      if (push) history.pushState({ url }, doc.title, url);
      window.scrollTo(0, 0);
    } catch {
      window.location.href = url;
    }
  }

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a) return;

    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:')) return;

    let url;
    try { url = new URL(href, window.location.href); } catch { return; }

    if (url.origin !== window.location.origin) return;
    if (!url.pathname.endsWith('.html')) return;

    e.preventDefault();
    loadPage(url.href, true);
  });

  window.addEventListener('popstate', (e) => {
    loadPage(e.state?.url || window.location.href, false);
  });

  history.replaceState({ url: window.location.href }, document.title, window.location.href);
}());
