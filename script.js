document.addEventListener("DOMContentLoaded", () => {
    // Analytics tracking helper
    const trackEvent = (eventName, eventParams) => {
        if (typeof gtag === 'function') {
            gtag('event', eventName, eventParams);
        }
    };

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

    // Mobile Hamburger Menu
    const hamburger = document.getElementById('hamburger');
    const navLinksMenu = document.getElementById('nav-links');
    
    if (hamburger && navLinksMenu) {
        hamburger.addEventListener('click', () => {
            navLinksMenu.classList.toggle('active');
            hamburger.classList.remove('pulse-attention'); // Stop pulsing once discovered
        });

        // Close menu when clicking a link
        const navItems = navLinksMenu.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinksMenu.classList.remove('active');
            });
        });
    }

    // Language toggle logic
    const langToggleBtn = document.getElementById('langToggle');
    const htmlTag = document.documentElement;
    
    langToggleBtn.addEventListener('click', () => {
        let newLang = 'es';
        if (htmlTag.classList.contains('es')) {
            htmlTag.classList.remove('es');
            htmlTag.classList.add('en');
            htmlTag.setAttribute('lang', 'en');
            newLang = 'en';
        } else {
            htmlTag.classList.remove('en');
            htmlTag.classList.add('es');
            htmlTag.setAttribute('lang', 'es');
        }
        trackEvent('toggle_language', { 'language': newLang });
    });

    // --- Custom Analytics Events ---
    
    // CV Downloads
    const cvDownloadES = document.getElementById('cvDownloadES');
    if (cvDownloadES) {
        cvDownloadES.addEventListener('click', () => trackEvent('download_cv', { 'lang': 'es' }));
    }
    const cvDownloadEN = document.getElementById('cvDownloadEN');
    if (cvDownloadEN) {
        cvDownloadEN.addEventListener('click', () => trackEvent('download_cv', { 'lang': 'en' }));
    }

    // Github Projects
    const repoLinks = document.querySelectorAll('.project-card .repo-link');
    repoLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const projectCard = e.target.closest('.project-card');
            if (projectCard) {
                const projectTitle = projectCard.querySelector('h3').innerText;
                trackEvent('click_github_project', { 'project_name': projectTitle });
            }
        });
    });

    // Power BI Dashboards
    const dashboardLinks = document.querySelectorAll('.dashboard-card .btn-outline');
    dashboardLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const dashboardCard = e.target.closest('.dashboard-card');
            if (dashboardCard) {
                const dashboardTitle = dashboardCard.querySelector('h3').innerText;
                trackEvent('view_powerbi_dashboard', { 'dashboard_name': dashboardTitle });
            }
        });
    });

    // Contact Links
    const contactLinks = document.querySelectorAll('.contact-links .social-link');
    contactLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const contactMethod = link.innerText.trim();
            trackEvent('click_contact', { 'method': contactMethod });
        });
    });
});
