// ===============================================================
// AesthiLink — DASHBOARD.JS
// Pastel Aesthetic Dashboard for managing published & draft pages
// ===============================================================

(() => {

  const pagesGrid = document.getElementById('pagesGrid');
  const emptyState = document.getElementById('emptyState');

  const createFromTemplate = document.getElementById('createFromTemplate');
  const createQuick = document.getElementById('createQuick');
  const quickCreateBtn = document.getElementById('quickCreate');

  const confirmModal = document.getElementById('confirmModal');
  const cancelDelete = document.getElementById('cancelDelete');
  const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

  // stored pages
  let pages = JSON.parse(localStorage.getItem('aesthi_pages') || '[]');

  // helper: save all
  function saveAll() {
    localStorage.setItem('aesthi_pages', JSON.stringify(pages));
  }

  // helper: formatted date
  function formatDate(ts) {
    const d = new Date(ts);
    return d.toLocaleDateString();
  }

  // helper HTML escape
  function escapeHtml(s) {
    return (s || '').toString().replace(/[&<>"']/g, c => ({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
    }[c]));
  }

  // ==========================================================
  // Create Card Element
  // ==========================================================
  function createCard(p) {
    const templateDef = templates.find(t => t.id === Number(p.template)) || templates[0];
    const preview = templateDef?.preview || (templates[0] && templates[0].preview);
    const timestamp = p.id && p.id.startsWith('p_') ? Number(p.id.slice(2)) : Date.now();

    const card = document.createElement('div');
    card.className = 'rounded-2xl p-0 border-2 border-transparent hover:shadow-lg transition';

    card.innerHTML = `
      <div class="p-3 rounded-2xl relative" 
           style="background:linear-gradient(180deg, rgba(255,255,255,0.7), rgba(255,255,255,0.9)); border-radius:14px; border:1px solid rgba(255,255,255,0.7);">

        <!-- Preview -->
        <div class="rounded-xl overflow-hidden border-2"
             style="border-image:linear-gradient(90deg,#FFD7F0,#D7C4FF) 1;">
          <img src="${preview}" class="w-full h-40 object-cover" />
        </div>

        <!-- Info Row -->
        <div class="mt-3 flex items-center justify-between">
          <div>
            <div class="text-sm text-[#6C5EA8]">Page</div>
            <div class="font-semibold text-[#4B3E91]">
              ${escapeHtml(p.displayName || p.name || 'Untitled')}
            </div>
            <div class="text-xs text-[#9B88C9]">${formatDate(timestamp)}</div>
          </div>

          <div class="flex gap-2">
            <button class="editBtn px-3 py-1 bg-white border rounded-lg text-sm" data-id="${p.id}">
              Edit
            </button>
            <button class="viewBtn px-3 py-1 bg-[#B18CFF] text-white rounded-lg text-sm" data-id="${p.id}">
              View
            </button>
            <button class="delBtn px-3 py-1 bg-white border rounded-lg text-sm" data-id="${p.id}">
              Delete
            </button>
          </div>
        </div>
      </div>
    `;

    // Button actions
    card.querySelector('.editBtn').onclick = () =>
      location.href = `editor.html?pageId=${p.id}`;

    card.querySelector('.viewBtn').onclick = () =>
      location.href = `view.html?pageId=${p.id}`;

    card.querySelector('.delBtn').onclick = () =>
      openConfirm(p.id);

    return card;
  }

  // ==========================================================
  // Render pages grid
  // ==========================================================
  function render() {
    pagesGrid.innerHTML = '';

    if (!pages || pages.length === 0) {
      emptyState.classList.remove('hidden');
      return;
    }
    emptyState.classList.add('hidden');

    // newest first
    pages.slice().reverse().forEach(p => {
      const card = createCard(p);
      pagesGrid.appendChild(card);
    });
  }

  // ==========================================================
  // Create New Page (Quick)
  // ==========================================================
  function createDefaultPage() {
    const id = 'p_' + Date.now();
    const newPage = {
      id,
      name: `page-${Date.now()}`,
      displayName: "Creator",
      bio: "Your bio goes here ✨",
      profile: "./assets/avatar.png",
      themeColor: "#B18CFF",
      template: templates[0]?.id || 0,
      links: [{ title: "My Instagram", url: "https://instagram.com" }],
      published: false
    };

    pages.push(newPage);
    saveAll();
    location.href = `editor.html?pageId=${id}`;
  }

  // ==========================================================
  // Delete Confirmation Modal
  // ==========================================================
  let deleteTarget = null;

  function openConfirm(id) {
    deleteTarget = id;
    confirmModal.classList.remove('hidden');
    confirmModal.style.display = 'flex';
  }

  cancelDelete.onclick = () => {
    deleteTarget = null;
    confirmModal.classList.add('hidden');
    confirmModal.style.display = 'none';
  };

  confirmDeleteBtn.onclick = () => {
    if (!deleteTarget) return;

    pages = pages.filter(p => p.id !== deleteTarget);
    saveAll();

    deleteTarget = null;
    confirmModal.classList.add('hidden');
    confirmModal.style.display = 'none';

    render();
  };

  // ==========================================================
  // EVENTS
  // ==========================================================
  createQuick.onclick = () => createDefaultPage();
  quickCreateBtn && (quickCreateBtn.onclick = () => createDefaultPage());

  createFromTemplate.onclick = () => {
    location.href = 'templates.html';
  };

  // Sync across tabs
  window.addEventListener('storage', (e) => {
    if (e.key === 'aesthi_pages') {
      pages = JSON.parse(localStorage.getItem('aesthi_pages') || '[]');
      render();
    }
  });

  // ==========================================================
  // INIT
  // ==========================================================
  render();

})();
