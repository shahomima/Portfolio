// Element animation on scroll
const revealElements = document.querySelectorAll('.reveal');
const skillLevels = document.querySelectorAll('.skill-level');

// Mobile menu toggle.
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

// Projects filtering
const projectFilters = document.querySelectorAll('.project-filter');
const projectCards = document.querySelectorAll('.project-card');

// Sticky header on scroll
const header = document.querySelector('header');
 
// Initialize the page
function init() {
    // Check for elements in view on page load
    checkReveal();
    animateSkills();

    // Add particle background effect
    createParticleBackground();

    // Add typingEffect to the hero heading
    const headingElement = document.querySelector('.hero h1');
    if (headingElement) {
        const originalText = headingElement.innerHTML;
        headingElement.innerHTML = '';
        setTimeout(() => {
            typingEffect(headingElement, originalText, 0, 50);
        }, 500);
    }

    // Set up event listeners
    setupEventListeners();
}

function createParticleBackground() {
    const particles = document.createElement('div');
    particles.className = 'particles';
    document.body.appendChild(particles);
    
    for (let i = 0; i < 50; i++) {
        createParticle(particles);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    // Random size
    const size = Math.random() * 10 + 3;
    
    // Random opacity
    const opacity = Math.random() * 0.5 + 0.1;
    
    // Random duration
    const duration = Math.random() * 20 + 10;
    
    // Apply styles
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.opacity = opacity;
    particle.style.animationDuration = `${duration}s`;
    
    container.appendChild(particle);
}

function typingEffect(element, text, index, speed) {
    if (index < text.length) {
        element.innerHTML += text.charAt(index);
        index++;
        setTimeout(() => {
            typingEffect(element, text, index, speed);
        }, speed);
    }
}

function setupEventListeners() {
    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Project filtering with animation
    projectFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            // Remove active class from all filters
            projectFilters.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked filter
            filter.classList.add('active');
            
            // Get the filter value
            const filterValue = filter.getAttribute('data-filter');
            
            // Filter projects with animation
            filterProjects(filterValue);
        });
    });

    // Add 3D tilt effect to project cards
    projectCards.forEach(card => {
        card.addEventListener('mousemove', handleTilt);
        card.addEventListener('mouseleave', resetTilt);
    });

    // Scroll event for sticky header and animations
    window.addEventListener('scroll', () => {
        checkReveal();
        animateSkills();
        
        // Sticky header
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Handle nav link active state on scroll
    window.addEventListener('scroll', updateActiveNavLink);

    // Form submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Add hover animation for profile image
    const profileImg = document.querySelector('.profile-img-container');
    if (profileImg) {
        profileImg.addEventListener('mouseenter', () => {
            profileImg.classList.add('hover-active');
        });
        profileImg.addEventListener('mouseleave', () => {
            profileImg.classList.remove('hover-active');
        });
    }
}

// 3D Tilt effect for project cards
function handleTilt(e) {
    const card = this;
    const cardRect = card.getBoundingClientRect();
    const cardWidth = cardRect.width;
    const cardHeight = cardRect.height;
    
    const centerX = cardRect.left + cardWidth / 2;
    const centerY = cardRect.top + cardHeight / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateY = (mouseX / (cardWidth / 2)) * 5; // Max rotation 5deg
    const rotateX = (mouseY / (cardHeight / 2)) * -5; // Max rotation 5deg
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
}

function resetTilt() {
    this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
}

// Check if elements are in viewport and reveal them
function checkReveal() {
    const triggerBottom = window.innerHeight * 0.8;
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < triggerBottom) {
            element.classList.add('active');
        }
    });
}

// Animate skill bars when in viewport
function animateSkills() {
    const triggerBottom = window.innerHeight * 0.8;
    
    skillLevels.forEach(skill => {
        const elementTop = skill.getBoundingClientRect().top;
        
        if (elementTop < triggerBottom) {
            const width = skill.style.width;
            skill.style.width = "0";
            setTimeout(() => {
                skill.style.width = width;
            }, 100);
        }
    });
}

// Filter projects based on category with animation
function filterProjects(filter) {
    projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || filter === category) {
            card.style.display = 'block';
            setTimeout(() => {
                card.classList.add('active');
                card.style.transform = 'translateY(0) scale(1)';
                card.style.opacity = '1';
            }, 100);
        } else {
            card.classList.remove('active');
            card.style.transform = 'translateY(20px) scale(0.95)';
            card.style.opacity = '0';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// Update active nav link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 300)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Handle form submission with animation
function handleFormSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Basic validation
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Add success animation
    const form = e.target;
    form.classList.add('submitted');
    
    // Show success message
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.innerHTML = `<i class="fas fa-check-circle"></i><p>Thank you, ${name}! Your message has been sent.</p>`;
    
    // Insert after form
    form.parentNode.appendChild(successMsg);
    
    // Clear the form
    form.reset();
    
    // Remove animation and message after delay
    setTimeout(() => {
        form.classList.remove('submitted');
        successMsg.classList.add('fade-out');
        setTimeout(() => {
            successMsg.remove();
        }, 500);
    }, 3000);
}

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);

// Add CSS for new dynamic elements
document.head.insertAdjacentHTML('beforeend', `
<style>
.particles {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    pointer-events: none;
}

.particle {
    position: absolute;
    background: linear-gradient(135deg, #8e44ad, #3498db);
    border-radius: 50%;
    animation: float-particle linear infinite;
}

@keyframes float-particle {
    0% {
        transform: translateY(0) rotate(0deg);
    }
    100% {
        transform: translateY(-100vh) rotate(360deg);
    }
}

.success-message {
    background: linear-gradient(135deg, #27ae60, #2ecc71);
    color: white;
    padding: 20px;
    border-radius: 10px;
    margin-top: 20px;
    display: flex;
    align-items: center;
    gap: 15px;
    animation: slide-in 0.5s ease;
}

.success-message i {
    font-size: 2rem;
}

.success-message.fade-out {
    animation: fade-out 0.5s ease forwards;
}

.contact-form.submitted {
    animation: form-success 0.5s ease;
}

@keyframes slide-in {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fade-out {
    to {
        opacity: 0;
        transform: translateY(-20px);
    }
}

@keyframes form-success {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.02);
    }
    100% {
        transform: scale(1);
    }
}
</style>
`);