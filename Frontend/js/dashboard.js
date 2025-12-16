(function() {
const API_BASE = '/api';
let currentDeleteId = null;
const elements = {
    pagesGrid: document.getElementById('pagesGrid'),
    emptyState: document.getElementById('emptyState'),
    deleteModal: document.getElementById('deleteModal'),
    confirmDelete: document.getElementById('confirmDelete'),
    cancelDelete: document.getElementById('cancelDelete'),
    logoutBtn: document.getElementById('logoutBtn'),
    createPageBtn: document.getElementById('createPageBtn')
};

function checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return false;
    }
    return token;
}

function formatDate(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
}

function getTemplateName(templateId) {
    const templates = {
        1: 'Classic',
        2: 'Minimal',
        3: 'Modern',
        4: 'Bold'
    };
    return templates[templateId] || 'Template ' + templateId;
}

function createPageCard(page) {
    const card = document.createElement('div');
    card.className = 'page-card';
    
    const statusClass = page.published ? 'status-published' : 'status-draft';
    const statusText = page.published ? 'Published' : 'Draft';
    
    card.innerHTML = `
        <div class="page-card-header">
            <div>
                <div class="page-card-title">${escapeHtml(page.displayName)}</div>
                <div class="page-card-slug">/${escapeHtml(page.slug)}</div>
            </div>
            <span class="status-badge ${statusClass}">${statusText}</span>
        </div>
        <div class="page-card-meta">
            <span class="template-badge">${getTemplateName(page.template)}</span>
            <span>•</span>
            <span>${formatDate(page.updatedAt)}</span>
        </div>
        <div class="page-card-actions">
            <button class="btn-action btn-edit" data-id="${page.id}">Edit</button>
            <button class="btn-action btn-view" data-slug="${page.slug}">View</button>
            <button class="btn-action btn-delete" data-id="${page.id}">Delete</button>
        </div>
    `;
    
    return card;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function renderPages(pages) {
    elements.pagesGrid.innerHTML = '';
    
    if (!pages || pages.length === 0) {
        elements.emptyState.classList.add('visible');
        elements.pagesGrid.style.display = 'none';
        return;
    }
    
    elements.emptyState.classList.remove('visible');
    elements.pagesGrid.style.display = 'grid';
    
    pages.forEach(page => {
        const card = createPageCard(page);
        elements.pagesGrid.appendChild(card);
    });
    
    attachCardListeners();
}

function attachCardListeners() {
    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', function() {
            const pageId = this.getAttribute('data-id');
            window.location.href = `editor.html?pageId=${pageId}`;
        });
    });
    
    document.querySelectorAll('.btn-view').forEach(btn => {
        btn.addEventListener('click', function() {
            const slug = this.getAttribute('data-slug');
            window.location.href = `view.html?slug=${slug}`;
        });
    });
    
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', function() {
            currentDeleteId = this.getAttribute('data-id');
            elements.deleteModal.classList.add('visible');
        });
    });
}

async function fetchPages() {
    const token = checkAuth();
    if (!token) return;
    
    try {
        const response = await fetch(`${API_BASE}/pages`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            if (response.status === 401) {
                localStorage.removeItem('token');
                window.location.href = 'login.html';
                return;
            }
            throw new Error('Failed to fetch pages');
        }
        
        const pages = await response.json();
        renderPages(pages);
    } catch (error) {
        console.error('Error fetching pages:', error);
        alert('Failed to load pages. Please try again.');
    }
}

async function deletePage(pageId) {
    const token = checkAuth();
    if (!token) return;
    
    try {
        const response = await fetch(`${API_BASE}/pages/${pageId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to delete page');
        }
        
        await fetchPages();
    } catch (error) {
        console.error('Error deleting page:', error);
        alert('Failed to delete page. Please try again.');
    }
}

function setupEventListeners() {
    elements.logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('token');
        window.location.href = 'login.html';
    });
    
    elements.createPageBtn.addEventListener('click', function() {
        window.location.href = 'editor.html';
    });
    
    document.querySelector('.btn-create-first')?.addEventListener('click', function() {
        window.location.href = 'editor.html';
    });
    
    elements.confirmDelete.addEventListener('click', async function() {
        if (currentDeleteId) {
            await deletePage(currentDeleteId);
            elements.deleteModal.classList.remove('visible');
            currentDeleteId = null;
        }
    });
    
    elements.cancelDelete.addEventListener('click', function() {
        elements.deleteModal.classList.remove('visible');
        currentDeleteId = null;
    });
    
    elements.deleteModal.querySelector('.modal-overlay')?.addEventListener('click', function() {
        elements.deleteModal.classList.remove('visible');
        currentDeleteId = null;
    });
}

function init() {
    if (!checkAuth()) return;
    setupEventListeners();
    fetchPages();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
})();