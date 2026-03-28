// MENÚ MÓVIL
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const bars = document.querySelectorAll('.bar');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        bars.forEach(bar => bar.classList.toggle('active'));
    });

    navMenu.addEventListener('click', () => {
        navMenu.classList.remove('active');
        bars.forEach(bar => bar.classList.remove('active'));
    });
}

// SCROLL SMOOTH Y NAVBAR ACTIVA
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-menu a');
    const navbar = document.querySelector('.navbar');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Efecto de sombra en navbar al scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        }
    });
});

// ACORDIÓN (FAQ)
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const accordionItem = header.parentElement;
        const content = accordionItem.querySelector('.accordion-content');

        // Cerrar todos los demás items
        document.querySelectorAll('.accordion-item').forEach(item => {
            if (item !== accordionItem) {
                item.querySelector('.accordion-header').classList.remove('active');
                item.querySelector('.accordion-content').classList.remove('active');
            }
        });

        // Toggle del item actual
        header.classList.toggle('active');
        content.classList.toggle('active');
    });
});

// GALERÍA - FILTROS
const filterButtons = document.querySelectorAll('.filtro-btn');
const galeriaItems = document.querySelectorAll('.galeria-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        galeriaItems.forEach(item => {
            if (filter === 'todos' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.classList.add('scroll-animate');
                }, 10);
            } else {
                item.style.display = 'none';
                item.classList.remove('scroll-animate');
            }
        });
    });
});

// GALERÍA - MODAL
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');
const modalClose = document.querySelector('.modal-close');

galeriaItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        modalImage.src = img.src;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

if (modalClose) {
    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// ANIMACIÓN DE SCROLL
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('scroll-animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos para animación
document.querySelectorAll('.valor-card, .importancia-card, .apoyo-card, .contacto-item').forEach(element => {
    element.classList.remove('scroll-animate');
    observer.observe(element);
});

// FORMULARIO CONTACTO
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('¡Gracias por tu mensaje! Nos pondremos en contacto pronto.');
        contactForm.reset();
    });
}

// FORMULARIO DONACIONES
const donationForm = document.getElementById('donation-form');
if (donationForm) {
    donationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('¡Gracias por tu apoyo! Próximamente te contactaremos para coordinar tu ayuda.');
        donationForm.reset();
    });
}