// Global variables
let currentTheme = 'light';
let isLoading = true;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

// Initialize Portfolio
function initializePortfolio() {
    setupLoadingScreen();
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
    
    // Hide loading screen after initialization
    setTimeout(() => {
        hideLoadingScreen();
    }, 2000);
}

// Loading Screen
function setupLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Animate loading bar
    const loadingBar = document.querySelector('.loader-bar');
    loadingBar.style.setProperty('--progress', '0%');
    
    // Simulate loading progress
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
        }
        loadingBar.style.setProperty('--progress', `${progress}%`);
    }, 100);
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.classList.add('hidden');
    isLoading = false;
    
    // Start other animations
    animateOnScroll();
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
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#6366f1' },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: false },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#6366f1',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 6,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'repulse' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                },
                modes: {
                    grab: { distance: 400, line_linked: { opacity: 1 } },
                    bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
                    repulse: { distance: 200, duration: 0.4 },
                    push: { particles_nb: 4 },
                    remove: { particles_nb: 2 }
                }
            },
            retina_detect: true
        });
    }
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
    
    // Initialize EmailJS
    emailjs.init('ABAy7mSfK2X0bI9fM');
    
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
        
        // Send email using EmailJS
        emailjs.send('service_f3j0e2a', 'template_w8e53iq', templateParams)
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                showMessage(successMessage, 'Thank you! Your message has been sent successfully.');
                form.reset();
            })
            .catch((error) => {
                console.error('FAILED...', error);
                showMessage(errorMessage, 'Oops! Something went wrong. Please try again.');
            })
            .finally(() => {
                // Reset button
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
                }
            }
        });
    });
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
    console.log(`Event: ${eventName}`, properties);
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
    skipLink.href = '#main';
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
    heroSection.id = 'main';
    heroSection.setAttribute('role', 'main');
}

// Setup accessibility features
setupAccessibility();

// Service worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
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
