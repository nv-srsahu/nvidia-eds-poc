function buildMegaMenu(section) {
  const categories = [...section.querySelectorAll(':scope > div')];
  const label = section.querySelector(':scope > p')?.textContent?.trim() || '';

  const menu = document.createElement('div');
  menu.className = 'mega-menu';
  menu.setAttribute('hidden', '');
  menu.setAttribute('aria-label', `${label} menu`);

  const inner = document.createElement('div');
  inner.className = 'mega-menu-inner';

  const catList = document.createElement('ul');
  catList.className = 'mega-menu-cats';

  const contentArea = document.createElement('div');
  contentArea.className = 'mega-menu-content';

  categories.forEach((cat, idx) => {
    const heading = cat.querySelector('h4')?.textContent?.trim() || '';
    const items = [...cat.querySelectorAll('li')];

    // Left: category tab
    const li = document.createElement('li');
    if (idx === 0) li.classList.add('active');
    const btn = document.createElement('button');
    btn.textContent = heading;
    btn.dataset.idx = idx;
    btn.setAttribute('aria-selected', idx === 0 ? 'true' : 'false');
    li.appendChild(btn);
    catList.appendChild(li);

    // Right: content pane
    const pane = document.createElement('div');
    pane.className = 'mega-menu-pane';
    pane.dataset.idx = idx;
    if (idx !== 0) pane.hidden = true;

    const h3 = document.createElement('h3');
    h3.textContent = heading;
    pane.appendChild(h3);

    const grid = document.createElement('ul');
    grid.className = 'mega-menu-items';

    items.forEach((item) => {
      const a = item.querySelector('a');
      if (!a) return;
      const desc = item.textContent.replace(a.textContent, '').trim();

      const liEl = document.createElement('li');
      const link = document.createElement('a');
      link.href = a.href;
      const strong = document.createElement('strong');
      strong.textContent = a.textContent;
      const arrow = document.createElement('span');
      arrow.className = 'mega-menu-arrow';
      arrow.setAttribute('aria-hidden', 'true');
      arrow.textContent = ' ›';
      strong.appendChild(arrow);
      link.appendChild(strong);
      liEl.appendChild(link);

      if (desc) {
        const p = document.createElement('p');
        p.textContent = desc;
        liEl.appendChild(p);
      }
      grid.appendChild(liEl);
    });

    pane.appendChild(grid);
    contentArea.appendChild(pane);
  });

  // Category switch on click
  catList.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-idx]');
    if (!btn) return;
    const { idx } = btn.dataset;
    catList.querySelectorAll('li').forEach((li, i) => {
      li.classList.toggle('active', String(i) === idx);
    });
    catList.querySelectorAll('button').forEach((b) => {
      b.setAttribute('aria-selected', b.dataset.idx === idx ? 'true' : 'false');
    });
    contentArea.querySelectorAll('.mega-menu-pane').forEach((pane) => {
      pane.hidden = pane.dataset.idx !== idx;
    });
  });

  inner.appendChild(catList);
  inner.appendChild(contentArea);
  menu.appendChild(inner);
  return menu;
}

function closeAllMenus(nav) {
  nav.querySelectorAll('.mega-menu').forEach((m) => { m.hidden = true; });
  nav.querySelectorAll('.nav-primary-item').forEach((li) => li.classList.remove('open'));
  document.getElementById('nav-overlay')?.classList.remove('visible');
}

export default async function decorate(header) {
  const resp = await fetch('/nav.html');
  if (!resp.ok) return;

  const html = await resp.text();
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const sections = [...doc.body.children];

  // Identify sections by content
  const brandSection = sections.find((s) => s.querySelector(':scope > p > a') && !s.querySelector(':scope > div'));
  const navSections = sections.filter((s) => s.querySelector(':scope > p') && s.querySelector(':scope > div'));
  const utilitySection = sections.find((s) => s.querySelector(':scope > ul'));

  const nav = document.createElement('nav');
  nav.className = 'nav';
  nav.setAttribute('aria-label', 'Main navigation');

  // ── Nav inner bar ────────────────────────────────────────────────
  const inner = document.createElement('div');
  inner.className = 'nav-inner';

  // Logo
  const logoLink = brandSection?.querySelector('a');
  const logoEl = document.createElement('a');
  logoEl.className = 'nav-logo';
  logoEl.href = logoLink?.href || '/';
  logoEl.setAttribute('aria-label', 'NVIDIA Home');
  logoEl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="117" height="35" viewBox="0 0 117 35" fill="none" aria-hidden="true">
    <title>Artificial Intelligence Computing Leadership from NVIDIA</title>
    <path d="M66.4201 15.476V29.238H70.2437V15.476H66.4201ZM36.3477 15.4573V29.238H40.2045V18.5408L43.2134 18.5513C44.2026 18.5513 44.8877 18.7928 45.3639 19.3097C45.9686 19.9653 46.2154 21.0212 46.2154 22.9532V29.238H49.9518V21.6243C49.9518 16.19 46.5447 15.4573 43.2122 15.4573H36.3477ZM72.5755 15.476V29.2368H78.7757C82.0795 29.2368 83.157 28.678 84.3241 27.4262C85.148 26.5465 85.6804 24.6168 85.6804 22.5075C85.6804 20.5732 85.2295 18.8477 84.4434 17.7732C83.0273 15.8517 80.987 15.476 77.9403 15.476H72.5755ZM76.367 18.472H78.0103C80.3949 18.472 81.9372 19.5605 81.9372 22.385C81.9372 25.2095 80.3949 26.2992 78.0103 26.2992H76.367V18.472ZM60.9085 15.476L57.7183 26.382L54.6613 15.476H50.5347L54.9011 29.2368H60.4104L64.8113 15.476H60.9096H60.9085ZM87.4591 29.2368H91.2827V15.476H87.458V29.2368H87.4591ZM98.176 15.4807L92.8377 29.2322H96.6073L97.4519 26.802H103.769L104.569 29.2322H108.661L103.283 15.4795H98.176V15.4807ZM100.657 17.9902L102.973 24.4325H98.2678L100.657 17.9902Z" fill="black"/>
    <path d="M11.6925 17.7697V15.8762C11.8738 15.8633 12.0563 15.8528 12.2422 15.847C17.3372 15.6837 20.68 20.2978 20.68 20.2978C20.68 20.2978 17.0699 25.3962 13.1992 25.3962C12.6415 25.3962 12.1423 25.3052 11.6925 25.1511V19.4077C13.6766 19.6515 14.0748 20.5417 15.2671 22.5623L17.919 20.2885C17.919 20.2885 15.9831 17.7067 12.7195 17.7067C12.3649 17.7067 12.0253 17.7323 11.6913 17.7685L11.6925 17.7697ZM11.6913 11.5128V14.342C11.8738 14.3268 12.0574 14.3152 12.241 14.3082C19.3259 14.0655 23.9425 20.2162 23.9425 20.2162C23.9425 20.2162 18.6408 26.7705 13.1166 26.7705C12.6105 26.7705 12.1366 26.7227 11.6913 26.6433V28.3922C12.0723 28.4412 12.4671 28.4703 12.8779 28.4703C18.0177 28.4703 21.7358 25.8021 25.3356 22.6428C25.9323 23.1281 28.3754 24.31 28.8781 24.828C25.4549 27.7412 17.4795 30.0885 12.9571 30.0885C12.521 30.0885 12.1022 30.0617 11.6913 30.022V32.479H31.2282V11.514H11.6925L11.6913 11.5128ZM11.6913 25.15V26.6433C6.93708 25.7812 5.6174 20.7575 5.6174 20.7575C5.6174 20.7575 7.89986 18.1862 11.6913 17.7697V19.4077C11.6913 19.4077 11.6867 19.4077 11.6845 19.4077C9.69462 19.165 8.14085 21.055 8.14085 21.055C8.14085 21.055 9.01183 24.2365 11.6925 25.1523L11.6913 25.15ZM3.24888 20.5417C3.24888 20.5417 6.06609 16.3148 11.6925 15.8773V14.3443C5.46134 14.853 0.0644531 20.2185 0.0644531 20.2185C0.0644531 20.2185 3.12036 29.2018 11.6925 30.0243V28.3945C5.40167 27.5895 3.24888 20.5417 3.24888 20.5417Z" fill="#76B900"/>
  </svg>`;
  inner.appendChild(logoEl);

  // Primary nav list
  const primaryUl = document.createElement('ul');
  primaryUl.className = 'nav-links';
  primaryUl.id = 'nav-links';

  navSections.forEach((section) => {
    const label = section.querySelector(':scope > p')?.textContent?.trim() || '';
    const li = document.createElement('li');
    li.className = 'nav-primary-item';

    const btn = document.createElement('button');
    btn.className = 'nav-primary-btn';
    btn.textContent = label;
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-haspopup', 'true');

    const megaMenu = buildMegaMenu(section);

    btn.addEventListener('click', () => {
      const isOpen = !megaMenu.hidden;
      closeAllMenus(nav);
      if (!isOpen) {
        megaMenu.hidden = false;
        li.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        document.getElementById('nav-overlay')?.classList.add('visible');
      }
    });

    li.appendChild(btn);
    primaryUl.appendChild(li);
    // Append mega menu to nav (full-width, outside nav-inner)
    nav.appendChild(megaMenu);
  });

  inner.appendChild(primaryUl);

  // Utility links
  const utilityUl = document.createElement('ul');
  utilityUl.className = 'nav-utility';
  utilitySection?.querySelectorAll('li').forEach((li) => {
    utilityUl.appendChild(li.cloneNode(true));
  });
  inner.appendChild(utilityUl);

  // Hamburger
  const hamburger = document.createElement('button');
  hamburger.className = 'nav-hamburger';
  hamburger.setAttribute('aria-controls', 'nav-links');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.setAttribute('aria-label', 'Toggle menu');
  hamburger.innerHTML = '<span></span><span></span><span></span>';
  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
    primaryUl.classList.toggle('open');
  });
  inner.appendChild(hamburger);

  nav.prepend(inner); // inner bar first, mega menus appended after

  // ── Overlay ──────────────────────────────────────────────────────
  const overlay = document.createElement('div');
  overlay.id = 'nav-overlay';
  overlay.className = 'nav-overlay';
  overlay.addEventListener('click', () => closeAllMenus(nav));

  header.appendChild(nav);
  header.appendChild(overlay);

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllMenus(nav);
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!header.contains(e.target)) closeAllMenus(nav);
  });
}
