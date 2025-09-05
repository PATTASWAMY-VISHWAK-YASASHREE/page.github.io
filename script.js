// Mobile Navigation
document.addEventListener('DOMContentLoaded', function() {
    particlesJS.load('particles-js', 'particles.json', function() {
      console.log('callback - particles.js config loaded');
    });

    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
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
            }
        });
    });

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

// GitHub API Integration
async function initializeGitHub() {
    const username = 'PATTASWAMY-VISHWAK-YASASHREE';
    
    try {
        // Fetch user profile with CORS handling
        await fetchGitHubProfile(username);
        
        // Fetch repositories
        await fetchGitHubRepos(username);
        
    } catch (error) {
        console.error('Error initializing GitHub data:', error);
        // Show fallback static data for demo purposes
        showFallbackGitHubData();
    }
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

// Stacking cards effect
var StackCards = function(element) {
  this.element = element;
  this.items = this.element.getElementsByClassName('js-stack-cards__item');
  this.scrollingListener = false;
  this.scrolling = false;
  initStackCardsEffect(this);
};

function initStackCardsEffect(element) {
  // use Intersection Observer to trigger animation
  var observer = new IntersectionObserver(stackCardsCallback.bind(element));
  observer.observe(element.element);
};

function stackCardsCallback(entries) {
  // Intersection Observer callback
  if (entries[0].isIntersecting) {
    // cards inside viewport - add scroll listener
    if (this.scrollingListener) return; // listener for scroll event already added
    stackCardsInitEvent(this);
  } else {
    // cards not inside viewport - remove scroll listener
    if (!this.scrollingListener) return; // listener for scroll event already removed
    window.removeEventListener('scroll', this.scrollingListener);
    this.scrollingListener = false;
  }
};

function stackCardsInitEvent(element) {
  element.scrollingListener = stackCardsScrolling.bind(element);
  window.addEventListener('scroll', element.scrollingListener);
};

function stackCardsScrolling() {
  if (this.scrolling) return;
  this.scrolling = true;
  window.requestAnimationFrame(animateStackCards.bind(this));
};

function getAbsoluteTop(element) {
  var top = 0;
  while (element) {
    top += element.offsetTop;
    element = element.offsetParent;
  }
  return top;
}

function animateStackCards() {
  var top = this.element.getBoundingClientRect().top;

  for (var i = 0; i < this.items.length; i++) {
    // cardTop/cardHeight/marginY are the css values for the card top position/height/Y offset
    var cardTop = getAbsoluteTop(this.items[i]);
    var cardHeight = this.items[i].offsetHeight;
    var marginY = 20; // Same as the 'top' value in CSS
    var scrolling = cardTop - top - i * (cardHeight + marginY);

    if (scrolling > 0) {
      // card is fixed - we can apply 3D transform
      var rotateX = -scrolling * 0.05;
      var translateZ = -scrolling * 0.5;
      this.items[i].setAttribute('style', 'transform: translateY(' + (marginY * i) + 'px) rotateX(' + rotateX + 'deg) translateZ(' + translateZ + 'px);');
    } else {
      this.items[i].setAttribute('style', 'transform: translateY(' + (marginY * i) + 'px);');
    }
  }

  this.scrolling = false;
};

var stackCards = document.getElementsByClassName('js-stack-cards');
var intersectionObserverSupported = ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype);

if (stackCards.length > 0 && intersectionObserverSupported) {
  for (var i = 0; i < stackCards.length; i++) {
    new StackCards(stackCards[i]);
  }
}