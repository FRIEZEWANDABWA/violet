// Universal Page Fix - Ensures all content is visible
(function() {
    'use strict';
    
    // Immediate fix - run as soon as script loads
    function forceShowContent() {
        document.body.style.opacity = '1';
        document.body.style.visibility = 'visible';
        
        // Force show all elements - more aggressive for mobile
        const style = document.createElement('style');
        style.textContent = `
            * { 
                opacity: 1 !important; 
                visibility: visible !important; 
                transform: none !important;
                display: block !important;
            }
            body { 
                opacity: 1 !important; 
                visibility: visible !important; 
            }
            .container, section, div, p, h1, h2, h3, h4, h5, h6 {
                opacity: 1 !important;
                visibility: visible !important;
            }
            /* Mobile specific fixes */
            @media (max-width: 768px) {
                * {
                    opacity: 1 !important;
                    visibility: visible !important;
                    transform: none !important;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Force show specific elements
        setTimeout(() => {
            const allElements = document.querySelectorAll('*');
            allElements.forEach(el => {
                el.style.opacity = '1';
                el.style.visibility = 'visible';
            });
        }, 100);
    }
    
    // Run immediately
    forceShowContent();
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', forceShowContent);
    } else {
        forceShowContent();
    }
    
    // Initialize AOS safely - disabled on mobile
    function initAOS() {
        // Disable AOS completely on mobile to prevent blank pages
        const isMobile = window.innerWidth <= 768;
        if (!isMobile && typeof AOS !== 'undefined') {
            AOS.init({
                duration: 600,
                once: true,
                offset: 50
            });
        }
    }
    
    // Wait for AOS to load
    setTimeout(initAOS, 100);
    

})();