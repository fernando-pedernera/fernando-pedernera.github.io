document.addEventListener("DOMContentLoaded", () => {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible if you only want the animation once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all elements with the fade-in class
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Add sequential delay to cards in grids for a staggered effect
    const grids = document.querySelectorAll('.grid');
    grids.forEach(grid => {
        const cards = grid.querySelectorAll('.card.fade-in');
        cards.forEach((card, index) => {
            // Apply a small transition delay based on index
            card.style.transitionDelay = `${index * 100}ms`;
        });
    });

    // Start observing all fade elements
    fadeElements.forEach(el => observer.observe(el));
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(13, 17, 23, 0.9)';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
        } else {
            navbar.style.background = 'rgba(13, 17, 23, 0.7)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Language toggle logic
    const langToggleBtn = document.getElementById('langToggle');
    const htmlTag = document.documentElement;
    
    langToggleBtn.addEventListener('click', () => {
        if (htmlTag.classList.contains('es')) {
            htmlTag.classList.remove('es');
            htmlTag.classList.add('en');
            htmlTag.setAttribute('lang', 'en');
        } else {
            htmlTag.classList.remove('en');
            htmlTag.classList.add('es');
            htmlTag.setAttribute('lang', 'es');
        }
    });
});
