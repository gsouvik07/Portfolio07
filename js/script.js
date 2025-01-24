// Navigation Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuBtn.classList.toggle('active');
    document.body.classList.toggle('menu-open');
    
    // Toggle menu icon
    const icon = menuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-ellipsis-v');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-ellipsis-v');
    }
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuBtn.classList.remove('active');
        document.body.classList.remove('menu-open');
        
        // Reset menu icon
        const icon = menuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-ellipsis-v');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Populate Projects
const projectGrid = document.querySelector('.project-grid');

projects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    projectCard.innerHTML = `
        <img src="${project.image}" alt="${project.title}">
        <div class="project-info">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tech">
                ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
            </div>
            <a href="${project.link}" target="_blank">View Project</a>
        </div>
    `;
    projectGrid.appendChild(projectCard);
});

// Contact Form Submission to Google Sheets
async function submitForm(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submit-btn');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toLocaleString()
    };

    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbxNEEOcFEBXiTgqvxmEGgWAGFJUHGMbPfSbxJnqbPXxoWyHJKGVyRGLHLPkbxAr9EtP/exec', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        // Clear the form
        document.getElementById('contact-form').reset();
        
        // Show success message
        alert('Thank you! Your message has been sent successfully.');
    } catch (error) {
        console.error('Error:', error);
        alert('Oops! Something went wrong. Please try again later.');
    } finally {
        // Reset button state
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    }

    return false;
}

// Form Submission
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', submitForm);

// Scroll Animation
const sections = document.querySelectorAll('section');

function checkScroll() {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
}

// Initial styles for sections
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('scroll', checkScroll);
checkScroll(); // Check on initial load

// Update copyright year
document.getElementById('current-year').textContent = new Date().getFullYear();
