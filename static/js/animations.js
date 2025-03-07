document.addEventListener('DOMContentLoaded', function() {
    // Initialize animation observer
    const animatedElements = document.querySelectorAll('.animate');
    
    // Special handling for work page - make content visible immediately
    if (document.querySelector('.work-page')) {
        // Force work page animations to complete faster
        setTimeout(() => {
            document.querySelectorAll('.work-page .animate').forEach(el => {
                el.classList.add('animated');
            });
        }, 200); // Very short timeout to ensure content visibility
    }
    
    // If IntersectionObserver is available
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // Unobserve after animation is triggered
                    if (!entry.target.classList.contains('animate-repeat')) {
                        observer.unobserve(entry.target);
                    }
                } else if (entry.target.classList.contains('animate-repeat')) {
                    entry.target.classList.remove('animated');
                }
            });
        }, {
            threshold: 0.1, // Lower threshold to trigger earlier
            rootMargin: '0px 0px -5% 0px' // Smaller negative margin
        });
        
        // Observe all elements with animation classes
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback for browsers not supporting IntersectionObserver
        animatedElements.forEach(element => {
            element.classList.add('animated');
        });
    }
    
    // Faster failsafe for the work page
    const pageType = document.body.classList.contains('work-page') ? 'work' : 
                    (document.body.classList.contains('services-page') ? 'services' : 'other');
    
    // Set timeout based on page type
    const timeoutDuration = (pageType === 'work') ? 800 : 2000;
    
    // Ensure all animated elements are visible after a delay (failsafe)
    setTimeout(() => {
        document.querySelectorAll('.animate:not(.animated)').forEach(el => {
            el.classList.add('animated');
        });
    }, timeoutDuration);
    
    // Page entry animation
    document.body.classList.add('page-loaded');
    
    // Page transition animations
    const pageTransition = () => {
        const links = document.querySelectorAll('a:not([target="_blank"]):not([href^="#"]):not([href^="mailto:"])');
        
        links.forEach(link => {
            link.addEventListener('click', e => {
                // Skip if modifier keys are pressed
                if (e.metaKey || e.ctrlKey) return;
                
                const href = link.getAttribute('href');
                
                // Skip for external links
                if (!href || href.indexOf('http') === 0) return;
                
                e.preventDefault();
                
                document.body.classList.add('page-transitioning');
                
                setTimeout(() => {
                    window.location = href;
                }, 400);
            });
        });
    };
    
    pageTransition();
});
