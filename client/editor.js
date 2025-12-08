// ===============================================================
// AesthiLink — EDITOR.JS (Final, Production-ready)
// Works with templates.js + applyTemplate()
// Saves pages to localStorage (aesthi_pages)
// Supports editor.html?pageId=... and editor.html?template=...
// ===============================================================

(() => {
  const qs = new URLSearchParams(location.search);
  const templateIdFromQS = Number(qs.get('template') || 1);
  const editingPageId = qs.get('pageId');

  // DOM
  const pageName = document.getElementById('pageName');
  const displayName = document.getElementById('displayName');
  const bioText = document.getElementById('bioText');
  const profileUpload = document.getElementById('profileUpload');
  const profilePreview = document.getElementById('profilePreview');
  const themeColor = document.getElementById('themeColor');
  const linksList = document.getElementById('linksList');
  const addLinkBtn = document.getElementById('addLink');
  const livePreview = document.getElementById('livePreview');
  const saveDraft = document.getElementById('saveDraft');
  const publishBtn = document.getElementById('publishBtn');
  const previewPublicLink = document.getElementById('previewPublicLink');

  // Page data model
  let pageData = {
    id: null,
    name: '',
    displayName: 'Creator',
    bio: 'Your bio goes here ✨',
    profile: './assets/avatar.png',
    themeColor: '#B18CFF',
    template: templateIdFromQS || (templates[0] && templates[0].id) || 1,
    links: [{ title: 'My Instagram', url: 'https://instagram.com' }],
    published: false
  };

  // ------------------------
  // Helpers
  // ------------------------
  function escapeHtml(s) {
    return (s || '').toString().replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  // Load existing page if pageId present
  function loadExisting() {
    if (!editingPageId) return;
    const all = JSON.parse(localStorage.getItem('aesthi_pages') || '[]');
    const found = all.find(p => p.id === editingPageId);
    if (found) pageData = found;
  }
  loadExisting();

  // ------------------------
  // UI population
  // ------------------------
  function populateUI() {
    pageName.value = pageData.name || `page-${Date.now()}`;
    displayName.value = pageData.displayName;
    bioText.value = pageData.bio;
    profilePreview.src = pageData.profile || './assets/avatar.png';
    themeColor.value = pageData.themeColor || '#B18CFF';
    renderLinks();
    renderPreview();
  }

  function renderLinks() {
    linksList.innerHTML = '';
    pageData.links.forEach((ln, i) => {
      const row = document.createElement('div');
      row.className = 'flex gap-2 items-center';
      row.innerHTML = `
        <input class="flex-1 p-2 border rounded" data-title="${i}" value="${escapeHtml(ln.title)}" />
        <input class="flex-1 p-2 border rounded" data-url="${i}" value="${escapeHtml(ln.url)}" />
        <button class="removeBtn px-3 py-1 rounded bg-white border">Remove</button>
      `;
      linksList.appendChild(row);
    });
  }

  function renderPreview() {
    const template = templates.find(t => t.id === Number(pageData.template)) || templates[0];
    if (!template) {
      livePreview.innerHTML = `<div class="p-6 text-red-500">Template missing</div>`;
      return;
    }

    // applyTemplate expects placeholders: displayName, bio, profile, themeColor, links
    const html = applyTemplate(template.html, {
      displayName: pageData.displayName,
      bio: pageData.bio,
      profile: pageData.profile,
      themeColor: pageData.themeColor,
      links: pageData.links
    });

    livePreview.innerHTML = html;
  }

  // ------------------------
  // File upload handling
  // ------------------------
  profileUpload.addEventListener('change', (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = ev => {
      pageData.profile = ev.target.result;
      profilePreview.src = pageData.profile;
      renderPreview();
    };
    reader.readAsDataURL(f);
  });

  // ------------------------
  // Input bindings
  // ------------------------
  pageName.addEventListener('input', () => pageData.name = pageName.value);
  displayName.addEventListener('input', () => { pageData.displayName = displayName.value; renderPreview(); });
  bioText.addEventListener('input', () => { pageData.bio = bioText.value; renderPreview(); });
  themeColor.addEventListener('input', () => { pageData.themeColor = themeColor.value; renderPreview(); });

  // Add link
  addLinkBtn.addEventListener('click', () => {
    pageData.links.push({ title: 'New Link', url: 'https://' });
    renderLinks();
    renderPreview();
  });

  // Remove link (delegated)
  linksList.addEventListener('click', (e) => {
    if (e.target.classList.contains('removeBtn')) {
      const idx = Array.from(linksList.children).indexOf(e.target.parentElement);
      if (idx >= 0) {
        pageData.links.splice(idx, 1);
        renderLinks();
        renderPreview();
      }
    }
  });

  // Link edits (delegated)
  linksList.addEventListener('input', (e) => {
    const ti = e.target.getAttribute('data-title');
    const ui = e.target.getAttribute('data-url');
    if (ti !== null) {
      pageData.links[Number(ti)].title = e.target.value;
      renderPreview();
    }
    if (ui !== null) {
      pageData.links[Number(ui)].url = e.target.value;
      renderPreview();
    }
  });

  // ------------------------
  // Save / Publish
  // ------------------------
  function saveToLocal(publish = false) {
    pageData.published = publish;
    pageData.id = pageData.id || ('p_' + Date.now());

    const all = JSON.parse(localStorage.getItem('aesthi_pages') || '[]');
    const idx = all.findIndex(p => p.id === pageData.id);
    if (idx >= 0) all[idx] = pageData;
    else all.push(pageData);

    localStorage.setItem('aesthi_pages', JSON.stringify(all));
    // tiny ping so other tabs can react
    try { localStorage.setItem('aesthi_last_update', Date.now()); } catch(e){}
  }

  saveDraft.addEventListener('click', () => {
    saveToLocal(false);
    alert('Draft saved locally.');
  });

  publishBtn.addEventListener('click', () => {
    saveToLocal(true);
    location.href = `view.html?pageId=${pageData.id}`;
  });

  // Preview public page in a new tab
  previewPublicLink && previewPublicLink.addEventListener('click', () => {
    if (!pageData.id) {
      alert('Please save or publish first.');
      return;
    }
    window.open(`view.html?pageId=${pageData.id}`, '_blank');
  });

  // ------------------------
  // Init
  // ------------------------
  (function init() {
    // if there's a template param but no existing page, apply it
    if (!pageData.template && templateIdFromQS) pageData.template = templateIdFromQS;
    // if editing, pageData was loaded earlier
    populateUI();
    renderPreview();
  })();

})();
