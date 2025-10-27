// Page Navigation System
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageId + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
        
        // Scroll to top of content area
        const contentArea = document.querySelector('.content-area');
        if (contentArea) {
            contentArea.scrollTop = 0;
        }
    }
    
    // Update active nav button
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.querySelector(`[data-page="${pageId}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}

// Initialize navigation buttons
document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const pageId = this.getAttribute('data-page');
            showPage(pageId);
        });
    });
    
    // Show default page (about)
    showPage('about');
});

// Handle anchor links within pages (like hero buttons)
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        
        // Check if it's a page navigation
        const pages = ['about', 'research', 'skills', 'courses', 'achievements', 'contact'];
        if (pages.includes(targetId)) {
            showPage(targetId);
        }
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements
const animatedElements = document.querySelectorAll(
    '.project-card, .skill-category, .soft-skill-card, .stat-item, .achievement-item'
);

animatedElements.forEach(element => {
    element.classList.add('fade-in');
    observer.observe(element);
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };
        
        // Simulate form submission (in a real application, this would send data to a server)
        formMessage.className = 'form-message success';
        formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
        
        // Reset form
        contactForm.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
            setTimeout(() => {
                formMessage.className = 'form-message';
            }, 300);
        }, 5000);
    });
}

// Add animation delay to cards for staggered effect
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

const softSkillCards = document.querySelectorAll('.soft-skill-card');
softSkillCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.05}s`;
});

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Use in-memory variable for theme state (localStorage is blocked in sandbox)
let currentTheme = 'light';

// Check system preference on load
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    currentTheme = 'dark';
}

// Set initial theme
html.setAttribute('data-theme', currentTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', function() {
        currentTheme = html.getAttribute('data-theme');
        
        if (currentTheme === 'light') {
            html.setAttribute('data-theme', 'dark');
            currentTheme = 'dark';
        } else {
            html.setAttribute('data-theme', 'light');
            currentTheme = 'light';
        }
    });
}

// Listen for system theme changes
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        const newTheme = e.matches ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        currentTheme = newTheme;
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateActiveNav();
    
    // Add entrance animation to hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
});

// Smooth scroll within content area
const contentArea = document.querySelector('.content-area');
if (contentArea) {
    contentArea.style.scrollBehavior = 'smooth';
}