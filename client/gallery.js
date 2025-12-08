// ===============================================================
// AesthiLink — GALLERY.JS
// Displays all 18 templates + preview modal + routing to editor
// Pastel aesthetic version
// ===============================================================

(() => {

  const TCOUNT = 18;

  const grid = document.getElementById('templatesGrid');
  const modal = document.getElementById('previewModal');
  const modalPreview = document.getElementById('modalPreview');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const closeModal = document.getElementById('closeModal');
  const useTemplateBtn = document.getElementById('useTemplate');
  const downloadBtn = document.getElementById('downloadPreview');

  const quickCreateBtn = document.getElementById('quickCreate');

  // ===========================================================
  // Generate pastel SVG preview for each template
  // ===========================================================
  function makeTemplateSVG(id) {
    const palettes = [
      ['#F8D7E8','#D7C4FF'],
      ['#CDEFFF','#D7C4FF'],
      ['#FFE6D6','#F8D7E8'],
      ['#FFD8C2','#CDEFFF'],
      ['#FDE8FF','#D7C4FF'],
      ['#E8FFF7','#CDEFFF'],
    ];

    const p = palettes[id % palettes.length];
    const corner = (id % 2 === 0 ? 24 : 36);
    const btnColor = ['#B18CFF','#FFB3C6','#7BD3E6','#FFC38A'][id % 4];

    const svg = `
      <svg width="540" height="340" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="g" x1="0" x2="1">
            <stop offset="0%" stop-color="${p[0]}"/>
            <stop offset="100%" stop-color="${p[1]}"/>
          </linearGradient>
        </defs>

        <rect x="0" y="0" width="100%" height="100%" rx="${corner}" fill="url(#g)"/>

        <circle cx="90" cy="90" r="44" fill="#fff" opacity="0.92"/>
        <rect x="160" y="70" rx="10" width="260" height="22" fill="#fff" opacity="0.92"/>
        <rect x="160" y="102" rx="8" width="180" height="18" fill="#fff" opacity="0.85"/>

        <rect x="60" y="170" rx="14" width="420" height="40" fill="${btnColor}" opacity="0.96"/>
        <rect x="60" y="220" rx="14" width="420" height="40" fill="#fff" opacity="0.9"/>
        <rect x="60" y="270" rx="14" width="420" height="40" fill="#fff" opacity="0.9"/>

        <g transform="translate(480,30)">
          <path d="M10 2 C6 6, 2 6, 6 10 C2 14, 8 18, 12 14 C16 10, 22 12, 18 6 C14 0, 12 -2, 10 2"
                fill="#fff" opacity="0.6"/>
        </g>
      </svg>
    `;

    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  // ===========================================================
  // Render the template grid
  // ===========================================================
  function buildGrid() {
    for (let i = 0; i < TCOUNT; i++) {
      const wrapper = document.createElement('div');
      wrapper.className = 'template-card bg-white/80 rounded-2xl shadow p-3';

      wrapper.innerHTML = `
        <img class="template-thumb rounded-xl" src="${makeTemplateSVG(i)}" alt="Template ${i+1}">

        <div class="mt-3 flex items-center justify-between">
          <div>
            <div class="text-sm text-[#6C5EA8]">Template</div>
            <div class="font-semibold heading text-[#4B3E91]">Design ${i+1}</div>
          </div>

          <div class="flex gap-2">
            <button class="previewBtn px-3 py-1 bg-white border rounded-lg text-sm" data-id="${i}">
              Preview
            </button>
            <button class="useBtn px-3 py-1 bg-[#B18CFF] text-white rounded-lg text-sm" data-id="${i}">
              Use
            </button>
          </div>
        </div>
      `;

      grid.appendChild(wrapper);
    }
  }

  // ===========================================================
  // Open modal
  // ===========================================================
  function openPreview(id) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    modalPreview.innerHTML = `
      <img src="${makeTemplateSVG(id)}"
           style="width:100%;height:100%;object-fit:cover;border-radius:16px;">
    `;

    modalTitle.textContent = `Design ${id + 1}`;
    modalDesc.textContent = `Aesthetic pastel layout — perfect for creators.`;

    useTemplateBtn.dataset.tid = id;
    downloadBtn.onclick = () => {
      const a = document.createElement('a');
      a.href = makeTemplateSVG(id);
      a.download = `aesthilink-template-${id + 1}.svg`;
      a.click();
    };
  }

  // ===========================================================
  // Close modal
  // ===========================================================
  function closeModalFn() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  closeModal.addEventListener('click', closeModalFn);

  // ===========================================================
  // Use Template
  // ===========================================================
  useTemplateBtn.addEventListener('click', () => {
    const tid = Number(useTemplateBtn.dataset.tid);
    location.href = `editor.html?template=${tid}`;
  });

  // ===========================================================
  // Quick Create
  // ===========================================================
  quickCreateBtn && quickCreateBtn.addEventListener('click', () => {
    location.href = 'editor.html?template=0';
  });

  // ===========================================================
  // Grid event delegation
  // ===========================================================
  grid.addEventListener('click', (e) => {
    const p = e.target.closest('.previewBtn');
    if (p) {
      const id = +p.dataset.id;
      openPreview(id);
      return;
    }

    const u = e.target.closest('.useBtn');
    if (u) {
      const id = +u.dataset.id;
      location.href = `editor.html?template=${id}`;
    }
  });

  // init
  buildGrid();

})();
