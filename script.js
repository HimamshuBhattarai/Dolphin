/* ================================================
   DOLPHIN ENGLISH SECONDARY SCHOOL - SCRIPTS
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---------- Mobile Navigation Toggle ----------
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            mobileToggle.classList.toggle('active');
        });
    }

    // Close mobile nav on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            mobileToggle.classList.remove('active');
        });
    });

    // ---------- Sticky Nav Scroll Effect ----------
    const mainNav = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            mainNav.classList.add('scrolled');
        } else {
            mainNav.classList.remove('scrolled');
        }
    });

    // ---------- Active Nav Link on Scroll ----------
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-links a');

    function setActiveNav() {
        const scrollY = window.scrollY + 120;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollY >= top && scrollY < top + height) {
                navLinksAll.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', setActiveNav);

    // ---------- Back to Top Button ----------
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ---------- Scroll Animations ----------
    const observerOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add animation classes
    const animateElements = document.querySelectorAll(
        '.about-text, .register-card, .why-item, .sports-top, .sports-desc, ' +
        '.news-col, .stat-item, .gallery-item, .contact-info, .contact-form-wrap'
    );

    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // ---------- Counter Animation ----------
    const statNumbers = document.querySelectorAll('.stat-number');
    let counterStarted = false;

    function animateCounters() {
        statNumbers.forEach(num => {
            const target = parseInt(num.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const update = () => {
                current += step;
                if (current < target) {
                    num.textContent = Math.floor(current);
                    requestAnimationFrame(update);
                } else {
                    num.textContent = target;
                }
            };
            update();
        });
    }

    const statsSection = document.getElementById('stats-section');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counterStarted) {
                counterStarted = true;
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // ---------- Smooth Scroll for Anchor Links ----------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                const navHeight = mainNav.offsetHeight;
                const top = targetEl.offsetTop - navHeight;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ---------- Registration Form Handler ----------
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = registerForm.querySelector('.btn-submit');
            btn.textContent = 'SUBMITTED ✓';
            btn.style.background = '#00c9a7';
            setTimeout(() => {
                btn.textContent = 'SUBMIT REQUEST';
                btn.style.background = '';
                registerForm.reset();
            }, 2500);
        });
    }

    // ---------- Contact Form Handler ----------
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.btn-accent');
            btn.textContent = 'MESSAGE SENT ✓';
            btn.style.background = '#00c9a7';
            setTimeout(() => {
                btn.textContent = 'SEND MESSAGE';
                btn.style.background = '';
                contactForm.reset();
            }, 2500);
        });
    }

    // ---------- Parallax on Hero ----------
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero-slide');
        if (hero) {
            const scrolled = window.scrollY;
            hero.style.backgroundPositionY = scrolled * 0.4 + 'px';
        }
    });

    // ---------- Staggered animation delays ----------
    document.querySelectorAll('.why-item').forEach((item, i) => {
        item.style.transitionDelay = (i * 0.1) + 's';
    });

    document.querySelectorAll('.gallery-item').forEach((item, i) => {
        item.style.transitionDelay = (i * 0.08) + 's';
    });

    document.querySelectorAll('.stat-item').forEach((item, i) => {
        item.style.transitionDelay = (i * 0.12) + 's';
    });

    document.querySelectorAll('.news-col').forEach((item, i) => {
        item.style.transitionDelay = (i * 0.15) + 's';
    });

});
