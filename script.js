// ===========================
// Mobile Navigation Toggle
// ===========================
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// ===========================
// Smooth Scrolling for Navigation Links
// ===========================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// Navbar Background on Scroll
// ===========================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ===========================
// Gallery Modal Functionality
// ===========================
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const modalClose = document.querySelector('.modal-close');
const galleryItems = document.querySelectorAll('.gallery-item');

// Open modal when clicking on gallery item
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const imgSrc = item.getAttribute('data-image');
        modal.style.display = 'block';
        modalImg.src = imgSrc;
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    });
});

// Close modal when clicking on close button
modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
});

// Close modal when clicking outside the image
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// ===========================
// Scroll Animation for Sections
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe all sections for scroll animations
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    section.classList.add('scroll-animate');
    observer.observe(section);
});

// Observe feature cards
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
    card.classList.add('scroll-animate');
    observer.observe(card);
});

// Observe gallery items
const galleryItemsForAnimation = document.querySelectorAll('.gallery-item');
galleryItemsForAnimation.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
    item.classList.add('scroll-animate');
    observer.observe(item);
});

// ===========================
// Active Navigation Link on Scroll
// ===========================
const updateActiveNavLink = () => {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active-link');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active-link');
                }
            });
        }
    });
};

window.addEventListener('scroll', updateActiveNavLink);

// ===========================
// Zen Circle Animation Enhancement
// ===========================
const zenCircle = document.querySelector('.zen-circle');

if (zenCircle) {
    let rotation = 0;
    
    const animateZenCircle = () => {
        rotation += 0.5;
        zenCircle.style.transform = `rotate(${rotation}deg)`;
        requestAnimationFrame(animateZenCircle);
    };
    
    // Start animation after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            animateZenCircle();
        }, 1000);
    });
}

// ===========================
// Lazy Loading Images
// ===========================
const images = document.querySelectorAll('img[loading="lazy"]');

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src; // Trigger loading
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
} else {
    // Fallback for browsers that don't support IntersectionObserver
    images.forEach(img => {
        img.src = img.src;
    });
}

// ===========================
// Parallax Effect for Hero Section
// ===========================
const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;
    
    if (hero && scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
});

// ===========================
// Add smooth reveal animation to elements
// ===========================
const revealElements = () => {
    const reveals = document.querySelectorAll('.scroll-animate');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealElements);

// Initial check on page load
window.addEventListener('load', () => {
    revealElements();
    updateActiveNavLink();
});

// ===========================
// Console Welcome Message
// ===========================
console.log('%c🙏 Welcome to Divine Doors Nepal 🙏', 'color: #8B4513; font-size: 20px; font-weight: bold;');
console.log('%cA Door To Divine - Meditation Retreat in Ilam, Nepal', 'color: #D4AF37; font-size: 14px;');
console.log('%cFounded in 2013 by Swami Prem Bikash', 'color: #2C5F2D; font-size: 12px;');
