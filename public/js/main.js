document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
    
    // Header scroll effect
    const header = document.querySelector('.site-header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      lastScrollY = window.scrollY;
    });
    
    // Form submission
    const subscribeForm = document.querySelector('.subscribe-form');
    
    if (subscribeForm) {
      subscribeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        if (email) {
          // Add your form submission logic here
          alert('Thank you for subscribing!');
          this.reset();
        }
      });
    }

    // Mobile menu functionality
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            // Toggle classes for menu
            mainNav.classList.toggle('is-active');
            menuToggle.classList.toggle('is-active');
            document.body.classList.toggle('menu-open');
            
            // Update ARIA attributes
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            
            console.log('Menu toggled'); // Debug
        });
    } else {
        console.error('Menu elements not found'); // Debug
    }
});