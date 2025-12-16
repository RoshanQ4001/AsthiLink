// Main JavaScript for AesthiLink

document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initSmoothScrolling();
    initAnimations();
    initTemplatePreview();
    initFAQToggle();
    initMobileMenu();
    initAnalytics();
});

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize animations
function initAnimations() {
    // Add animation class to elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);
    
    // Observe all feature cards and sections
    document.querySelectorAll('.card-hover, section > div').forEach(el => {
        observer.observe(el);
    });
}

// Template preview functionality
function initTemplatePreview() {
    const templateCards = document.querySelectorAll('[data-template-preview]');
    
    templateCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const templateName = this.querySelector('h3').textContent;
            showTemplatePreview(templateName);
        });
        
        card.addEventListener('mouseleave', function() {
            hideTemplatePreview();
        });
    });
}

function showTemplatePreview(templateName) {
    // In a real implementation, this would show a larger preview
    console.log(`Previewing template: ${templateName}`);
}

function hideTemplatePreview() {
    // Hide preview
}

// FAQ toggle functionality
function initFAQToggle() {
    const faqItems = document.querySelectorAll('.bg-white.rounded-2xl.p-6');
    
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        const answer = item.querySelector('p');
        
        // Initially hide answers (for mobile)
        if (window.innerWidth < 768) {
            answer.style.display = 'none';
            question.style.cursor = 'pointer';
            
            question.addEventListener('click', function() {
                const isVisible = answer.style.display === 'block';
                answer.style.display = isVisible ? 'none' : 'block';
                
                // Add visual feedback
                item.classList.toggle('faq-active', !isVisible);
            });
        }
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.className = 'md:hidden flex flex-col space-y-1';
    mobileMenuButton.innerHTML = `
        <span class="w-6 h-0.5 bg-gray-600"></span>
        <span class="w-6 h-0.5 bg-gray-600"></span>
        <span class="w-6 h-0.5 bg-gray-600"></span>
    `;
    
    const nav = document.querySelector('nav .container > div');
    const desktopMenu = nav.querySelector('.hidden.md\\:flex');
    
    if (desktopMenu && window.innerWidth < 768) {
        // Create mobile menu
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-pink-100 p-4';
        
        const menuItems = Array.from(desktopMenu.children).map(item => {
            const clone = item.cloneNode(true);
            clone.className = 'block py-2 text-gray-600 hover:text-pink-400 transition';
            return clone;
        });
        
        menuItems.forEach(item => mobileMenu.appendChild(item));
        nav.appendChild(mobileMenu);
        
        // Insert menu button
        nav.insertBefore(mobileMenuButton, nav.children[1]);
        
        // Toggle menu
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            this.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.classList.remove('active');
            }
        });
    }
}

// Analytics (basic page view tracking)
function initAnalytics() {
    // Track page views (in a real app, this would connect to your analytics service)
    const pageViewData = {
        page: window.location.pathname,
        timestamp: new Date().toISOString(),
        referrer: document.referrer
    };
    
    // Store in localStorage for demo purposes
    const analytics = JSON.parse(localStorage.getItem('aesthilink_analytics') || '[]');
    analytics.push(pageViewData);
    localStorage.setItem('aesthilink_analytics', JSON.stringify(analytics));
    
    // Log for demo
    console.log('Page view tracked:', pageViewData);
}

// Pricing plan selection
function selectPlan(planType) {
    const freePlanBtn = document.querySelector('[href*="signup.html"]');
    const proPlanBtn = document.querySelector('[href*="signup.html"].bg-gradient-to-r');
    
    if (planType === 'pro') {
        // In a real implementation, this would redirect to signup with plan selected
        localStorage.setItem('selected_plan', 'pro');
        console.log('Pro plan selected');
    } else {
        localStorage.setItem('selected_plan', 'free');
        console.log('Free plan selected');
    }
}

// Newsletter signup
function initNewsletterSignup() {
    const newsletterForm = document.querySelector('#newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // In a real implementation, this would send to your backend
            console.log('Newsletter signup:', email);
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'mt-4 p-3 bg-green-50 text-green-700 rounded-lg';
            successMsg.textContent = 'Thanks for subscribing! Check your email for cute updates. ✨';
            
            this.appendChild(successMsg);
            this.reset();
            
            // Remove message after 5 seconds
            setTimeout(() => successMsg.remove(), 5000);
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNewsletterSignup);
} else {
    initNewsletterSignup();
}

// Export functions for use in other modules
export { selectPlan, initNewsletterSignup };