// ===================================
// ADVANCED PORTFOLIO ANIMATIONS
// Iron Man Style Holographic Effects
// ===================================

class AdvancedAnimations {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.holographicWatch = null;
        this.currentSkillIndex = 0;
        this.skills = [];
        this.isInitialized = false;
        
        this.init();
    }

    init() {
        this.setupGSAP();
        this.setupThreeJS();
        this.setupScrollAnimations();
        this.setupFloatingCards();
        this.setupHolographicWatch();
        this.setupSkillsInteraction();
        this.setupAdvancedScrollEffects();
        this.isInitialized = true;
    }

    // ===================================
    // GSAP SCROLL TRIGGER SETUP
    // ===================================
    setupGSAP() {
        gsap.registerPlugin(ScrollTrigger);
        
        // Refresh ScrollTrigger on window resize
        window.addEventListener('resize', () => {
            ScrollTrigger.refresh();
        });
    }

    // ===================================
    // THREE.JS HOLOGRAPHIC WATCH
    // ===================================
    setupThreeJS() {
        const container = document.getElementById('holographic-watch');
        if (!container) return;

        // Scene setup
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: true 
        });
        
        this.renderer.setSize(200, 200);
        this.renderer.setClearColor(0x000000, 0);
        container.appendChild(this.renderer.domElement);

        // Create holographic watch
        this.createHolographicWatch();
        
        // Position camera
        this.camera.position.z = 5;
        
        // Start render loop
        this.animate();
    }

    createHolographicWatch() {
        // Watch base (cylinder)
        const watchGeometry = new THREE.CylinderGeometry(1.5, 1.5, 0.3, 32);
        const watchMaterial = new THREE.MeshBasicMaterial({
            color: 0x222222,
            transparent: true,
            opacity: 0.8
        });
        const watch = new THREE.Mesh(watchGeometry, watchMaterial);
        
        // Holographic ring
        const ringGeometry = new THREE.TorusGeometry(1.8, 0.1, 8, 32);
        const ringMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ffff,
            transparent: true,
            opacity: 0.7
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        
        // Holographic display plane
        const displayGeometry = new THREE.PlaneGeometry(2, 1.2);
        const displayMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ffff,
            transparent: true,
            opacity: 0.3,
            side: THREE.DoubleSide
        });
        const display = new THREE.Mesh(displayGeometry, displayMaterial);
        display.position.y = 0.5;
        
        // Add to scene
        this.scene.add(watch);
        this.scene.add(ring);
        this.scene.add(display);
        
        this.holographicWatch = { watch, ring, display };
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        if (this.holographicWatch) {
            // Rotate the ring
            this.holographicWatch.ring.rotation.z += 0.01;
            
            // Float animation
            const time = Date.now() * 0.002;
            this.holographicWatch.watch.position.y = Math.sin(time) * 0.1;
            this.holographicWatch.display.position.y = 0.5 + Math.sin(time * 1.2) * 0.05;
            
            // Holographic flicker
            this.holographicWatch.display.material.opacity = 0.3 + Math.sin(time * 3) * 0.1;
        }
        
        this.renderer.render(this.scene, this.camera);
    }

    // ===================================
    // FLOATING PROJECT CARDS
    // ===================================
    setupFloatingCards() {
        const cards = document.querySelectorAll('.floating-card');
        
        cards.forEach((card, index) => {
            // Create timeline for each card
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: card,
                    start: 'top center',
                    end: 'bottom center',
                    scrub: 1,
                    onEnter: () => this.activateCard(card),
                    onLeave: () => this.deactivateCard(card),
                    onEnterBack: () => this.activateCard(card),
                    onLeaveBack: () => this.deactivateCard(card)
                }
            });

            // Floating animation
            tl.to(card, {
                rotateX: -5,
                rotateY: 5,
                z: 100,
                scale: 1.05,
                duration: 0.5
            })
            .to(card, {
                rotateX: 5,
                rotateY: -5,
                z: -50,
                scale: 0.95,
                opacity: 0.8,
                duration: 0.5
            });

            // Hover effects
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    rotateY: -10,
                    rotateX: 5,
                    z: 50,
                    scale: 1.02,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    rotateY: 0,
                    rotateX: 0,
                    z: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });
    }

    activateCard(card) {
        card.classList.add('floating');
        card.classList.remove('behind');
    }

    deactivateCard(card) {
        card.classList.remove('floating');
        card.classList.add('behind');
    }

    // ===================================
    // HOLOGRAPHIC WATCH INTERACTION
    // ===================================
    setupHolographicWatch() {
        const watchContainer = document.querySelector('.holographic-watch-container');
        const skillsSection = document.getElementById('skills');
        
        if (!watchContainer || !skillsSection) return;

        // Show watch when entering skills section
        ScrollTrigger.create({
            trigger: skillsSection,
            start: 'top 80%',
            end: 'bottom 20%',
            onEnter: () => {
                watchContainer.classList.add('active');
                this.startSkillAnimation();
            },
            onLeave: () => {
                watchContainer.classList.remove('active');
                this.stopSkillAnimation();
            },
            onEnterBack: () => {
                watchContainer.classList.add('active');
                this.startSkillAnimation();
            },
            onLeaveBack: () => {
                watchContainer.classList.remove('active');
                this.stopSkillAnimation();
            }
        });
    }

    startSkillAnimation() {
        this.skills = Array.from(document.querySelectorAll('.skill-item'));
        this.currentSkillIndex = 0;
        this.skillInterval = setInterval(() => {
            this.updateSkillDisplay();
        }, 2000);
        this.updateSkillDisplay();
    }

    stopSkillAnimation() {
        if (this.skillInterval) {
            clearInterval(this.skillInterval);
        }
    }

    updateSkillDisplay() {
        if (!this.skills.length) return;

        // Remove active class from all skills
        this.skills.forEach(skill => skill.classList.remove('active'));
        
        // Add active class to current skill
        const currentSkill = this.skills[this.currentSkillIndex];
        currentSkill.classList.add('active');
        
        // Update watch display
        const skillName = currentSkill.querySelector('span').textContent;
        const skillLevel = currentSkill.dataset.level || '85';
        
        const nameElement = document.getElementById('skill-name');
        const levelBar = document.querySelector('.level-bar');
        
        if (nameElement) nameElement.textContent = skillName;
        if (levelBar) {
            gsap.to(levelBar, {
                width: `${skillLevel}%`,
                duration: 1,
                ease: 'power2.out'
            });
        }
        
        // Move to next skill
        this.currentSkillIndex = (this.currentSkillIndex + 1) % this.skills.length;
    }

    // ===================================
    // SKILLS INTERACTION
    // ===================================
    setupSkillsInteraction() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach((skill, index) => {
            // Staggered entrance animation
            gsap.from(skill, {
                y: 50,
                opacity: 0,
                scale: 0.8,
                rotation: 10,
                duration: 0.8,
                delay: index * 0.1,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: skill,
                    start: 'top 90%',
                    end: 'bottom 10%',
                    toggleActions: 'play none none reverse'
                }
            });

            // Click interaction
            skill.addEventListener('click', () => {
                this.focusSkill(skill);
            });

            // Enhanced hover effect
            skill.addEventListener('mouseenter', () => {
                gsap.to(skill, {
                    y: -15,
                    scale: 1.08,
                    rotateY: 10,
                    duration: 0.3,
                    ease: 'power2.out'
                });
                
                gsap.to(skill.querySelector('.skill-logo'), {
                    scale: 1.2,
                    rotateY: 20,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            skill.addEventListener('mouseleave', () => {
                gsap.to(skill, {
                    y: 0,
                    scale: 1,
                    rotateY: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
                
                gsap.to(skill.querySelector('.skill-logo'), {
                    scale: 1,
                    rotateY: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });
    }

    focusSkill(skill) {
        // Remove focus from all skills
        document.querySelectorAll('.skill-item').forEach(s => {
            s.classList.remove('focused');
        });
        
        // Add focus to clicked skill
        skill.classList.add('focused');
        
        // Update watch immediately
        const skillName = skill.querySelector('span').textContent;
        const skillLevel = skill.dataset.level || '85';
        
        const nameElement = document.getElementById('skill-name');
        const levelBar = document.querySelector('.level-bar');
        
        if (nameElement) nameElement.textContent = skillName;
        if (levelBar) {
            gsap.to(levelBar, {
                width: `${skillLevel}%`,
                duration: 1,
                ease: 'elastic.out(1, 0.5)'
            });
        }
        
        // Pulse effect
        gsap.to(skill, {
            scale: 1.1,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            ease: 'power2.inOut'
        });
    }

    // ===================================
    // ADVANCED SCROLL EFFECTS
    // ===================================
    setupAdvancedScrollEffects() {
        // Parallax background elements
        this.setupParallax();
        
        // Staggered text animations
        this.setupTextAnimations();
        
        // Button glow effects
        this.setupButtonEffects();
        
        // Hero section advanced animation
        this.setupHeroAnimation();
    }

    setupParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            
            gsap.to(element, {
                yPercent: -50 * speed,
                ease: 'none',
                scrollTrigger: {
                    trigger: element,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });
        });
    }

    setupTextAnimations() {
        // Split text animation for titles
        const titles = document.querySelectorAll('.section-title');
        
        titles.forEach(title => {
            const chars = title.textContent.split('');
            title.innerHTML = chars.map(char => 
                char === ' ' ? ' ' : `<span class="char">${char}</span>`
            ).join('');
            
            gsap.from(title.querySelectorAll('.char'), {
                y: 100,
                opacity: 0,
                rotateX: -90,
                stagger: 0.05,
                duration: 0.8,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: title,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            });
        });
    }

    setupButtonEffects() {
        const buttons = document.querySelectorAll('.glow-button');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                gsap.to(button, {
                    scale: 1.05,
                    y: -5,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            button.addEventListener('mouseleave', () => {
                gsap.to(button, {
                    scale: 1,
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            button.addEventListener('click', (e) => {
                // Ripple effect
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const ripple = document.createElement('div');
                ripple.style.cssText = `
                    position: absolute;
                    width: 20px;
                    height: 20px;
                    background: rgba(0, 255, 255, 0.5);
                    border-radius: 50%;
                    left: ${x - 10}px;
                    top: ${y - 10}px;
                    pointer-events: none;
                `;
                
                button.style.position = 'relative';
                button.appendChild(ripple);
                
                gsap.to(ripple, {
                    scale: 10,
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power2.out',
                    onComplete: () => ripple.remove()
                });
            });
        });
    }

    setupHeroAnimation() {
        const heroContent = document.querySelector('.hero-content');
        const heroTitle = document.querySelector('.hero-title');
        
        if (heroContent) {
            // Advanced entrance animation
            const tl = gsap.timeline();
            
            tl.from(heroContent, {
                y: 100,
                opacity: 0,
                scale: 0.8,
                duration: 1.2,
                ease: 'power3.out'
            })
            .from(heroTitle.querySelectorAll('span'), {
                y: 50,
                opacity: 0,
                stagger: 0.2,
                duration: 0.8,
                ease: 'back.out(1.7)'
            }, '-=0.8')
            .from('.hero-actions .btn', {
                y: 30,
                opacity: 0,
                scale: 0.8,
                stagger: 0.1,
                duration: 0.6,
                ease: 'power2.out'
            }, '-=0.4');
        }
    }

    // ===================================
    // UTILITY METHODS
    // ===================================
    onResize() {
        if (this.camera && this.renderer) {
            this.camera.aspect = 1;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(200, 200);
        }
        
        ScrollTrigger.refresh();
    }

    destroy() {
        if (this.skillInterval) {
            clearInterval(this.skillInterval);
        }
        
        ScrollTrigger.getAll().forEach(st => st.kill());
        
        if (this.renderer) {
            this.renderer.dispose();
        }
    }
}

// ===================================
// INITIALIZE ON DOM CONTENT LOADED
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize advanced animations
    const advancedAnimations = new AdvancedAnimations();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        advancedAnimations.onResize();
    });
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        advancedAnimations.destroy();
    });
});

// ===================================
// ADDITIONAL UTILITY FUNCTIONS
// ===================================

// Smooth scroll with easing
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        gsap.to(window, {
            duration: 1.5,
            scrollTo: {
                y: element,
                offsetY: 80
            },
            ease: 'power2.inOut'
        });
    }
}

// Update navigation links for smooth scrolling
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            smoothScrollTo(href);
        }
    });
});

// Custom cursor effect
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    background: radial-gradient(circle, rgba(0,255,255,0.8) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    mix-blend-mode: difference;
    transition: transform 0.1s ease;
`;
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX - 10,
        y: e.clientY - 10,
        duration: 0.1
    });
});

// Add hover effects for interactive elements
document.querySelectorAll('a, button, .skill-item, .project-card').forEach(element => {
    element.addEventListener('mouseenter', () => {
        gsap.to(cursor, {
            scale: 2,
            duration: 0.2
        });
    });
    
    element.addEventListener('mouseleave', () => {
        gsap.to(cursor, {
            scale: 1,
            duration: 0.2
        });
    });
});
