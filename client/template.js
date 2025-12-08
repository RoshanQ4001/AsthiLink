// templates.js — 18 production-ready pastel templates + applyTemplate()
// Drop this into your project (replace old templates.js)

const templates = (function(){
  // Common palettes (pastel)
  const palettes = [
    ['#FDE1FF','#E9D7FF'],
    ['#DFF2FF','#E9D7FF'],
    ['#FFF2E8','#FFE6F0'],
    ['#E8FFF7','#DFF2FF'],
    ['#FFF0F8','#FDE8FF'],
    ['#FFF8E6','#FDE1FF']
  ];

  // helper: small SVG preview generator (data URI) — pastel themed
  function makeTemplateSVG(id, title){
    const p = palettes[id % palettes.length];
    const corner = (id % 2 === 0) ? 20 : 34;
    const accent = ['#B18CFF','#FFB3C6','#7BD3E6','#FFC38A'][id % 4];
    const smallText = title || `Design ${id+1}`;
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360">
        <defs>
          <linearGradient id="g${id}" x1="0" x2="1">
            <stop offset="0%" stop-color="${p[0]}"/>
            <stop offset="100%" stop-color="${p[1]}"/>
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" rx="${corner}" fill="url(#g${id})"/>
        <rect x="36" y="36" width="120" height="120" rx="60" fill="#fff" opacity="0.95" />
        <rect x="180" y="54" width="380" height="28" rx="8" fill="#fff" opacity="0.95"/>
        <rect x="180" y="92" width="260" height="18" rx="8" fill="#fff" opacity="0.88"/>
        <rect x="36" y="180" width="568" height="42" rx="12" fill="${accent}" opacity="0.96"/>
        <rect x="36" y="234" width="568" height="42" rx="12" fill="#fff" opacity="0.9"/>
        <text x="40" y="320" font-size="20" fill="#5C3E8B" font-family="Arial">${smallText}</text>
      </svg>
    `;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  // Return a template object factory
  function t(id, name, html, palette){
    return {
      id,
      name,
      html,
      palette: palette || palettes[id % palettes.length],
      preview: makeTemplateSVG(id, name)
    };
  }

  // 18 Template HTML strings
  // Each template html expects placeholders: {{displayName}}, {{bio}}, {{profile}}, {{themeColor}}, {{links}}
  // applyTemplate will replace these. Links will be converted to button list.

  const templateList = [];

  // Template 1 — Center Profile, Large Buttons (Spotlight)
  templateList.push(t(1, 'Center Spotlight', `
<section style="font-family:Inter,system-ui; padding:28px; display:flex; justify-content:center;">
  <div style="width:100%; max-width:560px; background:linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.98)); border-radius:22px; padding:28px; text-align:center;">
    <img src="{{profile}}" alt="avatar" style="width:120px;height:120px;border-radius:50%;object-fit:cover;border:4px solid rgba(255,255,255,0.8);box-shadow:0 8px 20px rgba(0,0,0,0.06)">
    <h1 style="margin-top:14px;font-size:22px;color:#3b2e79;font-weight:700">{{displayName}}</h1>
    <p style="margin:8px 0 18px;color:rgba(0,0,0,0.6)">{{bio}}</p>
    <div style="display:flex;flex-direction:column;gap:12px;align-items:center;padding:8px 8px;">
      {{links}}
    </div>
  </div>
</section>
`));

  // Template 2 — Split Left image / Right Info
  templateList.push(t(2, 'Split Profile', `
<section style="display:flex; justify-content:center; padding:22px;">
  <div style="max-width:920px; display:flex; gap:24px; align-items:center; background:white; border-radius:20px; padding:18px;">
    <div style="flex:0 0 160px;">
      <img src="{{profile}}" alt="avatar" style="width:140px;height:140px;border-radius:18px;object-fit:cover;"/>
    </div>
    <div style="flex:1;">
      <h2 style="font-size:20px;color:#4b3e91;margin:0 0 6px;">{{displayName}}</h2>
      <p style="color:#6c5ea8;margin:0 0 12px;">{{bio}}</p>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px">
        {{links}}
      </div>
    </div>
  </div>
</section>
`));

  // Template 3 — Minimal Clean List
  templateList.push(t(3, 'Minimal List', `
<section style="padding:20px; display:flex; justify-content:center;">
  <div style="max-width:560px;background:rgba(255,255,255,0.95);padding:20px;border-radius:18px;">
    <div style="display:flex;gap:12px;align-items:center;">
      <img src="{{profile}}" alt="avatar" style="width:64px;height:64px;border-radius:12px;object-fit:cover;"/>
      <div>
        <div style="font-weight:700;color:#3b2e79">{{displayName}}</div>
        <div style="color:#6c5ea8;font-size:13px">{{bio}}</div>
      </div>
    </div>
    <div style="margin-top:16px; display:flex; flex-direction:column; gap:12px;">
      {{links}}
    </div>
  </div>
</section>
`));

  // Template 4 — Glassmorphism Card
  templateList.push(t(4, 'Glassmorphism', `
<section style="padding:20px; display:flex; justify-content:center;">
  <div style="max-width:640px;padding:28px;border-radius:20px;background:rgba(255,255,255,0.18);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.6)">
    <div style="display:flex;gap:16px;align-items:center;">
      <img src="{{profile}}" alt="avatar" style="width:88px;height:88px;border-radius:18px;object-fit:cover;border:3px solid rgba(255,255,255,0.6)"/>
      <div>
        <h2 style="margin:0;color:#2f225f;font-weight:700">{{displayName}}</h2>
        <p style="margin:6px 0;color:#5b4b8a">{{bio}}</p>
      </div>
    </div>
    <div style="margin-top:18px; display:flex;flex-direction:column;gap:12px;">
      {{links}}
    </div>
  </div>
</section>
`));

  // Template 5 — Blob Background, centered
  templateList.push(t(5, 'Blob Center', `
<section style="padding:28px; display:flex;justify-content:center;">
  <div style="max-width:560px; position:relative;">
    <div style="position:absolute; inset: -20px; z-index:0; filter:blur(36px); opacity:0.9; border-radius:28px; background:linear-gradient(135deg, rgba(255, 200, 230, 0.6), rgba(215,196,255,0.6));"></div>
    <div style="position:relative; z-index:1; background:white; padding:26px; border-radius:22px;">
      <div style="text-align:center;">
        <img src="{{profile}}" alt="avatar" style="width:98px;height:98px;border-radius:50%;object-fit:cover;border:4px solid #fff;">
        <h3 style="margin:12px 0 6px;color:#4b3e91;font-weight:700">{{displayName}}</h3>
        <p style="color:#6c5ea8">{{bio}}</p>
      </div>
      <div style="margin-top:16px; display:flex;flex-direction:column;gap:10px;">
        {{links}}
      </div>
    </div>
  </div>
</section>
`));

  // Template 6 — Rounded Card Grid of Buttons
  templateList.push(t(6, 'Rounded Grid', `
<section style="padding:18px; display:flex; justify-content:center;">
  <div style="max-width:540px;background:white;padding:18px;border-radius:18px;">
    <div style="display:flex;align-items:center;gap:14px;">
      <img src="{{profile}}" alt="avatar" style="width:72px;height:72px;border-radius:12px;object-fit:cover;"/>
      <div>
        <div style="font-weight:700;color:#4b3e91">{{displayName}}</div>
        <div style="color:#6c5ea8;font-size:13px">{{bio}}</div>
      </div>
    </div>
    <div style="margin-top:14px;display:grid;grid-template-columns:repeat(2,1fr);gap:10px">
      {{links}}
    </div>
  </div>
</section>
`));

  // Template 7 — Kawaii Notebook (with header strip)
  templateList.push(t(7, 'Kawaii Notebook', `
<section style="padding:18px; display:flex; justify-content:center;">
  <div style="max-width:600px;background:white;border-radius:16px;padding:0;overflow:hidden;">
    <div style="background:linear-gradient(90deg,#FFD7F0,#D7C4FF);padding:18px;display:flex;gap:12px;align-items:center;">
      <img src="{{profile}}" alt="avatar" style="width:64px;height:64px;border-radius:12px;object-fit:cover;border:3px solid rgba(255,255,255,0.8)"/>
      <div>
        <div style="font-weight:800;color:#3b2e79">{{displayName}}</div>
        <div style="color:#4a3a7a;font-size:12px">{{bio}}</div>
      </div>
    </div>
    <div style="padding:16px; display:flex;flex-direction:column;gap:12px;">
      {{links}}
    </div>
  </div>
</section>
`));

  // Template 8 — Wave Gradient header + buttons below
  templateList.push(t(8, 'Wave Header', `
<section style="padding:20px;display:flex;justify-content:center;">
  <div style="max-width:700px;background:white;border-radius:20px;overflow:hidden;">
    <div style="padding:28px;background:linear-gradient(90deg,#FDE1FF,#DFF2FF);display:flex;gap:16px;align-items:center;">
      <img src="{{profile}}" alt="avatar" style="width:88px;height:88px;border-radius:18px;object-fit:cover;"/>
      <div>
        <h2 style="margin:0;color:#4b3e91">{{displayName}}</h2>
        <p style="margin-top:6px;color:#6c5ea8">{{bio}}</p>
      </div>
    </div>
    <div style="padding:18px;display:flex;flex-direction:column;gap:12px;">
      {{links}}
    </div>
  </div>
</section>
`));

  // Template 9 — Bold Header, single column CTA
  templateList.push(t(9, 'Bold Header', `
<section style="padding:20px;display:flex;justify-content:center;">
  <div style="max-width:560px;background:white;border-radius:18px;padding:20px;">
    <h1 style="font-size:24px;color:#3b2e79;margin:0;">{{displayName}}</h1>
    <p style="color:#6c5ea8;margin:8px 0 16px;">{{bio}}</p>
    <div style="display:flex;flex-direction:column;gap:10px;">
      {{links}}
    </div>
  </div>
</section>
`));

  // Template 10 — Photo-centric (profile large banner)
  templateList.push(t(10, 'Photo Banner', `
<section style="padding:8px;display:flex;justify-content:center;">
  <div style="max-width:720px;border-radius:20px;overflow:hidden;background:white;">
    <div style="height:180px;background:linear-gradient(90deg,#FFE6F2,#E9D7FF);display:flex;align-items:flex-end;padding:16px;">
      <img src="{{profile}}" alt="avatar" style="width:96px;height:96px;border-radius:12px;object-fit:cover;border:4px solid #fff;">
      <div style="margin-left:12px;">
        <div style="font-weight:800;color:#3b2e79">{{displayName}}</div>
        <div style="color:#6c5ea8">{{bio}}</div>
      </div>
    </div>
    <div style="padding:18px; display:flex;flex-direction:column;gap:12px;">
      {{links}}
    </div>
  </div>
</section>
`));

  // Template 11 — Compact Card (for many links)
  templateList.push(t(11, 'Compact List', `
<section style="padding:12px;display:flex;justify-content:center;">
  <div style="max-width:480px;background:white;padding:12px;border-radius:14px;">
    <div style="display:flex;align-items:center;gap:10px;">
      <img src="{{profile}}" alt="avatar" style="width:56px;height:56px;border-radius:12px;object-fit:cover"/>
      <div>
        <div style="font-weight:700;color:#4b3e91">{{displayName}}</div>
        <div style="color:#6c5ea8;font-size:13px">{{bio}}</div>
      </div>
    </div>
    <div style="margin-top:12px;display:flex;flex-direction:column;gap:8px;">
      {{links}}
    </div>
  </div>
</section>
`));

  // Template 12 — Centered column with small icons
  templateList.push(t(12, 'Icon Buttons', `
<section style="padding:18px;display:flex;justify-content:center;">
  <div style="max-width:540px;background:white;border-radius:20px;padding:18px;text-align:center;">
    <img src="{{profile}}" alt="avatar" style="width:84px;height:84px;border-radius:20px;object-fit:cover"/>
    <h3 style="margin-top:10px;color:#3b2e79">{{displayName}}</h3>
    <p style="color:#6c5ea8">{{bio}}</p>
    <div style="margin-top:14px;display:flex;flex-direction:column;gap:10px;align-items:center;">
      {{links}}
    </div>
  </div>
</section>
`));

  // Template 13 — Two-column with small profile on top-left (professional)
  templateList.push(t(13, 'Two Column Pro', `
<section style="padding:20px;display:flex;justify-content:center;">
  <div style="max-width:860px;background:white;border-radius:20px;padding:18px;display:grid;grid-template-columns:1fr 1fr;gap:18px;">
    <div>
      <div style="display:flex;gap:12px;align-items:center;">
        <img src="{{profile}}" style="width:84px;height:84px;border-radius:12px;object-fit:cover"/>
        <div>
          <div style="font-weight:700;color:#3b2e79">{{displayName}}</div>
          <div style="color:#6c5ea8">{{bio}}</div>
        </div>
      </div>
    </div>
    <div>
      <div style="display:flex;flex-direction:column;gap:12px;">
        {{links}}
      </div>
    </div>
  </div>
</section>
`));

  // Template 14 — Wave Buttons (rounded pill style)
  templateList.push(t(14, 'Pill Buttons', `
<section style="padding:18px;display:flex;justify-content:center;">
  <div style="max-width:600px;background:white;border-radius:20px;padding:18px;text-align:center;">
    <img src="{{profile}}" style="width:88px;height:88px;border-radius:16px;object-fit:cover"/>
    <h3 style="margin-top:10px;color:#3b2e79">{{displayName}}</h3>
    <p style="color:#6c5ea8">{{bio}}</p>
    <div style="margin-top:12px;display:flex;flex-direction:column;gap:10px;align-items:center;">
      {{links}}
    </div>
  </div>
</section>
`));

  // Template 15 — Neon outline (dark-ish accent but pastel friendly)
  templateList.push(t(15, 'Neon Outline', `
<section style="padding:20px;display:flex;justify-content:center;">
  <div style="max-width:560px;background:white;border-radius:18px;padding:20px;border:2px solid rgba(177,140,255,0.22);">
    <div style="display:flex;gap:12px;align-items:center;">
      <img src="{{profile}}" style="width:72px;height:72px;border-radius:12px;object-fit:cover"/>
      <div>
        <div style="font-weight:700;color:#3b2e79">{{displayName}}</div>
        <div style="color:#6c5ea8">{{bio}}</div>
      </div>
    </div>
    <div style="margin-top:14px;display:flex;flex-direction:column;gap:12px;">
      {{links}}
    </div>
  </div>
</section>
`));

  // Template 16 — Text-Forward (headline + small CTAs)
  templateList.push(t(16, 'Text Forward', `
<section style="padding:20px;display:flex;justify-content:center;">
  <div style="max-width:640px;background:white;border-radius:18px;padding:20px;text-align:center;">
    <h1 style="font-size:22px;color:#3b2e79;margin:0;">{{displayName}}</h1>
    <p style="color:#6c5ea8;margin:8px 0 16px;">{{bio}}</p>
    <div style="display:flex;flex-direction:column;gap:10px;">
      {{links}}
    </div>
  </div>
</section>
`));

  // Template 17 — Card stack with small shadows
  templateList.push(t(17, 'Card Stack', `
<section style="padding:18px;display:flex;justify-content:center;">
  <div style="max-width:520px;">
    <div style="background:white;border-radius:18px;padding:18px;box-shadow:0 8px 18px rgba(65,51,141,0.06);">
      <div style="display:flex;gap:12px;align-items:center;">
        <img src="{{profile}}" style="width:64px;height:64px;border-radius:12px;object-fit:cover"/>
        <div>
          <div style="font-weight:700;color:#3b2e79">{{displayName}}</div>
          <div style="color:#6c5ea8">{{bio}}</div>
        </div>
      </div>
    </div>
    <div style="margin-top:12px;display:flex;flex-direction:column;gap:12px;">
      {{links}}
    </div>
  </div>
</section>
`));

  // Template 18 — Compact center with small footer
  templateList.push(t(18, 'Compact Center', `
<section style="padding:14px;display:flex;justify-content:center;">
  <div style="max-width:460px;background:white;border-radius:16px;padding:16px;">
    <div style="text-align:center">
      <img src="{{profile}}" style="width:72px;height:72px;border-radius:14px;object-fit:cover"/>
      <h3 style="margin:10px 0;color:#3b2e79">{{displayName}}</h3>
      <p style="color:#6c5ea8">{{bio}}</p>
    </div>
    <div style="margin-top:12px;display:flex;flex-direction:column;gap:10px;">
      {{links}}
    </div>
  </div>
</section>
`));

  // return the list
  return templateList;
})();


// =================================================
// applyTemplate(html, data) — simple, safe renderer
// - Replaces {{displayName}}, {{bio}}, {{profile}}, {{themeColor}}
// - Converts data.links (array) into styled link buttons
// - Escapes input for safety
// =================================================
function applyTemplate(templateHtml, data){
  data = data || {};
  const escape = (s) => {
    if (s === null || s === undefined) return '';
    return String(s)
      .replaceAll('&','&amp;')
      .replaceAll('<','&lt;')
      .replaceAll('>','&gt;')
      .replaceAll('"','&quot;')
      .replaceAll("'",'&#39;');
  };

  // build links HTML: default pill-style button, responsive
  const linksArr = Array.isArray(data.links) ? data.links : [];
  const linksHtml = linksArr.map(l => {
    const title = escape(l.title || 'Link');
    const url = escape(l.url || '#');
    return `<a href="${url}" target="_blank" rel="noopener" style="
        display:block;
        text-decoration:none;
        background:${escape(data.themeColor || '#B18CFF')};
        color:white;
        padding:12px 14px;
        border-radius:12px;
        font-weight:600;
        text-align:center;
        box-shadow:0 8px 16px rgba(75,62,145,0.08);
      ">
        ${title}
      </a>`;
  }).join('\n');

  // replace common placeholders
  let out = templateHtml
    .replaceAll('{{displayName}}', escape(data.displayName || 'Creator'))
    .replaceAll('{{bio}}', escape(data.bio || 'Your bio goes here ✨'))
    .replaceAll('{{profile}}', escape(data.profile || './assets/avatar.png'))
    .replaceAll('{{themeColor}}', escape(data.themeColor || '#B18CFF'));

  // inject links
  out = out.replace('{{links}}', linksHtml);

  return out;
}

// Export for older code expecting templates variable
// (in browser environment it will be global)
if (typeof window !== 'undefined') {
  window.templates = templates;
  window.applyTemplate = applyTemplate;
}

// For module systems:
try { module.exports = { templates, applyTemplate }; } catch(e){}
