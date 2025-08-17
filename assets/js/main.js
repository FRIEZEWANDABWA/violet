// Main JavaScript for OZONE I.T SYSTEM Website
// Modern, interactive, and AI-powered functionality

class OzoneWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initTheme();
        this.initNavigation();
        this.initScrollAnimations();
        this.initProgressBar();
        this.initSearch();
        this.initCounters();
        this.initLazyLoading();
        this.initSmoothScrolling();
        this.initBackToTop();
        this.initNewsletterForm();
        this.initPerformanceOptimizations();
        this.initAccessibility();
        this.initPWA();
    }

    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            this.onDOMContentLoaded();
        });

        window.addEventListener('load', () => {
            this.onWindowLoad();
        });

        window.addEventListener('scroll', this.debounce(() => {
            this.onScroll();
        }, 10));

        window.addEventListener('resize', this.debounce(() => {
            this.onResize();
        }, 250));
    }

    onDOMContentLoaded() {
        // Initialize AOS (Animate On Scroll) if available
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                offset: 100
            });
        }

        // Initialize particles
        this.initParticles();
        
        // Show initial animations
        this.showInitialAnimations();
    }

    onWindowLoad() {
        // Hide loading states
        document.body.classList.remove('loading');
        
        // Initialize performance monitoring
        this.monitorPerformance();
    }

    onScroll() {
        this.updateProgressBar();
        this.updateNavbar();
        this.updateBackToTop();
        this.triggerScrollAnimations();
    }

    onResize() {
        this.handleResponsiveChanges();
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
                document.body.classList.toggle('nav-open');
            });
        }

        // Close mobile menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle?.classList.remove('active');
                navMenu?.classList.remove('active');
                document.body.classList.remove('nav-open');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar') && navMenu?.classList.contains('active')) {
                navToggle?.classList.remove('active');
                navMenu?.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });

        // Active link highlighting
        this.updateActiveNavLink();
    }

    updateNavbar() {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    // Progress Bar
    initProgressBar() {
        this.progressBar = document.getElementById('progressBar');
    }

    updateProgressBar() {
        if (!this.progressBar) return;

        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollTop = window.scrollY;
        const progress = (scrollTop / documentHeight) * 100;

        this.progressBar.style.width = `${Math.min(progress, 100)}%`;
    }

    // Search Functionality
    initSearch() {
        const searchToggle = document.getElementById('searchToggle');
        const searchBar = document.getElementById('searchBar');
        const searchInput = document.getElementById('searchInput');
        const searchResults = document.getElementById('searchResults');
        const voiceSearch = document.getElementById('voiceSearch');

        if (searchToggle && searchBar) {
            searchToggle.addEventListener('click', () => {
                searchBar.classList.toggle('active');
                if (searchBar.classList.contains('active')) {
                    searchInput?.focus();
                }
            });
        }

        if (searchInput) {
            searchInput.addEventListener('input', this.debounce((e) => {
                this.performSearch(e.target.value);
            }, 300));

            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    searchBar?.classList.remove('active');
                }
            });
        }

        // Voice search
        if (voiceSearch && 'webkitSpeechRecognition' in window) {
            const recognition = new webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-US';

            voiceSearch.addEventListener('click', () => {
                recognition.start();
                voiceSearch.classList.add('listening');
            });

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                if (searchInput) {
                    searchInput.value = transcript;
                    this.performSearch(transcript);
                }
                voiceSearch.classList.remove('listening');
            };

            recognition.onerror = () => {
                voiceSearch.classList.remove('listening');
            };
        } else if (voiceSearch) {
            voiceSearch.style.display = 'none';
        }

        // Close search when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-bar') && !e.target.closest('.search-toggle')) {
                searchBar?.classList.remove('active');
            }
        });
    }

    performSearch(query) {
        const searchResults = document.getElementById('searchResults');
        if (!searchResults || !query.trim()) {
            searchResults.style.display = 'none';
            return;
        }

        // Simulate search results (replace with actual search logic)
        const mockResults = [
            { title: 'Networking Solutions', url: 'services.html#networking', description: 'Complete network infrastructure design and implementation' },
            { title: 'Security Systems', url: 'services.html#security', description: 'Advanced security solutions for complete protection' },
            { title: 'PBX & IPBX Systems', url: 'services.html#pbx', description: 'Modern communication systems for businesses' },
            { title: 'About Us', url: 'about.html', description: 'Learn more about OZONE I.T SYSTEM' },
            { title: 'Contact Us', url: 'contact.html', description: 'Get in touch with our team' }
        ];

        const filteredResults = mockResults.filter(result => 
            result.title.toLowerCase().includes(query.toLowerCase()) ||
            result.description.toLowerCase().includes(query.toLowerCase())
        );

        if (filteredResults.length > 0) {
            searchResults.innerHTML = filteredResults.map(result => `
                <div class="search-result-item" onclick="window.location.href='${result.url}'">
                    <h4>${result.title}</h4>
                    <p>${result.description}</p>
                </div>
            `).join('');
            searchResults.style.display = 'block';
        } else {
            searchResults.innerHTML = '<div class="search-result-item">No results found</div>';
            searchResults.style.display = 'block';
        }
    }

    // Scroll Animations
    initScrollAnimations() {
        this.animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
        this.observeElements();
    }

    observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        this.animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    triggerScrollAnimations() {
        // Additional scroll-triggered animations can be added here
    }

    showInitialAnimations() {
        // Ensure all content is visible immediately
        const allContent = document.querySelectorAll('.hero-content, .hero-visual, .service-card, .feature-item');
        allContent.forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'none';
            element.style.visibility = 'visible';
        });
        
        // Only add animation classes to elements that will be animated on scroll
        const elementsToAnimate = [
            { selector: '.service-card', class: 'fade-in' },
            { selector: '.feature-item', class: 'scale-in' }
        ];

        elementsToAnimate.forEach(({ selector, class: animationClass }) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((element, index) => {
                // Only add animation class if element is not in viewport
                const rect = element.getBoundingClientRect();
                if (rect.top > window.innerHeight) {
                    element.classList.add(animationClass);
                    element.style.animationDelay = `${index * 0.1}s`;
                }
            });
        });
    }

    // Counter Animations
    initCounters() {
        const counters = document.querySelectorAll('.stat-number[data-count]');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    animateCounter(element) {
        const target = parseInt(element.dataset.count);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }

    // Lazy Loading
    initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            img.classList.add('lazy');
            imageObserver.observe(img);
        });
    }

    // Smooth Scrolling
    initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Scroll indicator
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                const nextSection = document.querySelector('.services-preview');
                if (nextSection) {
                    nextSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }

    // Back to Top Button
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
            this.showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Show loading state
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            this.showNotification('Thank you for subscribing to our newsletter!', 'success');
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    // Particles Animation
    initParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;

        const particleCount = 50;
        const particles = [];

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(37, 99, 235, 0.3);
                border-radius: 50%;
                pointer-events: none;
            `;
            
            particlesContainer.appendChild(particle);
            particles.push({
                element: particle,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5
            });
        }

        const animateParticles = () => {
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1;
                if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1;

                particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px)`;
            });

            requestAnimationFrame(animateParticles);
        };

        animateParticles();
    }

    // Performance Optimizations
    initPerformanceOptimizations() {
        // Preload critical resources
        this.preloadCriticalResources();
        
        // Optimize images
        this.optimizeImages();
        
        // Enable service worker for caching
        this.registerServiceWorker();
    }

    preloadCriticalResources() {
        const criticalResources = [
            './assets/css/style.css',
            './pics/pexels-divinetechygirl-1181354.webp'
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = resource.endsWith('.css') ? 'style' : 'image';
            document.head.appendChild(link);
        });
    }

    optimizeImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.loading) {
                img.loading = 'lazy';
            }
        });
    }

    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./sw.js')
                .then(registration => {
                    console.log('Service Worker registered:', registration);
                })
                .catch(error => {
                    console.log('Service Worker registration failed:', error);
                });
        }
    }

    monitorPerformance() {
        if ('performance' in window) {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Page load time: ${loadTime}ms`);
            
            // Send performance data to analytics (if implemented)
            if (loadTime > 3000) {
                console.warn('Page load time is above 3 seconds');
            }
        }
    }

    // Accessibility
    initAccessibility() {
        // Keyboard navigation
        this.initKeyboardNavigation();
        
        // Focus management
        this.initFocusManagement();
        
        // Screen reader support
        this.initScreenReaderSupport();
    }

    initKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Escape key closes modals and menus
            if (e.key === 'Escape') {
                const activeModal = document.querySelector('.modal.active');
                const activeMenu = document.querySelector('.nav-menu.active');
                const activeSearch = document.querySelector('.search-bar.active');
                
                if (activeModal) activeModal.classList.remove('active');
                if (activeMenu) activeMenu.classList.remove('active');
                if (activeSearch) activeSearch.classList.remove('active');
            }
        });
    }

    initFocusManagement() {
        // Trap focus in modals
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            const focusableElements = modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            
            if (focusableElements.length > 0) {
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
                modal.addEventListener('keydown', (e) => {
                    if (e.key === 'Tab') {
                        if (e.shiftKey && document.activeElement === firstElement) {
                            e.preventDefault();
                            lastElement.focus();
                        } else if (!e.shiftKey && document.activeElement === lastElement) {
                            e.preventDefault();
                            firstElement.focus();
                        }
                    }
                });
            }
        });
    }

    initScreenReaderSupport() {
        // Add ARIA labels and descriptions where needed
        const buttons = document.querySelectorAll('button:not([aria-label])');
        buttons.forEach(button => {
            const icon = button.querySelector('i');
            if (icon && !button.textContent.trim()) {
                const iconClass = icon.className;
                let label = 'Button';
                
                if (iconClass.includes('search')) label = 'Search';
                else if (iconClass.includes('menu')) label = 'Menu';
                else if (iconClass.includes('close')) label = 'Close';
                else if (iconClass.includes('play')) label = 'Play';
                
                button.setAttribute('aria-label', label);
            }
        });
    }

    // PWA Support
    initPWA() {
        // Add to home screen prompt
        let deferredPrompt;
        
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            this.showInstallPrompt();
        });

        window.addEventListener('appinstalled', () => {
            console.log('PWA was installed');
            this.hideInstallPrompt();
        });
    }

    showInstallPrompt() {
        // Create install prompt (can be customized)
        const installPrompt = document.createElement('div');
        installPrompt.className = 'install-prompt';
        installPrompt.innerHTML = `
            <div class="install-prompt-content">
                <p>Install OZONE I.T SYSTEM app for a better experience</p>
                <button class="btn btn-primary" id="installBtn">Install</button>
                <button class="btn btn-secondary" id="dismissBtn">Dismiss</button>
            </div>
        `;
        
        document.body.appendChild(installPrompt);
        
        document.getElementById('installBtn').addEventListener('click', () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('User accepted the install prompt');
                    }
                    deferredPrompt = null;
                });
            }
            this.hideInstallPrompt();
        });
        
        document.getElementById('dismissBtn').addEventListener('click', () => {
            this.hideInstallPrompt();
        });
    }

    hideInstallPrompt() {
        const installPrompt = document.querySelector('.install-prompt');
        if (installPrompt) {
            installPrompt.remove();
        }
    }

    // Responsive Handling
    handleResponsiveChanges() {
        const isMobile = window.innerWidth <= 768;
        
        // Adjust particle count for mobile
        if (isMobile) {
            const particles = document.querySelectorAll('.particle');
            particles.forEach((particle, index) => {
                if (index > 20) {
                    particle.style.display = 'none';
                }
            });
        }
        
        // Update navigation for mobile
        const navMenu = document.getElementById('navMenu');
        if (navMenu && !isMobile) {
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
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

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem',
            borderRadius: '0.5rem',
            color: 'white',
            fontWeight: '500',
            zIndex: '9999',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            maxWidth: '400px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            backgroundColor: this.getNotificationColor(type)
        });

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || icons.info;
    }

    getNotificationColor(type) {
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6'
        };
        return colors[type] || colors.info;
    }
}

// Initialize the website
const ozoneWebsite = new OzoneWebsite();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = OzoneWebsite;
}