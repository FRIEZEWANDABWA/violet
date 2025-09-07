// Main JavaScript functionality for Violet Makhanu's website

class VioletWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeAOS();
        this.setupScrollProgress();
        this.setupNavigation();
        this.setupThemeToggle();
        this.setupCounters();
        this.setupMediaTabs();
        this.setupContactForm();
        this.setupVoiceSearch();
        this.setupParticles();
    }

    setupEventListeners() {
        // DOM Content Loaded
        document.addEventListener('DOMContentLoaded', () => {
            this.updateScrollProgress();
            this.highlightActiveSection();
        });

        // Scroll Events
        window.addEventListener('scroll', () => {
            this.updateScrollProgress();
            this.highlightActiveSection();
            this.handleNavbarScroll();
        });

        // Resize Events
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    initializeAOS() {
        // Initialize Animate On Scroll library
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                offset: 100
            });
        }
    }

    setupScrollProgress() {
        const progressBar = document.querySelector('.scroll-progress');
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            if (progressBar) {
                progressBar.style.width = scrollPercent + '%';
            }
        });
    }

    updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        const progressBar = document.querySelector('.scroll-progress');
        if (progressBar) {
            progressBar.style.width = scrollPercent + '%';
        }
    }

    setupNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Mobile menu toggle
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }

        // Handle navigation links - only for mobile menu closing
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Only handle same-page anchor links (starting with #)
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetSection = document.getElementById(targetId);
                    
                    if (targetSection) {
                        const offsetTop = targetSection.offsetTop - 70;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
                // For .html files, do nothing - let browser handle normally

                // Close mobile menu for all clicks
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    if (navToggle) navToggle.classList.remove('active');
                }
            });
        });
    }

    highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    handleNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const body = document.body;
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            body.classList.toggle('light-mode', savedTheme === 'light');
            this.updateThemeIcon(savedTheme === 'light');
        }

        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                body.classList.toggle('light-mode');
                const isLight = body.classList.contains('light-mode');
                
                // Save theme preference
                localStorage.setItem('theme', isLight ? 'light' : 'dark');
                this.updateThemeIcon(isLight);
            });
        }
    }

    updateThemeIcon(isLight) {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
            }
        }
    }

    setupCounters() {
        const counters = document.querySelectorAll('.kpi-number');
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }

    setupMediaTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');
                
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                button.classList.add('active');
                const targetContent = document.getElementById(targetTab);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });

        // Setup gallery lightbox
        this.setupGalleryLightbox();
    }

    setupGalleryLightbox() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                if (img) {
                    this.openLightbox(img.src, img.alt);
                }
            });
        });
    }

    openLightbox(src, alt) {
        // Create lightbox overlay
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox-overlay';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${src}" alt="${alt}">
                <button class="lightbox-close">&times;</button>
            </div>
        `;

        // Add styles
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        const content = lightbox.querySelector('.lightbox-content');
        content.style.cssText = `
            position: relative;
            max-width: 90vw;
            max-height: 90vh;
        `;

        const img = lightbox.querySelector('img');
        img.style.cssText = `
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
        `;

        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.style.cssText = `
            position: absolute;
            top: -40px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 2rem;
            cursor: pointer;
            padding: 10px;
        `;

        document.body.appendChild(lightbox);

        // Animate in
        setTimeout(() => {
            lightbox.style.opacity = '1';
        }, 10);

        // Close handlers
        const closeLightbox = () => {
            lightbox.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(lightbox);
            }, 300);
        };

        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeLightbox();
            }
        });
    }

    setupContactForm() {
        const form = document.getElementById('contactForm');
        const aiAssistBtn = document.getElementById('ai-assist');

        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(form);
            });
        }

        if (aiAssistBtn) {
            aiAssistBtn.addEventListener('click', () => {
                this.handleAIAssist();
            });
        }
    }

    handleFormSubmission(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            this.showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            form.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    handleAIAssist() {
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message');
        
        let aiResponse = '';
        
        switch(subject) {
            case 'bursary':
                aiResponse = 'For bursary applications, please include: 1) Student details, 2) School information, 3) Financial need documentation, 4) Academic performance records. Applications are reviewed quarterly.';
                break;
            case 'project':
                aiResponse = 'Thank you for your interest in our development projects. Please specify the type of project (roads, water, health, education) and your location within Mihuu Ward for targeted assistance.';
                break;
            case 'volunteer':
                aiResponse = 'We welcome volunteers! Please mention your skills, availability, and areas of interest (youth programs, community outreach, events, etc.). We\'ll match you with suitable opportunities.';
                break;
            default:
                aiResponse = 'Hello! I\'m here to help. Please provide more details about your inquiry, and I\'ll ensure Hon. Violet Makhanu receives your message promptly.';
        }
        
        if (message) {
            message.value = aiResponse;
            message.focus();
        }
    }

    setupVoiceSearch() {
        const voiceBtn = document.getElementById('voice-search');
        
        if (voiceBtn && 'webkitSpeechRecognition' in window) {
            const recognition = new webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-US';

            voiceBtn.addEventListener('click', () => {
                recognition.start();
                voiceBtn.innerHTML = '<i class="fas fa-microphone-slash"></i>';
                voiceBtn.style.color = 'var(--error)';
            });

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript.toLowerCase();
                this.handleVoiceCommand(transcript);
            };

            recognition.onend = () => {
                voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
                voiceBtn.style.color = '';
            };

            recognition.onerror = () => {
                this.showNotification('Voice recognition error. Please try again.', 'error');
                voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
                voiceBtn.style.color = '';
            };
        } else {
            // Hide voice button if not supported
            if (voiceBtn) {
                voiceBtn.style.display = 'none';
            }
        }
    }

    handleVoiceCommand(transcript) {
        // Simple voice navigation
        if (transcript.includes('about')) {
            this.scrollToSection('about');
        } else if (transcript.includes('achievements') || transcript.includes('projects')) {
            this.scrollToSection('achievements');
        } else if (transcript.includes('vision') || transcript.includes('future')) {
            this.scrollToSection('vision');
        } else if (transcript.includes('contact') || transcript.includes('reach')) {
            this.scrollToSection('contact');
        } else if (transcript.includes('media') || transcript.includes('gallery')) {
            this.scrollToSection('media');
        } else if (transcript.includes('home')) {
            this.scrollToSection('home');
        } else {
            this.showNotification(`Voice command "${transcript}" not recognized. Try "about", "achievements", "vision", "contact", or "media".`, 'info');
        }
    }

    setupParticles() {
        // Initialize particles if the library is available
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles', {
                particles: {
                    number: { value: 50 },
                    color: { value: '#2563eb' },
                    shape: { type: 'circle' },
                    opacity: { value: 0.3 },
                    size: { value: 3 },
                    move: {
                        enable: true,
                        speed: 1,
                        direction: 'none',
                        random: true,
                        straight: false,
                        out_mode: 'out',
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: { enable: true, mode: 'repulse' },
                        onclick: { enable: true, mode: 'push' },
                        resize: true
                    }
                },
                retina_detect: true
            });
        }
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const offsetTop = section.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;

        // Set background color based on type
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#2563eb'
        };
        notification.style.backgroundColor = colors[type] || colors.info;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }

    handleResize() {
        // Handle responsive adjustments
        const navbar = document.querySelector('.navbar');
        const navMenu = document.getElementById('nav-menu');
        
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    }
}

// Global utility functions
window.scrollToSection = function(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
};

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new VioletWebsite();
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VioletWebsite;
}