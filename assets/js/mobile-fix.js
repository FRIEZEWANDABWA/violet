// Mobile-specific fixes for OZONE I.T SYSTEM website
(function() {
    'use strict';
    
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
    
    if (isMobile) {
        // Aggressive mobile content fix
        function mobileContentFix() {
            // Force all elements visible
            const allElements = document.querySelectorAll('*');
            allElements.forEach(el => {
                el.style.opacity = '1';
                el.style.visibility = 'visible';
                el.style.transform = 'none';
            });
            
            // Add mobile-specific CSS
            const mobileCSS = document.createElement('style');
            mobileCSS.textContent = `
                /* Mobile force visible */
                * {
                    opacity: 1 !important;
                    visibility: visible !important;
                    transform: none !important;
                }
                
                /* Disable problematic animations on mobile */
                [data-aos] {
                    opacity: 1 !important;
                    transform: none !important;
                    transition: none !important;
                }
                
                /* Mobile layout fixes */
                .container {
                    padding: 0 1rem !important;
                }
                
                .hero {
                    min-height: 70vh !important;
                }
                
                .section-padding {
                    padding: 2rem 0 !important;
                }
                
                /* Mobile grid fixes */
                .services-grid,
                .portfolio-grid,
                .gallery-grid,
                .blog-grid {
                    grid-template-columns: 1fr !important;
                    gap: 1rem !important;
                }
                
                /* Mobile text fixes */
                h1 { font-size: 2rem !important; }
                h2 { font-size: 1.5rem !important; }
                h3 { font-size: 1.25rem !important; }
                
                /* Mobile button fixes */
                .btn {
                    width: 100% !important;
                    max-width: 280px !important;
                }
            `;
            document.head.appendChild(mobileCSS);
        }
        
        // Run immediately
        mobileContentFix();
        
        // Run when DOM is ready
        document.addEventListener('DOMContentLoaded', mobileContentFix);
        
        // Run after a delay to catch late-loading content
        setTimeout(mobileContentFix, 500);
        setTimeout(mobileContentFix, 1000);
        
        // Disable AOS completely on mobile
        window.addEventListener('load', function() {
            if (typeof AOS !== 'undefined') {
                AOS.init = function() {}; // Disable AOS
            }
        });
        
        // Fix mobile navigation
        document.addEventListener('DOMContentLoaded', function() {
            const navToggle = document.getElementById('navToggle');
            const navMenu = document.getElementById('navMenu');
            
            if (navToggle && navMenu) {
                navToggle.addEventListener('click', function() {
                    navMenu.classList.toggle('active');
                    navToggle.classList.toggle('active');
                });
                
                // Close menu when clicking links
                const navLinks = navMenu.querySelectorAll('a');
                navLinks.forEach(link => {
                    link.addEventListener('click', function() {
                        navMenu.classList.remove('active');
                        navToggle.classList.remove('active');
                    });
                });
            }
        });
    }
})();