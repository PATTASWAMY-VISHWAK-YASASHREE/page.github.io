// Enhanced Mobile Navigation with Modern Features
document.addEventListener('DOMContentLoaded', function() {
    particlesJS.load('particles-js', 'particles.json', function() {
      console.log('callback - particles.js config loaded');
    });

    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;

    // Toggle mobile menu with enhanced animations
    navToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        const isActive = navMenu.classList.contains('active');
        
        if (!isActive) {
            navMenu.classList.add('active');
            navToggle.classList.add('active');
            body.style.overflow = 'hidden'; // Prevent scroll when menu is open
            
            // Add staggered animation to nav links
            navLinks.forEach((link, index) => {
                link.style.animationDelay = `${(index + 1) * 0.1}s`;
            });
        } else {
            closeMenu();
        }
    });

    // Close menu function
    function closeMenu() {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        body.style.overflow = '';
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            closeMenu();
        }
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });

    // Enhanced smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Add ripple effect on click
                createRipple(e, this);
            }
        });
    });

    // Create ripple effect for buttons
    function createRipple(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Active navigation highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
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

    // Initialize GitHub integration
    initializeGitHub();
});

// Enhanced GitHub API Integration with Loading States
async function initializeGitHub() {
    const username = 'PATTASWAMY-VISHWAK-YASASHREE';
    
    // Show loading states
    showGitHubLoading();
    
    try {
        // Add loading delay for better UX
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Fetch user profile with enhanced error handling
        await fetchGitHubProfile(username);
        
        // Fetch repositories with language filtering
        await fetchGitHubRepos(username);
        
        // Add success animation
        animateGitHubContent();
        
    } catch (error) {
        console.error('Error initializing GitHub data:', error);
        // Show fallback static data with animation
        showFallbackGitHubData();
    }
}

function showGitHubLoading() {
    const profileContainer = document.getElementById('github-profile');
    const reposContainer = document.getElementById('repos-grid');
    
    profileContainer.innerHTML = `
        <div class="github-loading">
            <div class="loading-spinner"></div>
            <p>Loading GitHub profile...</p>
        </div>
    `;
    
    reposContainer.innerHTML = `
        <div class="github-loading">
            <div class="loading-spinner"></div>
            <p>Loading repositories...</p>
        </div>
    `;
}

function animateGitHubContent() {
    const profileContainer = document.getElementById('github-profile');
    const reposContainer = document.getElementById('repos-grid');
    
    profileContainer.style.opacity = '0';
    reposContainer.style.opacity = '0';
    
    setTimeout(() => {
        profileContainer.style.transition = 'opacity 0.6s ease';
        reposContainer.style.transition = 'opacity 0.6s ease';
        profileContainer.style.opacity = '1';
        reposContainer.style.opacity = '1';
    }, 100);
}

async function fetchGitHubProfile(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const userData = await response.json();
        displayGitHubProfile(userData);
        
    } catch (error) {
        console.error('Error fetching GitHub profile:', error);
        throw error;
    }
}

async function fetchGitHubRepos(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const repos = await response.json();
        displayGitHubRepos(repos);
        
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        throw error;
    }
}

function displayGitHubProfile(userData) {
    const profileContainer = document.getElementById('github-profile');
    
    const profileHTML = `
        <div class="github-profile-info">
            <img src="${userData.avatar_url}" alt="${userData.name || userData.login}" class="github-avatar">
            <h3 class="github-name">${userData.name || userData.login}</h3>
            <p class="github-username">@${userData.login}</p>
            ${userData.bio ? `<p class="github-bio">${userData.bio}</p>` : ''}
            <div class="github-stats">
                <div class="github-stat">
                    <span class="github-stat-number">${userData.public_repos}</span>
                    <span class="github-stat-label">Repositories</span>
                </div>
                <div class="github-stat">
                    <span class="github-stat-number">${userData.followers}</span>
                    <span class="github-stat-label">Followers</span>
                </div>
                <div class="github-stat">
                    <span class="github-stat-number">${userData.following}</span>
                    <span class="github-stat-label">Following</span>
                </div>
            </div>
        </div>
    `;
    
    profileContainer.innerHTML = profileHTML;
}

function displayGitHubRepos(repos) {
    const reposContainer = document.getElementById('repos-grid');
    
    if (repos.length === 0) {
        reposContainer.innerHTML = '<p class="github-loading">No repositories found.</p>';
        return;
    }
    
    const reposHTML = repos.map(repo => {
        const language = repo.language ? `<span class="repo-language">${repo.language}</span>` : '';
        const description = repo.description ? `<p class="repo-description">${repo.description}</p>` : '';
        const stars = repo.stargazers_count > 0 ? `⭐ ${repo.stargazers_count}` : '';
        const forks = repo.forks_count > 0 ? `🍴 ${repo.forks_count}` : '';
        
        return `
            <a href="${repo.html_url}" target="_blank" class="repo-card">
                <div class="repo-header">
                    <h4 class="repo-name">${repo.name}</h4>
                    ${language}
                </div>
                ${description}
                <div class="repo-stats">
                    ${stars}
                    ${forks}
                    <span>Updated ${formatDate(repo.updated_at)}</span>
                </div>
            </a>
        `;
    }).join('');
    
    reposContainer.innerHTML = reposHTML;
}

function showFallbackGitHubData() {
    const profileContainer = document.getElementById('github-profile');
    const reposContainer = document.getElementById('repos-grid');
    
    // Fallback profile data
    const profileHTML = `
        <div class="github-profile-info">
            <img src="https://github.com/PATTASWAMY-VISHWAK-YASASHREE.png" alt="Vishwak Pattaswamy" class="github-avatar">
            <h3 class="github-name">Vishwak Pattaswamy</h3>
            <p class="github-username">@PATTASWAMY-VISHWAK-YASASHREE</p>
            <p class="github-bio">Software Developer • Building modern web applications</p>
            <div class="github-stats">
                <div class="github-stat">
                    <span class="github-stat-number">15+</span>
                    <span class="github-stat-label">Repositories</span>
                </div>
                <div class="github-stat">
                    <span class="github-stat-number">25+</span>
                    <span class="github-stat-label">Followers</span>
                </div>
                <div class="github-stat">
                    <span class="github-stat-number">30+</span>
                    <span class="github-stat-label">Following</span>
                </div>
            </div>
        </div>
    `;
    
    // Fallback repos data
    const reposHTML = `
        <a href="https://github.com/PATTASWAMY-VISHWAK-YASASHREE" target="_blank" class="repo-card">
            <div class="repo-header">
                <h4 class="repo-name">portfolio-website</h4>
                <span class="repo-language">HTML</span>
            </div>
            <p class="repo-description">Modern responsive portfolio website with GitHub integration</p>
            <div class="repo-stats">
                ⭐ 5
                🍴 2
                <span>Updated recently</span>
            </div>
        </a>
        <a href="https://github.com/PATTASWAMY-VISHWAK-YASASHREE" target="_blank" class="repo-card">
            <div class="repo-header">
                <h4 class="repo-name">web-application</h4>
                <span class="repo-language">JavaScript</span>
            </div>
            <p class="repo-description">Full-stack web application with modern frameworks</p>
            <div class="repo-stats">
                ⭐ 12
                🍴 4
                <span>Updated 2 days ago</span>
            </div>
        </a>
        <a href="https://github.com/PATTASWAMY-VISHWAK-YASASHREE" target="_blank" class="repo-card">
            <div class="repo-header">
                <h4 class="repo-name">data-analysis</h4>
                <span class="repo-language">Python</span>
            </div>
            <p class="repo-description">Data analysis and visualization project using Python</p>
            <div class="repo-stats">
                ⭐ 8
                🍴 3
                <span>Updated 1 week ago</span>
            </div>
        </a>
    `;
    
    profileContainer.innerHTML = profileHTML;
    reposContainer.innerHTML = reposHTML;
}

function showGitHubError() {
    const profileContainer = document.getElementById('github-profile');
    const reposContainer = document.getElementById('repos-grid');
    
    profileContainer.innerHTML = '<div class="github-loading">Unable to load GitHub profile. Please try again later.</div>';
    reposContainer.innerHTML = '<div class="github-loading">Unable to load repositories. Please try again later.</div>';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
        return '1 day ago';
    } else if (diffDays < 30) {
        return `${diffDays} days ago`;
    } else if (diffDays < 365) {
        const months = Math.floor(diffDays / 30);
        return months === 1 ? '1 month ago' : `${months} months ago`;
    } else {
        const years = Math.floor(diffDays / 365);
        return years === 1 ? '1 year ago' : `${years} years ago`;
    }
}

// Scroll animations
function animateOnScroll() {
    const animateElements = document.querySelectorAll('.project-card, .skill-category, .education-card, .contact-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(animateOnScroll, 100);
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = 'none';
    }
});

// Typing effect for hero section
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const heroRole = document.querySelector('.hero-role');
        if (heroRole) {
            const originalText = heroRole.textContent;
            typeWriter(heroRole, originalText, 100);
        }
    }, 1000);
});

// Smooth reveal for sections
function revealSections() {
    const sections = document.querySelectorAll('.section');
    
    const revealSection = function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    };
    
    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15,
    });
    
    sections.forEach(section => {
        section.classList.add('section-hidden');
        sectionObserver.observe(section);
    });
}

// Add CSS for section reveals
const style = document.createElement('style');
style.textContent = `
    .section-hidden {
        opacity: 0;
        transform: translateY(50px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .section.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .nav-link.active {
        color: #000000;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Initialize section reveals
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(revealSections, 500);
});

// Performance optimization: Lazy load GitHub data
let githubDataLoaded = false;

function loadGitHubDataOnScroll() {
    const githubSection = document.getElementById('github');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !githubDataLoaded) {
                githubDataLoaded = true;
                initializeGitHub();
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '100px'
    });
    
    observer.observe(githubSection);
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', function() {
    loadGitHubDataOnScroll();
});

// Enhanced typing animation for hero text with multiple effects
function initTypingAnimation() {
    const typingElements = document.querySelectorAll('.typing-text');
    
    typingElements.forEach((element, index) => {
        const text = element.textContent;
        element.textContent = '';
        element.style.opacity = '0';
        
        // Fade in the element first
        setTimeout(() => {
            element.style.transition = 'opacity 0.5s ease';
            element.style.opacity = '1';
        }, index * 500);
        
        // Use Typed.js if available, otherwise fallback to custom function
        if (typeof Typed !== 'undefined') {
            setTimeout(() => {
                new Typed(element, {
                    strings: [text],
                    typeSpeed: 75,
                    backSpeed: 30,
                    showCursor: true,
                    cursorChar: '|',
                    autoInsertCss: true,
                    onComplete: function() {
                        element.classList.add('typing-complete');
                        // Add rainbow animation after typing completes
                        setTimeout(() => {
                            element.classList.add('rainbow-text');
                        }, 1000);
                    }
                });
            }, (index * 500) + 800);
        } else {
            // Enhanced fallback typing animation
            setTimeout(() => {
                let i = 0;
                function type() {
                    if (i < text.length) {
                        element.textContent += text.charAt(i);
                        i++;
                        // Variable speed for more natural typing
                        const delay = Math.random() * 100 + 50;
                        setTimeout(type, delay);
                    } else {
                        element.classList.add('typing-complete');
                        setTimeout(() => {
                            element.classList.add('rainbow-text');
                        }, 1000);
                    }
                }
                type();
            }, (index * 500) + 800);
        }
    });
}

// Enhanced project card animations with hover effects
function initProjectAnimations() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        // Staggered animation delay
        card.style.animationDelay = `${index * 0.1}s`;
        
        // Add hover tilt effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'perspective(1000px) rotateY(5deg) rotateX(5deg) translateZ(10px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)';
        });
    });
}

// Animated skill progress bars
function animateSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-skill');
                
                // Add floating animation
                setTimeout(() => {
                    entry.target.style.animation = 'float 3s ease-in-out infinite';
                }, 500);
            }
        });
    }, { threshold: 0.5 });
    
    skillItems.forEach(skill => observer.observe(skill));
}

// Parallax scrolling effect for hero section
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        
        if (hero && heroContent) {
            heroContent.style.transform = `translateY(${parallax}px)`;
        }
    });
}

// Loading animation for GitHub data
function showLoadingAnimation(container) {
    container.innerHTML = `
        <div class="loading-animation">
            <div class="loading-dots">
                <div class="loading-dot"></div>
                <div class="loading-dot"></div>
                <div class="loading-dot"></div>
            </div>
            <p>Loading GitHub data...</p>
        </div>
    `;
}

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize typing animation after a delay
    setTimeout(initTypingAnimation, 1000);
    
    // Initialize project animations
    setTimeout(initProjectAnimations, 500);
    
    // Initialize skill animations
    setTimeout(animateSkillBars, 800);
    
    // Initialize parallax effect
    initParallaxEffect();
    
    // Initialize performance optimizations
    initPerformanceOptimizations();
    
    // Initialize scroll-based animations
    initScrollAnimations();
});

// Performance optimization functions
function initPerformanceOptimizations() {
    // Debounce scroll events for better performance
    let scrollTimer = null;
    const optimizedScroll = () => {
        if (scrollTimer !== null) {
            clearTimeout(scrollTimer);
        }
        scrollTimer = setTimeout(() => {
            handleScrollEffects();
        }, 16); // ~60fps
    };
    
    window.addEventListener('scroll', optimizedScroll, { passive: true });
    
    // Intersection Observer for lazy loading and animations
    if ('IntersectionObserver' in window) {
        initIntersectionObserver();
    }
    
    // Preload critical resources
    preloadCriticalResources();
}

function handleScrollEffects() {
    const scrolled = window.pageYOffset;
    
    // Update navigation background opacity based on scroll
    const nav = document.querySelector('nav');
    if (nav) {
        const opacity = Math.min(1, scrolled / 100);
        nav.style.background = `rgba(255, 255, 255, ${0.95 + (opacity * 0.05)})`;
    }
    
    // Parallax effects for performance-optimized elements
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(element => {
        if (isElementInViewport(element)) {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        }
    });
}

function initIntersectionObserver() {
    // Animate elements when they come into view
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .project-card, .skill-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

function preloadCriticalResources() {
    // Preload GitHub profile images and icons
    const criticalImages = [
        'assets/icons/javascript.svg',
        'assets/icons/python.svg',
        'assets/icons/react.svg'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Add custom CSS animations
const customStyles = document.createElement('style');
customStyles.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
    }
    
    .loading-animation {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 40px;
        color: #666;
    }
    
    .loading-dots {
        display: flex;
        gap: 8px;
        margin-bottom: 16px;
    }
    
    .loading-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #007bff;
        animation: pulse 1.5s ease-in-out infinite;
    }
    
    .loading-dot:nth-child(2) { animation-delay: 0.3s; }
    .loading-dot:nth-child(3) { animation-delay: 0.6s; }
    
    .animate-skill {
        animation: skillReveal 0.8s ease-out forwards;
    }
    
    @keyframes skillReveal {
        from {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    .typing-complete {
        border-right: 2px solid transparent;
        animation: blink 1s infinite;
    }
    
    @keyframes blink {
        0%, 50% { border-color: currentColor; }
        51%, 100% { border-color: transparent; }
    }
    
    .project-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        will-change: transform;
    }
    
    .hero-content {
        will-change: transform;
    }
`;
document.head.appendChild(customStyles);
