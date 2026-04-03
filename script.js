document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const header = document.querySelector('.header');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    const drawerOverlay = document.getElementById('drawer-overlay');
    const serviceDrawer = document.getElementById('service-drawer');
    const drawerClose = document.querySelector('.drawer-close');
    const drawerTitle = document.getElementById('drawer-title');
    const drawerTime = document.getElementById('drawer-time');
    const drawerPrice = document.getElementById('drawer-price');
    const drawerDesc = document.getElementById('drawer-desc');
    const drawerWa = document.getElementById('drawer-whatsapp');

    // 1. Header Scroll Effect (Optimized with requestAnimationFrame)
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // 2. Mobile Menu Toggle with Scroll Lock
    function toggleMenu(open = true) {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        if (open === !isExpanded) return; // prevent redundant calls
        
        hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
        hamburger.classList.toggle('active', open);
        navMenu.classList.toggle('active', open);
        navMenu.setAttribute('aria-hidden', open ? 'false' : 'true');
        body.classList.toggle('menu-lock', open);
    }

    hamburger.addEventListener('click', () => toggleMenu(!navMenu.classList.contains('active')));
    document.querySelectorAll('.nav-menu a').forEach(link => link.addEventListener('click', () => toggleMenu(false)));
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
            toggleMenu(false);
        }
    });

    // 3. Smooth Scroll with Offset & Accessibility Focus
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
                
                // Set focus for accessibility
                target.setAttribute('tabindex', '-1');
                target.focus({ preventScroll: true });
            }
        });
    });

    // 4. Scroll Reveal via IntersectionObserver
    const reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
        reveals.forEach(el => observer.observe(el));
    } else {
        reveals.forEach(el => el.classList.add('visible'));
    }

    // 5. Service Drawer Logic
    const serviceCards = document.querySelectorAll('.servico-card');
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const { name, time, price, desc } = card.dataset;
            drawerTitle.textContent = name;
            drawerTime.textContent = `⏱️ ${time}`;
            drawerPrice.textContent = `💰 ${price}`;
            drawerDesc.textContent = desc;

            // Pre-fill WhatsApp message
            const waMsg = encodeURIComponent(`Olá! Gostaria de agendar o serviço: ${name} (${price}).`);
            drawerWa.href = `https://wa.me/5531973113975?text=${waMsg}`;

            // Open drawer
            drawerOverlay.classList.add('active');
            drawerOverlay.setAttribute('aria-hidden', 'false');
            serviceDrawer.classList.add('open');
            serviceDrawer.setAttribute('aria-hidden', 'false');
            body.style.overflow = 'hidden';
            drawerClose.focus();
        });
    });

    function closeDrawer() {
        drawerOverlay.classList.remove('active');
        drawerOverlay.setAttribute('aria-hidden', 'true');
        serviceDrawer.classList.remove('open');
        serviceDrawer.setAttribute('aria-hidden', 'true');
        if (!navMenu.classList.contains('active')) body.style.overflow = '';
    }

    drawerClose.addEventListener('click', closeDrawer);
    drawerOverlay.addEventListener('click', closeDrawer);

    // Swipe down to close on mobile
    let touchStartY = 0;
    serviceDrawer.addEventListener('touchstart', (e) => { touchStartY = e.touches[0].clientY; }, { passive: true });
    serviceDrawer.addEventListener('touchmove', (e) => {
        const diff = e.touches[0].clientY - touchStartY;
        if (diff > 50 && serviceDrawer.scrollTop <= 0) closeDrawer();
    }, { passive: true });

    // Close modals/menus on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (serviceDrawer.classList.contains('open')) closeDrawer();
            else if (navMenu.classList.contains('active')) toggleMenu(false);
        }
    });

    // 6. Lazy Load Images (Ready for future use)
    const lazyImages = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window && lazyImages.length > 0) {
        const imgObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imgObserver.unobserve(img);
                }
            });
        });
        lazyImages.forEach(img => imgObserver.observe(img));
    }

    console.log('Shinok Barbearia - Site carregado com sucesso!');
});