// Simple Scroll Animations
document.addEventListener('DOMContentLoaded', function() {
    // Simple intersection observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, delay * 1000);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all elements with scroll animations
    document.querySelectorAll('[data-scroll-animation]').forEach(el => {
        observer.observe(el);
    });
});
