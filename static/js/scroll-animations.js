document.addEventListener('DOMContentLoaded', function() {
    // Select all sections with the scroll-animate class
    const animatedSections = document.querySelectorAll('.scroll-animate');
    
    // Check if we should use reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        // Show all content immediately for users who prefer reduced motion
        animatedSections.forEach(section => {
            section.classList.add('visible');
            
            // Make all children visible too
            const animatedChildren = section.querySelectorAll('.scroll-animate-child');
            animatedChildren.forEach(child => {
                child.classList.add('visible');
            });
        });
        return;
    }
    
    // Set up intersection observer for sections
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class to trigger animation
                entry.target.classList.add('visible');
                
                // Get all animated children within this section
                const animatedChildren = entry.target.querySelectorAll('.scroll-animate-child');
                
                // Stagger the children animations
                if (animatedChildren.length > 0) {
                    animatedChildren.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('visible');
                        }, 100 * (index + 1));
                    });
                }
                
                // Unobserve after animation
                sectionObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -15% 0px'
    });
    
    // Observe all animated sections
    animatedSections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Create separate observer for standalone elements
    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                elementObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
    });
    
    // Observe standalone animated elements not inside sections
    document.querySelectorAll('.scroll-animate-item').forEach(item => {
        elementObserver.observe(item);
    });
});
