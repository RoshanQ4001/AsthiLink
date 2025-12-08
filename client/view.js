// ===============================================================
// AesthiLink — VIEW.JS
// Renders a published page using templates.js + applyTemplate()
// ===============================================================

(() => {
  const container = document.getElementById('publicContainer');
  const params = new URLSearchParams(location.search);
  const pageId = params.get('pageId');

  // no page ID provided
  if (!pageId) {
    container.innerHTML = `
      <div class="text-center p-8">
        <h2 class="text-2xl font-semibold text-[#4B3E91]">Page not found</h2>
        <p class="text-[#6C5EA8] mt-2">No page selected.</p>
        <a href="dashboard.html" class="inline-block mt-4 px-4 py-2 bg-[#B18CFF] text-white rounded-lg">
          Go to Dashboard
        </a>
      </div>`;
    return;
  }

  // load all pages
  const pages = JSON.parse(localStorage.getItem('aesthi_pages') || '[]');
  const page = pages.find(p => p.id === pageId);

  // if not found
  if (!page) {
    container.innerHTML = `
      <div class="text-center p-8">
        <h2 class="text-2xl font-semibold text-[#4B3E91]">Page not found</h2>
        <p class="text-[#6C5EA8] mt-2">This page may not be published yet.</p>
        <a href="dashboard.html" class="inline-block mt-4 px-4 py-2 bg-[#B18CFF] text-white rounded-lg">
          Go to Dashboard
        </a>
      </div>`;
    return;
  }

  // default values
  const pageData = {
    displayName: page.displayName || "Creator",
    bio: page.bio || "",
    profile: page.profile || "./assets/avatar.png",
    themeColor: page.themeColor || "#B18CFF",
    links: page.links || [],
    template: Number(page.template) || 1
  };

  const template = templates.find(t => t.id === pageData.template);

  if (!template) {
    container.innerHTML = `<div class="p-6 text-red-500">Template not found</div>`;
    return;
  }

  // Try to render template
  try {
    const html = applyTemplate(template.html, pageData);
    container.innerHTML = html;

    // optional: apply template background
    if (template.palette && template.palette[0]) {
      document.body.style.background = template.palette[0];
    }

  } catch (err) {
    console.error(err);
    container.innerHTML = `
      <div class="p-6 text-red-500">
        Error rendering template.
      </div>`;
  }

})();
