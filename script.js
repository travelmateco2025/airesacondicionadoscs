// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handler
const contactForm = document.querySelector('.contacto-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    // Validate form
    if (!validateForm(this)) {
        showNotification('Por favor, completa todos los campos requeridos.', 'error');
        return;
    }
    
    // Show loading state
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        // Show success message
        showNotification('¡Consulta enviada exitosamente! Te contactaremos pronto.', 'success');
        
        // Reset form
        this.reset();
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Send WhatsApp message (optional)
        const whatsappMessage = `Hola, soy ${formObject.nombre}. ${formObject.mensaje}. Mi teléfono es ${formObject.telefono} y mi email es ${formObject.email}.`;
        // Uncomment the line below to open WhatsApp with the message
        // openWhatsApp(whatsappMessage);
        
    }, 2000);
});

// Form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            input.style.borderColor = '#ddd';
        }
    });
    
    // Email validation
    const email = form.querySelector('input[type="email"]');
    if (email && email.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            email.style.borderColor = '#e74c3c';
            isValid = false;
        }
    }
    
    // Phone validation
    const phone = form.querySelector('input[type="tel"]');
    if (phone && phone.value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(phone.value.replace(/\s/g, ''))) {
            phone.style.borderColor = '#e74c3c';
            isValid = false;
        }
    }
    
    return isValid;
}

// Enhanced form validation
const formInputs = document.querySelectorAll('.contacto-form input, .contacto-form select, .contacto-form textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.style.borderColor = '#e74c3c';
        } else {
            input.style.borderColor = '#ddd';
        }
    });
    
    input.addEventListener('input', () => {
        if (input.style.borderColor === 'rgb(231, 76, 60)') {
            input.style.borderColor = '#ddd';
        }
    });
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Set background color based on type
    const bgColor = type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3';
    notification.style.background = bgColor;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.servicio-card, .instagram-post, .feature, .stat, .contact-item');
    animateElements.forEach(el => observer.observe(el));
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + (target >= 24 ? '' : '+');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + (target >= 24 ? '' : '+');
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Add active class to current section in navigation
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
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

window.addEventListener('scroll', updateActiveNavLink);

// Add active nav link styles
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
`;
document.head.appendChild(style);

// WhatsApp integration
function openWhatsApp(message = '') {
    const phoneNumber = '59892710542'; // Número de WhatsApp Uruguay
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Instagram post interactions
document.querySelectorAll('.instagram-post').forEach(post => {
    post.addEventListener('click', () => {
        // Open Instagram profile in new tab
        window.open('https://www.instagram.com/airesacondicionados.cs/', '_blank');
    });
});

// Story interactions
document.querySelectorAll('.story-item').forEach(story => {
    story.addEventListener('click', () => {
        // Open Instagram stories in new tab
        window.open('https://www.instagram.com/airesacondicionados.cs/', '_blank');
    });
});

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add loaded styles
    const loadedStyle = document.createElement('style');
    loadedStyle.textContent = `
        body {
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        body.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(loadedStyle);
});

// Temperature animation in hero
function animateTemperature() {
    const tempElement = document.querySelector('.temp');
    if (tempElement) {
        const temps = ['22°C', '23°C', '24°C', '23°C', '22°C'];
        let currentIndex = 0;
        
        setInterval(() => {
            tempElement.textContent = temps[currentIndex];
            currentIndex = (currentIndex + 1) % temps.length;
        }, 3000);
    }
}

// Initialize temperature animation
animateTemperature();

// Add click tracking for analytics (if needed)
function trackClick(element, event) {
    // Add analytics tracking here
    console.log(`${event} clicked on ${element}`);
}

// Track important interactions
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => trackClick('phone', 'call'));
});

document.querySelectorAll('a[href*="instagram"]').forEach(link => {
    link.addEventListener('click', () => trackClick('instagram', 'social'));
});

document.querySelectorAll('a[href*="whatsapp"]').forEach(link => {
    link.addEventListener('click', () => trackClick('whatsapp', 'chat'));
});

// Form field focus effects
document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.classList.remove('focused');
    });
});

// Add focused styles
const formStyle = document.createElement('style');
formStyle.textContent = `
    .form-group.focused label {
        color: var(--primary-color);
    }
    
    .form-group.focused input,
    .form-group.focused select,
    .form-group.focused textarea {
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
    }
`;
document.head.appendChild(formStyle);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.3;
    
    if (hero && scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add Instagram feed refresh (simulate)
function refreshInstagramFeed() {
    const posts = document.querySelectorAll('.instagram-post');
    posts.forEach(post => {
        const stats = post.querySelector('.post-stats');
        const likes = stats.querySelector('span:first-child span');
        const comments = stats.querySelector('span:last-child span');
        
        // Simulate new engagement
        const currentLikes = parseInt(likes.textContent);
        const currentComments = parseInt(comments.textContent);
        
        if (Math.random() > 0.7) {
            likes.textContent = currentLikes + Math.floor(Math.random() * 3);
        }
        if (Math.random() > 0.8) {
            comments.textContent = currentComments + Math.floor(Math.random() * 2);
        }
    });
}

// Refresh feed every 30 seconds
setInterval(refreshInstagramFeed, 30000);

console.log('Aires CS website loaded successfully! 🌟');
