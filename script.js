document.addEventListener('DOMContentLoaded', () => {
    
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Animate Links (Optional simple fade in effect logic could go here)
        hamburger.classList.toggle('toggle');
    });

    // Close mobile menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');
        });
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate header height for offset
                const headerOffset = document.getElementById('main-header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Active Link Highlighting on Scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        const headerHeight = document.getElementById('main-header').offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 50; // Adjustment
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });

    // Scroll Animations
    const observerOptions = {
        threshold: 0.3,
        rootMargin: "0px 0px -100px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-slide-up, .animate-slide-in-right, .animate-slide-in-left').forEach(el => {
        observer.observe(el);
    });

    // EmailJS Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const btn = contactForm.querySelector('.btn-submit');
            const statusMsg = document.getElementById('form-status');
            const originalBtnText = btn.innerText;

            btn.innerText = 'Enviando...';
            statusMsg.style.display = 'none';
            statusMsg.className = '';

            const templateParams = {
                name: document.getElementById('nombre').value,
                email: document.getElementById('email').value,
                message: document.getElementById('mensaje').value
            };

            emailjs.send('service_7d1d99m', 'template_cozww7i', templateParams)
                .then(function() {
                    btn.innerText = originalBtnText;
                    statusMsg.innerText = '¡Mensaje enviado con éxito!';
                    statusMsg.style.color = 'green';
                    statusMsg.style.display = 'block';
                    contactForm.reset();
                    setTimeout(() => {
                        statusMsg.style.display = 'none';
                    }, 5000);
                }, function(error) {
                    btn.innerText = originalBtnText;
                    statusMsg.innerText = 'Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.';
                    statusMsg.style.color = 'red';
                    statusMsg.style.display = 'block';
                    console.error('FAILED...', error);
                });
        });
    }
});
