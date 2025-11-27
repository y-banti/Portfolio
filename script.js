// Global variables
let currentTheme = 'light';
let isLoading = true;

const DEBUG = false;

const CLEAR_CACHE_ON_LOAD = false;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', async function() {
    if (CLEAR_CACHE_ON_LOAD && 'serviceWorker' in navigator && 'caches' in window) {
        try {
            // Unregister any active service workers
            const regs = await navigator.serviceWorker.getRegistrations();
            await Promise.all(regs.map(r => r.unregister()).map(p => p.catch(() => {})));

            // Delete all caches
            const keys = await caches.keys();
            await Promise.all(keys.map(k => caches.delete(k)).map(p => p.catch(() => {})));

            if (DEBUG) console.log('Cleared service workers and caches (CLEAR_CACHE_ON_LOAD=true)');
        } catch (err) {
            if (DEBUG) console.warn('Failed to clear caches/service workers:', err);
        }
    }

    initializePortfolio();
});

// Initialize Portfolio
function initializePortfolio() {
    setupNavigation();
    setupThemeToggle();
    setupTypingEffect();
    setupScrollAnimations();
    setupParticles();
    setupCustomCursor();
    setupSkillProgressBars();
    setupContactForm();
    setupSmoothScrolling();
    setupOrbitAnimation();
    setupFloatingCard();
    setupMobileMenu();
    setupHamburgerMenu();
    setupProfileImage();
    
    // No blocking loading screen — mark app ready and trigger initial animations
    isLoading = false;
    animateOnScroll();

    // Set dynamic footer year
    const footerYearEl = document.getElementById('footer-year');
    if (footerYearEl) footerYearEl.textContent = new Date().getFullYear();
}

// Navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // Active link highlighting
    window.addEventListener('scroll', () => {
        if (isLoading) return;
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Nav background on scroll
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.nav');
        if (window.scrollY > 50) {
            nav.style.background = currentTheme === 'light' 
                ? 'rgba(255, 255, 255, 0.98)' 
                : 'rgba(17, 24, 39, 0.98)';
        } else {
            nav.style.background = currentTheme === 'light' 
                ? 'rgba(255, 255, 255, 0.95)' 
                : 'rgba(17, 24, 39, 0.95)';
        }
    });
}

// Theme Toggle
function setupThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
    
    function setTheme(theme) {
        currentTheme = theme;
        document.body.setAttribute('data-theme', theme);
        
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-moon';
        } else {
            themeIcon.className = 'fas fa-sun';
        }
    }
}

// Typing Effect
function setupTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    const texts = [        
        'Creative Problem Solver',
        'Tech Enthusiast'
        
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeText() {
        if (isLoading) return;
        
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typingSpeed = isDeleting ? 10 : 200;
        
        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = 1000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }
        
        setTimeout(typeText, typingSpeed);
    }
    
    // Start typing effect after loading
    setTimeout(() => {
        typeText();
    }, 2500);
}

// Scroll Animations
function setupScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animatedElements = document.querySelectorAll('.skill-card, .project-card, .contact-item, .stat-item');
    animatedElements.forEach(el => observer.observe(el));
}

function animateOnScroll() {
    const elements = document.querySelectorAll('.skill-card, .project-card, .contact-item, .stat-item');
    
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Particles Background
function setupParticles() {
    // Skip initializing on small screens (mobile/tablet) to save CPU and bandwidth
    if (window.matchMedia && window.matchMedia('(max-width: 768px)').matches) {
        if (DEBUG) console.log('Skipping particles initialization on small screens');
        const el = document.getElementById('particles-js');
        if (el) el.style.display = 'none';
        return;
    }

    // Initialize particles; if the library isn't loaded yet, load it dynamically and retry.
    const CDN = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';

    function initParticles() {
        try {
            console.log('[particles] setupParticles: running initParticles');
            var el = document.getElementById('particles-js');
            if (el) el.style.display = '';

            if (typeof particlesJS === 'undefined') throw new Error('particlesJS undefined');

            // Plexus / connecting-dots configuration (stronger visibility)
            console.log('[particles] particlesJS found — initializing');
            particlesJS('particles-js', {
                particles: {
                    number: { value: 90, density: { enable: true, value_area: 900 } },
                    color: { value: '#8b5cf6' },
                    shape: { type: 'circle' },
                    opacity: { value: 0.45, random: false },
                    size: { value: 2.5, random: true },
                    line_linked: {
                        enable: true,
                        distance: 200,
                        color: '#8b5cf6',
                        opacity: 0.42,
                        width: 1.2
                    },
                    move: {
                        enable: true,
                        speed: 0.7,
                        direction: 'none',
                        random: true,
                        straight: false,
                        out_mode: 'out',
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: { enable: true, mode: 'grab' },
                        onclick: { enable: false },
                        resize: true
                    },
                    modes: {
                        grab: { distance: 220, line_linked: { opacity: 0.6 } },
                        bubble: { distance: 200, size: 0, duration: 0.3, opacity: 0 },
                        repulse: { distance: 0, duration: 0 },
                        push: { particles_nb: 0 },
                        remove: { particles_nb: 0 }
                    }
                },
                retina_detect: true
            });
            // Make sure the canvas is visible (adjusted after init)
            try {
                const canvas = document.querySelector('#particles-js canvas');
                if (canvas) {
                    canvas.style.opacity = '1';
                    canvas.style.filter = 'none';
                }
            } catch (e) {}

            console.log('[particles] initialization complete');
        } catch (err) {
            console.warn('[particles] particlesJS not available yet, attempting dynamic load', err);
            // Load script dynamically and retry once
            const existing = document.querySelector('script[data-particles-loader]');
            if (existing) return; // already loading
            const s = document.createElement('script');
            s.src = CDN;
            s.async = true;
            s.setAttribute('data-particles-loader', '1');
            s.onload = () => {
                try { initParticles(); } catch (e) { if (DEBUG) console.warn(e); }
            };
            s.onerror = () => { if (DEBUG) console.warn('Failed to load particles.js from CDN'); };
            document.head.appendChild(s);
        }
    }

    initParticles();
}

// Custom Cursor
function setupCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        // Cursor movement
        cursorX += (mouseX - cursorX) * 0.3;
        cursorY += (mouseY - cursorY) * 0.3;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        // Follower movement
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .nav-link, .project-card, .skill-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursorFollower.style.transform = 'scale(1.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
        });
    });
}

// Skill Progress Bars
function setupSkillProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const percent = progressBar.getAttribute('data-percent');
                progressBar.style.width = percent + '%';
            }
        });
    });
    
    progressBars.forEach(bar => progressObserver.observe(bar));
}

// Contact Form
function setupContactForm() {
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    
    // No client-side email provider initialization — contact form posts to serverless endpoint
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Validation
        if (!name || !email || !subject || !message) {
            showMessage(errorMessage, 'Please fill in all fields.');
            return;
        }
        // Basic email format check
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showMessage(errorMessage, 'Please enter a valid email address.');
            return;
        }
        
        // Get submit button
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Prepare template parameters
        const templateParams = {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message
        };
        
        // Send form to serverless endpoint which will deliver the email (Vercel function)
        fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(templateParams)
        })
        .then(async (res) => {
            if (!res.ok) throw new Error('Network response was not ok');
            showMessage(successMessage, 'Thank you! Your message has been sent successfully.');
            form.reset();
        })
        .catch((err) => {
            if (DEBUG) console.error('Contact send failed', err);
            showMessage(errorMessage, 'Oops! Something went wrong. Please try again later.');
        })
        .finally(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    });
    
    // Helper function to show messages
    function showMessage(messageElement, text) {
        messageElement.textContent = text;
        messageElement.style.display = 'block';
        
        setTimeout(() => {
            messageElement.style.display = 'none';
        }, 5000);
    }
}

// Smooth Scrolling
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    
    [...navLinks, ...heroButtons].forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    // Close mobile menu if open
                    const navMenu = document.querySelector('.nav-menu');
                    const hamburger = document.querySelector('.hamburger-menu');
                    if (navMenu && navMenu.classList.contains('mobile-active')) {
                        navMenu.classList.remove('mobile-active');
                        if (hamburger) hamburger.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                }
            }
        });
    });

    // Make logo (nav-logo) behave like a nav-link: smooth scroll + close mobile menu
    const navLogo = document.querySelector('.nav-logo');
    if (navLogo) {
        navLogo.addEventListener('click', (e) => {
            // If it is an anchor with href, default handler will manage smooth scrolling
            // Ensure mobile menu closes
            const navMenu = document.querySelector('.nav-menu');
            const hamburger = document.querySelector('.hamburger-menu');
            if (navMenu && navMenu.classList.contains('mobile-active')) {
                navMenu.classList.remove('mobile-active');
                if (hamburger) hamburger.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Orbit Animation
function setupOrbitAnimation() {
    const orbitItems = document.querySelectorAll('.orbit-item');
    
    orbitItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            const skill = item.getAttribute('data-skill');
            
            // Create tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'orbit-tooltip';
            tooltip.textContent = skill;
            tooltip.style.cssText = `
                position: absolute;
                background: var(--text-primary);
                color: var(--background-primary);
                padding: 0.5rem 1rem;
                border-radius: 5px;
                font-size: 0.8rem;
                font-weight: 500;
                z-index: 1000;
                pointer-events: none;
                transform: translateY(-100%);
                margin-top: -10px;
                left: 50%;
                transform: translateX(-50%) translateY(-100%);
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            item.appendChild(tooltip);
            setTimeout(() => tooltip.style.opacity = '1', 10);
        });
        
        item.addEventListener('mouseleave', () => {
            const tooltip = item.querySelector('.orbit-tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
}

// Floating Card Animation
function setupFloatingCard() {
    const floatingCard = document.querySelector('.floating-card');
    
    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 768) {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            const x = (clientX / innerWidth) * 10;
            const y = (clientY / innerHeight) * 10;
            
            floatingCard.style.transform = `translate(${x}px, ${y}px)`;
        }
    });
}

// Mobile Menu (for responsive design)
function setupMobileMenu() {
    // Mobile menu functionality is handled by hamburger menu
    const navLinks = document.querySelectorAll('.nav-link');
    const navMenu = document.querySelector('.nav-menu');
    
    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('mobile-active');
            document.querySelector('.hamburger-menu').classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-container') && navMenu.classList.contains('mobile-active')) {
            navMenu.classList.remove('mobile-active');
            document.querySelector('.hamburger-menu').classList.remove('active');
        }
    });
}

// Hamburger Menu Toggle
function setupHamburgerMenu() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', () => {
            hamburgerMenu.classList.toggle('active');
            navMenu.classList.toggle('mobile-active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('mobile-active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance optimizations
const debouncedScroll = debounce(() => {
    // Scroll-related optimizations
}, 10);

const throttledResize = throttle(() => {
    // Resize-related optimizations
}, 100);

window.addEventListener('scroll', debouncedScroll);
window.addEventListener('resize', throttledResize);

// Easter eggs and fun interactions
function setupEasterEggs() {
    // Konami code
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                // Trigger easter egg
                triggerEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    function triggerEasterEgg() {
        // Add rainbow effect
        document.body.style.filter = 'hue-rotate(0deg)';
        let hue = 0;
        const rainbowInterval = setInterval(() => {
            hue += 10;
            document.body.style.filter = `hue-rotate(${hue}deg)`;
            if (hue >= 360) {
                clearInterval(rainbowInterval);
                document.body.style.filter = '';
            }
        }, 50);
    }
}

// Initialize easter eggs
setupEasterEggs();

// Analytics and tracking (placeholder)
function trackEvent(eventName, properties = {}) {
    // Implement your analytics tracking here
    if (DEBUG) console.log(`Event: ${eventName}`, properties);
}

// Track user interactions
document.addEventListener('click', (e) => {
    if (e.target.matches('.btn, .nav-link, .project-card')) {
        trackEvent('click', {
            element: e.target.className,
            text: e.target.textContent
        });
    }
});

// Accessibility improvements
function setupAccessibility() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    // keep skip link target aligned with the hero section's existing id (#home)
    skipLink.href = '#home';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main landmark
    const heroSection = document.querySelector('.hero');
    // Do not change the hero section's id (preserve existing anchors like #home)
    if (heroSection) {
        heroSection.setAttribute('role', 'main');
    }
}

// Setup accessibility features
setupAccessibility();

// Service worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
        // If we're actively clearing caches on every load, skip registering the SW
        if (typeof CLEAR_CACHE_ON_LOAD !== 'undefined' && CLEAR_CACHE_ON_LOAD) {
            if (DEBUG) console.log('CLEAR_CACHE_ON_LOAD is true — skipping service worker registration.');
            return;
        }

        try {
            // Check if service worker file exists before attempting registration
            const resp = await fetch('/sw.js', { method: 'HEAD' });
            if (resp.ok) {
                const registration = await navigator.serviceWorker.register('/sw.js');
                if (DEBUG) console.log('SW registered: ', registration);
            } else {
                if (DEBUG) console.warn('Service worker file not found (skipping registration).');
            }
        } catch (err) {
            if (DEBUG) console.warn('Service worker registration skipped or failed:', err);
        }
    });
}

// Profile Image Setup
function setupProfileImage() {
    const profilePhoto = document.querySelector('.profile-photo');
    const imageFallback = document.querySelector('.image-fallback');
    
    if (profilePhoto) {
        // Show fallback initially
        if (imageFallback) {
            imageFallback.style.display = 'block';
        }
        
        // Handle image load
        profilePhoto.addEventListener('load', () => {
            if (imageFallback) {
                imageFallback.style.display = 'none';
            }
            profilePhoto.style.display = 'block';
        });
        
        // Handle image error
        profilePhoto.addEventListener('error', () => {
            if (imageFallback) {
                imageFallback.style.display = 'block';
            }
            profilePhoto.style.display = 'none';
        });
        
        // Check if image is already loaded
        if (profilePhoto.complete && profilePhoto.naturalWidth > 0) {
            if (imageFallback) {
                imageFallback.style.display = 'none';
            }
            profilePhoto.style.display = 'block';
        }
    }
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        setupNavigation,
        setupThemeToggle,
        setupTypingEffect,
        setupProfileImage,
        debounce,
        throttle
    };
}
