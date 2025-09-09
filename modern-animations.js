// ========================================
// MODERN SCROLL ANIMATIONS (N8N STYLE)
// ========================================

class ModernScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: [0.1, 0.3, 0.6],
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupSmoothScrolling();
        this.setupParallaxEffects();
        this.setupHoverEnhancements();
        this.setupCursorFollower();
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeAnimations();
            });
        } else {
            this.initializeAnimations();
        }
    }

    setupIntersectionObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const element = entry.target;
                const animationType = element.dataset.scrollAnimation;
                const delay = element.dataset.delay || 0;

                if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
                    setTimeout(() => {
                        element.classList.add('animate');
                        this.triggerAnimationEffects(element, animationType);
                    }, delay * 1000);
                }
            });
        }, this.observerOptions);
    }

    triggerAnimationEffects(element, animationType) {
        // Add ripple effect for special elements
        if (element.classList.contains('project-card') || element.classList.contains('skill-item')) {
            this.createRippleEffect(element);
        }

        // Add shine effect for titles
        if (element.classList.contains('section-title')) {
            this.addShineEffect(element);
        }

        // Emit custom event for additional effects
        element.dispatchEvent(new CustomEvent('elementAnimated', {
            detail: { animationType }
        }));
    }

    createRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.classList.add('scroll-ripple');
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = rect.width / 2;
        const y = rect.height / 2;

        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(0,0,0,0.1) 0%, transparent 70%);
            width: ${size}px;
            height: ${size}px;
            left: ${x - size/2}px;
            top: ${y - size/2}px;
            pointer-events: none;
            z-index: 1;
            animation: rippleExpand 0.8s ease-out forwards;
        `;

        // Ensure element has relative positioning for ripple
        const computedStyle = window.getComputedStyle(element);
        if (computedStyle.position === 'static') {
            element.style.position = 'relative';
        }
        
        element.appendChild(ripple);

        // Clean up after animation
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 800);
    }

    addShineEffect(element) {
        const shine = document.createElement('div');
        shine.classList.add('title-shine');
        
        shine.style.cssText = `
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
            pointer-events: none;
            z-index: 1;
            animation: shinePass 1.5s ease-out forwards;
        `;

        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(shine);

        setTimeout(() => {
            if (shine.parentNode) {
                shine.parentNode.removeChild(shine);
            }
        }, 1500);
    }

    setupSmoothScrolling() {
        // Enhanced smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Add visual feedback
                    this.highlightSection(target);
                }
            });
        });
    }

    highlightSection(section) {
        section.style.transition = 'background-color 0.3s ease';
        section.style.backgroundColor = 'rgba(0, 123, 255, 0.05)';
        
        setTimeout(() => {
            section.style.backgroundColor = '';
        }, 1000);
    }

    setupParallaxEffects() {
        let scrollPosition = 0;
        
        const updateParallax = () => {
            scrollPosition = window.pageYOffset;
            
            // Update CSS custom property for hero parallax
            document.documentElement.style.setProperty('--scroll-offset', `${scrollPosition * 0.5}px`);
            
            // Parallax effect for floating elements
            const floatingElements = document.querySelectorAll('.project-card, .skill-item');
            floatingElements.forEach((element, index) => {
                const rect = element.getBoundingClientRect();
                const speed = 0.1 + (index % 3) * 0.05; // Varied speeds
                
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const yPos = (rect.top - window.innerHeight / 2) * speed;
                    element.style.transform = `translateY(${yPos}px)`;
                }
            });
        };

        // Throttled scroll listener for performance
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateParallax();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    setupHoverEnhancements() {
        // Enhanced hover effects for project cards
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.createHoverGlow(e.target);
                this.tiltCard(e.target, e);
            });

            card.addEventListener('mousemove', (e) => {
                this.updateCardTilt(e.target, e);
            });

            card.addEventListener('mouseleave', (e) => {
                this.resetCardTilt(e.target);
            });
        });

        // Enhanced hover effects for skill items
        document.querySelectorAll('.skill-item').forEach(skill => {
            skill.addEventListener('mouseenter', (e) => {
                this.pulseSkill(e.target);
            });
        });
    }

    createHoverGlow(element) {
        const glow = document.createElement('div');
        glow.classList.add('hover-glow');
        
        glow.style.cssText = `
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(45deg, rgba(0,123,255,0.1), rgba(23,162,184,0.1));
            border-radius: inherit;
            pointer-events: none;
            z-index: -1;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        element.style.position = 'relative';
        element.insertBefore(glow, element.firstChild);

        requestAnimationFrame(() => {
            glow.style.opacity = '1';
        });

        // Clean up on mouse leave
        const cleanup = () => {
            glow.style.opacity = '0';
            setTimeout(() => {
                if (glow.parentNode) {
                    glow.parentNode.removeChild(glow);
                }
            }, 300);
        };

        element.addEventListener('mouseleave', cleanup, { once: true });
    }

    tiltCard(card, e) {
        const rect = card.getBoundingClientRect();
        card.style.transformOrigin = 'center center';
        card.style.transition = 'transform 0.1s ease-out';
    }

    updateCardTilt(card, e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / centerY * -10;
        const rotateY = (x - centerX) / centerX * 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    }

    resetCardTilt(card) {
        card.style.transition = 'transform 0.5s ease';
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    }

    pulseSkill(skill) {
        skill.style.animation = 'skillPulse 0.6s ease-out';
        
        setTimeout(() => {
            skill.style.animation = '';
        }, 600);
    }

    setupCursorFollower() {
        // Create custom cursor follower
        const cursor = document.createElement('div');
        cursor.classList.add('cursor-follower');
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(0,123,255,0.3) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
            transition: transform 0.1s ease;
            opacity: 0;
        `;
        
        document.body.appendChild(cursor);

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        const updateCursor = () => {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            requestAnimationFrame(updateCursor);
        };

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.opacity = '1';
        });

        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });

        updateCursor();
    }

    initializeAnimations() {
        // Add CSS animations to head
        this.addAnimationStyles();
        
        // Observe all elements with scroll animations
        document.querySelectorAll('[data-scroll-animation]').forEach(element => {
            this.observer.observe(element);
        });

        // Initialize stagger animations for groups
        this.setupStaggeredAnimations();
        
        console.log('🎬 Modern scroll animations initialized');
    }

    setupStaggeredAnimations() {
        // Stagger animations for skill items
        const skillItems = document.querySelectorAll('.skills-container .skill-item');
        skillItems.forEach((item, index) => {
            if (!item.dataset.delay) {
                item.dataset.delay = (index * 0.05 + 0.1).toString();
            }
        });

        // Stagger animations for project cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            if (!card.dataset.delay) {
                card.dataset.delay = (index * 0.2 + 0.1).toString();
            }
        });
    }

    addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rippleExpand {
                0% {
                    transform: scale(0);
                    opacity: 0.8;
                }
                100% {
                    transform: scale(2);
                    opacity: 0;
                }
            }

            @keyframes shinePass {
                0% {
                    left: -100%;
                }
                100% {
                    left: 100%;
                }
            }

            @keyframes skillPulse {
                0%, 100% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(1.05);
                }
            }

            .scroll-ripple {
                border-radius: 50%;
                position: absolute;
                pointer-events: none;
            }

            .cursor-follower {
                pointer-events: none !important;
            }
        `;
        
        document.head.appendChild(style);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ModernScrollAnimations();
    });
} else {
    new ModernScrollAnimations();
}

// Export for potential external use
window.ModernScrollAnimations = ModernScrollAnimations;
