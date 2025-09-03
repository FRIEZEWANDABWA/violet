// Universal Page Fix - Ensures all content is visible
(function() {
    'use strict';
    
    // Immediate fix - run as soon as script loads
    function forceShowContent() {
        document.body.style.opacity = '1';
        document.body.style.visibility = 'visible';
        
        // Force show all elements
        const style = document.createElement('style');
        style.textContent = `
            * { 
                opacity: 1 !important; 
                visibility: visible !important; 
                transform: none !important;
            }
            body { 
                opacity: 1 !important; 
                visibility: visible !important; 
            }
        `;
        document.head.appendChild(style);
    }
    
    // Run immediately
    forceShowContent();
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', forceShowContent);
    } else {
        forceShowContent();
    }
    
    // Initialize AOS safely
    function initAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 600,
                once: true,
                offset: 50,
                disable: 'mobile' // Disable on mobile for better performance
            });
        }
    }
    
    // Wait for AOS to load
    setTimeout(initAOS, 100);
    
    // Page transition effect
    function addPageTransitions() {
        const links = document.querySelectorAll('a[href$=".html"]');
        links.forEach(link => {
            if (link.hostname === window.location.hostname) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    document.body.style.transition = 'opacity 0.2s ease';
                    document.body.style.opacity = '0.7';
                    
                    setTimeout(() => {
                        window.location.href = this.href;
                    }, 200);
                });
            }
        });
    }
    
    // Add transitions when DOM is ready
    document.addEventListener('DOMContentLoaded', addPageTransitions);
})();