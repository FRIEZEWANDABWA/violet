// Main JavaScript for OZONE I.T SYSTEM Website
class OzoneWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initTheme();
        this.initNavigation();
        this.initSlideshow();
        this.initBackToTop();
        this.initNewsletterForm();
    }

    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            this.onDOMContentLoaded();
        });

        window.addEventListener('scroll', this.debounce(() => {
            this.onScroll();
        }, 10));

        window.addEventListener('resize', this.debounce(() => {
            this.onResize();
        }, 250));
    }

    onDOMContentLoaded() {
        // Ensure all content is visible immediately
        document.body.style.opacity = '1';
        document.body.style.visibility = 'visible';
        
        // Force show all elements
        const allElements = document.querySelectorAll('*');
        allElements.forEach(el => {
            el.style.opacity = '1';
            el.style.visibility = 'visible';
        });
        
        // Initialize AOS if available
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                once: true,
                offset: 100
            });
        }
        
        // Start slideshow
        this.startSlideshow();
        
        // Navigation is working properly
    }

    onScroll() {
        this.updateNavbar();
        this.updateBackToTop();
    }

    onResize() {
        // Handle responsive changes
    }

    // Theme Management
    initTheme() {
        const themeToggle = document.getElementById('themeToggle');
        const savedTheme = localStorage.getItem('theme') || 'dark';
        
        this.setTheme(savedTheme);
        
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                this.setTheme(newTheme);
                localStorage.setItem('theme', newTheme);
            });
        }
    }

    setTheme(theme) {
        const body = document.body;
        const themeToggle = document.getElementById('themeToggle');
        
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
            if (themeToggle) {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
        } else {
            body.classList.add('light-mode');
            body.classList.remove('dark-mode');
            if (themeToggle) {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        }
    }

    // Navigation
    initNavigation() {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-link');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle?.classList.remove('active');
                navMenu?.classList.remove('active');
            });
        });
    }

    updateNavbar() {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.background = 'var(--bg-primary)';
                navbar.style.boxShadow = 'var(--shadow-lg)';
            } else {
                navbar.style.background = 'var(--bg-overlay)';
                navbar.style.boxShadow = 'none';
            }
        }
    }

    // Hero Slideshow
    initSlideshow() {
        this.slides = document.querySelectorAll('.slide');
        this.currentSlide = 0;
    }

    startSlideshow() {
        if (this.slides.length > 1) {
            setInterval(() => {
                this.nextSlide();
            }, 5000);
        }
    }

    nextSlide() {
        this.slides[this.currentSlide].classList.remove('active');
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.slides[this.currentSlide].classList.add('active');
    }

    // Back to Top
    initBackToTop() {
        this.backToTopBtn = document.getElementById('backToTop');
        
        if (this.backToTopBtn) {
            this.backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    updateBackToTop() {
        if (this.backToTopBtn) {
            if (window.scrollY > 300) {
                this.backToTopBtn.classList.add('visible');
            } else {
                this.backToTopBtn.classList.remove('visible');
            }
        }
    }

    // Newsletter Form
    initNewsletterForm() {
        const newsletterForm = document.getElementById('newsletterForm');
        
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleNewsletterSubmission(newsletterForm);
            });
        }
    }

    handleNewsletterSubmission(form) {
        const email = form.querySelector('input[type="email"]').value;
        const submitBtn = form.querySelector('button[type="submit"]');
        
        if (!this.validateEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }

        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
        submitBtn.disabled = true;

        setTimeout(() => {
            alert('Thank you for subscribing to our newsletter!');
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }



    // Utility Functions
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Initialize the website
document.addEventListener('DOMContentLoaded', () => {
    const ozoneWebsite = new OzoneWebsite();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = OzoneWebsite;
}