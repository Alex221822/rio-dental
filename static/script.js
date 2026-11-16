document.addEventListener('DOMContentLoaded', () => {
    // Menu Hamburguesa Responsive
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('toggle');
        });
    });

    // Envío del Formulario vía Fetch a Flask
    const appointmentForm = document.getElementById('appointmentForm');
    const formResponse = document.getElementById('formResponse');

    if (appointmentForm) {
        appointmentForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = appointmentForm.querySelector('.btn-submit');
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Procesando... <i class="fa-solid fa-spinner fa-spin"></i>';

            const formData = {
                nombre: document.getElementById('nombre').value,
                telefono: document.getElementById('telefono').value,
                servicio: document.getElementById('servicio').value
            };

            try {
                const response = await fetch('/api/contacto', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (result.status === 'success') {
                    formResponse.style.color = '#10b981';
                    formResponse.textContent = result.message;
                    appointmentForm.reset();
                } else {
                    formResponse.style.color = '#ef4444';
                    formResponse.textContent = 'Hubo un error al procesar la solicitud. Intente nuevamente.';
                }
            } catch (error) {
                formResponse.style.color = '#ef4444';
                formResponse.textContent = 'Error de conexión con el servidor.';
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Solicitar Cita <i class="fa-solid fa-paper-plane"></i>';
            }
        });
    }

    // Efecto de aparición al hacer scroll (ScrollReveal básico)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.service-card, .about-content, .about-image, .contact-info, .contact-form');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});