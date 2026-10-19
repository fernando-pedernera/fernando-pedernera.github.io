document.addEventListener("DOMContentLoaded", () => {
    // Analytics tracking helper (respetando exclusión de tráfico propio y bots)
    const trackEvent = (eventName, eventParams) => {
        if (typeof gtag === 'function' && !window.isAnalyticsDisabled && localStorage.getItem('fp_analytics_disabled') !== 'true') {
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
    
    // CV Downloads (Enriquecido con ID de seguimiento de Recruiter si proviene del CRM)
    const cvDownloadES = document.getElementById('cvDownloadES');
    if (cvDownloadES) {
        cvDownloadES.addEventListener('click', () => {
            const tid = sessionStorage.getItem('cmr_tid');
            trackEvent('download_cv', { 'lang': 'es', ...(tid ? { 'tracking_id': tid, 'source': 'recruiter_crm' } : {}) });
        });
    }
    const cvDownloadEN = document.getElementById('cvDownloadEN');
    if (cvDownloadEN) {
        cvDownloadEN.addEventListener('click', () => {
            const tid = sessionStorage.getItem('cmr_tid');
            trackEvent('download_cv', { 'lang': 'en', ...(tid ? { 'tracking_id': tid, 'source': 'recruiter_crm' } : {}) });
        });
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

    // Go! Science & Technology Magazine Link
    const navMagazines = [document.getElementById('navMagazineES'), document.getElementById('navMagazineEN')];
    navMagazines.forEach(link => {
        if (link) {
            link.addEventListener('click', () => {
                trackEvent('view_magazine', { 'magazine_name': 'Go! Science & Technology' });
            });
        }
    });

    // --- Admin Notification Feedback Toast ---
    const showAdminToast = (enabled) => {
        const toast = document.createElement('div');
        toast.className = 'admin-toast';
        const isEs = document.documentElement.classList.contains('es');
        if (enabled) {
            toast.innerHTML = `<i class="fa-solid fa-shield-halved" style="color: var(--accent-color); font-size: 1.2rem;"></i> <span><strong>${isEs ? 'Modo Admin Activado' : 'Admin Mode Enabled'}:</strong> ${isEs ? 'Tus visitas no se registrarán en Google Analytics.' : 'Your visits are excluded from Google Analytics.'}</span>`;
        } else {
            toast.innerHTML = `<i class="fa-solid fa-chart-line" style="color: var(--primary-hover); font-size: 1.2rem;"></i> <span><strong>${isEs ? 'Modo Admin Desactivado' : 'Admin Mode Disabled'}:</strong> ${isEs ? 'Tus visitas vuelven a registrarse en GA4.' : 'Your visits will be tracked in GA4.'}</span>`;
        }
        const welcomeToastEl = document.getElementById('welcomeToast');
        if (welcomeToastEl && !welcomeToastEl.classList.contains('hide')) {
            toast.style.bottom = '98px';
        }
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(15px)';
            setTimeout(() => toast.remove(), 500);
        }, 5000);
    };

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true' || urlParams.get('internal') === 'true') {
        showAdminToast(true);
    } else if (urlParams.get('admin') === 'false' || urlParams.get('internal') === 'false') {
        showAdminToast(false);
    }

    // --- Copy Email Button Functionality ---
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', async () => {
            const email = 'fernando.peder.ia@gmail.com';
            const copyIcon = document.getElementById('copyIcon');
            const copyFeedback = document.getElementById('copyFeedback');

            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(email);
                } else {
                    const textArea = document.createElement("textarea");
                    textArea.value = email;
                    textArea.style.position = "fixed";
                    textArea.style.left = "-999999px";
                    document.body.appendChild(textArea);
                    textArea.focus();
                    textArea.select();
                    document.execCommand('copy');
                    textArea.remove();
                }

                // UI Success feedback
                copyEmailBtn.classList.add('copied');
                if (copyIcon) {
                    copyIcon.className = 'fa-solid fa-check';
                }
                if (copyFeedback) {
                    copyFeedback.innerHTML = `<span class="es">¡Copiado!</span><span class="en">Copied!</span>`;
                }

                trackEvent('click_contact', { 'method': 'copy_email' });

                // Revert after 2.5 seconds
                setTimeout(() => {
                    copyEmailBtn.classList.remove('copied');
                    if (copyIcon) {
                        copyIcon.className = 'fa-regular fa-copy';
                    }
                    if (copyFeedback) {
                        copyFeedback.innerHTML = `<span class="es">Copiar</span><span class="en">Copy</span>`;
                    }
                }, 2500);

            } catch (err) {
                console.error('Error al copiar correo:', err);
            }
        });
    }

    // --- Contact Links Tracking (LinkedIn & Direct Email) ---
    const contactLinks = document.querySelectorAll('.contact-card .social-link, .contact-actions .social-link, .contact-links .social-link');
    contactLinks.forEach(link => {
        link.addEventListener('click', () => {
            let method = 'other';
            if (link.classList.contains('linkedin-link') || link.href.includes('linkedin')) {
                method = 'linkedin';
            } else if (link.classList.contains('email-link') || link.href.startsWith('mailto:')) {
                method = 'email_client';
            } else {
                method = link.innerText.trim();
            }
            trackEvent('click_contact', { 'method': method });
        });
    });

    // --- Welcome Toast (5s Countdown + Pause on Hover + Close Button) ---
    const welcomeToast = document.getElementById('welcomeToast');
    if (welcomeToast) {
        const welcomeTimer = document.getElementById('welcomeTimer');
        const welcomeProgressBar = document.getElementById('welcomeProgressBar');
        const welcomeCloseBtn = document.getElementById('welcomeCloseBtn');

        const totalDuration = 5000; // 5 segundos solicitados
        let remainingTime = totalDuration;
        let isPaused = false;
        let closed = false;

        const closeToast = () => {
            if (closed) return;
            closed = true;
            welcomeToast.classList.remove('show');
            welcomeToast.classList.add('hide');
            setTimeout(() => {
                welcomeToast.remove();
            }, 450);
        };

        if (welcomeCloseBtn) {
            welcomeCloseBtn.addEventListener('click', closeToast);
        }

        // Pausar cuenta regresiva si el usuario pasa el mouse por encima para leer
        welcomeToast.addEventListener('mouseenter', () => {
            isPaused = true;
        });

        welcomeToast.addEventListener('mouseleave', () => {
            isPaused = false;
        });

        // Entrada suave a los 600ms tras la carga de la página
        setTimeout(() => {
            welcomeToast.classList.add('show');

            const step = 50;
            const timerInterval = setInterval(() => {
                if (closed) {
                    clearInterval(timerInterval);
                    return;
                }

                if (!isPaused) {
                    remainingTime -= step;
                    if (remainingTime < 0) remainingTime = 0;

                    // Actualizar barra de progreso
                    if (welcomeProgressBar) {
                        const percent = (remainingTime / totalDuration) * 100;
                        welcomeProgressBar.style.width = percent + '%';
                    }

                    // Actualizar contador numérico
                    if (welcomeTimer) {
                        const seconds = Math.ceil(remainingTime / 1000);
                        welcomeTimer.textContent = seconds + 's';
                    }

                    if (remainingTime <= 0) {
                        clearInterval(timerInterval);
                        closeToast();
                    }
                }
            }, step);
        }, 600);
    }
});
