document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll reveal for project sections
    const sections = document.querySelectorAll('.project-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Add "copy link" functionality for images
    const galleryImages = document.querySelectorAll('.project-gallery__item, .project-mockups__item, .project-final__item');
    
    galleryImages.forEach(item => {
        item.addEventListener('click', function() {
            // Show an indicator that the image link was copied (can be implemented if needed)
            // This is just a placeholder for potential enhancement
        });
    });
});
