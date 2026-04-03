--- shinok-barbearia-final/script.js (原始)


+++ shinok-barbearia-final/script.js (修改后)
// Mobile Menu Toggle
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');

if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileToggle.querySelector('i').classList.remove('fa-times');
            mobileToggle.querySelector('i').classList.add('fa-bars');
        });
    });
}

// Sticky Header
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// Scroll Reveal Animation
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);
// Trigger once on load
reveal();

// Service Drawer Logic
const drawer = document.getElementById('serviceDrawer');
const drawerTitle = document.getElementById('drawerTitle');
const drawerDesc = document.getElementById('drawerDesc');

function openDrawer(title, desc) {
    if (drawer && drawerTitle && drawerDesc) {
        drawerTitle.innerText = title;
        drawerDesc.innerText = desc;
        drawer.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling bg
    }
}

function closeDrawer() {
    if (drawer) {
        drawer.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Close drawer when clicking outside
if (drawer) {
    drawer.addEventListener('click', (e) => {
        if (e.target === drawer) {
            closeDrawer();
        }
    });
}