const EMAILJS_CONFIG = {
    publicKey: 'Yja2eZ7ej5V29cDYJ',
    serviceId: 'service_bkeu5c2',
    templateId: 'template_ox2zzjd'
};

document.addEventListener('DOMContentLoaded', function() {

    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (cursorDot && cursorOutline) {
        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
        });

        function animateCursorOutline() {
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;

            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;

            requestAnimationFrame(animateCursorOutline);
        }

        animateCursorOutline();

        document.querySelectorAll('a, button, .btn-primary, .btn-secondary').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.style.width = '30px';
                cursorDot.style.height = '30px';
                cursorOutline.style.width = '60px';
                cursorOutline.style.height = '60px';
            });

            el.addEventListener('mouseleave', () => {
                cursorDot.style.width = '8px';
                cursorDot.style.height = '8px';
                cursorOutline.style.width = '40px';
                cursorOutline.style.height = '40px';
            });
        });
    }

    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-animate]').forEach(el => {
        observer.observe(el);
    });

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const form = document.querySelector('.contact-form');
    const nameInput = form.querySelector('input[type="text"]');
    const emailInput = form.querySelector('input[type="email"]');
    const messageInput = form.querySelector('textarea');
    const submitButton = form.querySelector('.btn-submit');

    function showError(input, message) {
        removeError(input);
        input.style.border = '2px solid #ff4444';
        input.style.background = '#ffe5e5';

        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#ff4444';
        errorDiv.style.fontSize = '0.9rem';
        errorDiv.style.marginTop = '8px';
        errorDiv.style.fontWeight = '500';
        errorDiv.textContent = message;

        input.parentElement.appendChild(errorDiv);

        input.animate([
            { transform: 'translateX(0)' },
            { transform: 'translateX(-10px)' },
            { transform: 'translateX(10px)' },
            { transform: 'translateX(-10px)' },
            { transform: 'translateX(10px)' },
            { transform: 'translateX(0)' }
        ], {
            duration: 500,
            easing: 'ease-in-out'
        });
    }

    function removeError(input) {
        input.style.border = '2px solid #F0F0F0';
        input.style.background = '#FAFAFA';

        const errorMessage = input.parentElement.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    function showSuccess(input) {
        removeError(input);
        input.style.border = '2px solid #4CAF50';
        input.style.background = '#e8f5e9';
    }

    function showMessage(type, text) {
        const existingMessages = form.querySelectorAll('.form-message');
        existingMessages.forEach(msg => msg.remove());

        const messageDiv = document.createElement('div');
        messageDiv.className = 'form-message';
        messageDiv.style.padding = '20px';
        messageDiv.style.borderRadius = '15px';
        messageDiv.style.textAlign = 'center';
        messageDiv.style.marginTop = '25px';
        messageDiv.style.fontWeight = '600';
        messageDiv.style.fontSize = '1rem';

        if (type === 'success') {
            messageDiv.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
            messageDiv.style.color = 'white';
            messageDiv.style.boxShadow = '0 10px 30px rgba(76, 175, 80, 0.3)';
            messageDiv.innerHTML = `✅ ${text}`;
        } else {
            messageDiv.style.background = 'linear-gradient(135deg, #ff4444, #cc0000)';
            messageDiv.style.color = 'white';
            messageDiv.style.boxShadow = '0 10px 30px rgba(255, 68, 68, 0.3)';
            messageDiv.innerHTML = `❌ ${text}`;
        }

        messageDiv.style.animation = 'slideInUp 0.4s ease-out';
        form.appendChild(messageDiv);

        setTimeout(() => {
            messageDiv.style.animation = 'slideOutDown 0.4s ease-in';
            setTimeout(() => messageDiv.remove(), 400);
        }, 5000);
    }

    function setButtonLoading(isLoading) {
        if (isLoading) {
            submitButton.disabled = true;
            submitButton.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
                    <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
                    <path d="M12 2a10 10 0 0110 10" stroke-opacity="0.75"/>
                </svg>
                <span>Enviando...</span>
            `;
            submitButton.style.opacity = '0.7';
            submitButton.style.cursor = 'not-allowed';
        } else {
            submitButton.disabled = false;
            submitButton.innerHTML = `
                <span>Enviar Mensaje</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                </svg>
            `;
            submitButton.style.opacity = '1';
            submitButton.style.cursor = 'pointer';
        }
    }

    function validateName() {
        const name = nameInput.value.trim();

        if (name === '') {
            showError(nameInput, 'Por favor ingresa tu nombre');
            return false;
        }

        if (name.length < 2) {
            showError(nameInput, 'El nombre debe tener al menos 2 caracteres');
            return false;
        }

        if (name.length > 50) {
            showError(nameInput, 'El nombre no puede exceder 50 caracteres');
            return false;
        }

        if (!/^[a-záéíóúüñA-ZÁÉÍÓÚÜÑ\s'\-]+$/.test(name)) {
            showError(nameInput, 'El nombre solo puede contener letras');
            return false;
        }

        showSuccess(nameInput);
        return true;
    }

    function validateEmail() {
        const email = emailInput.value.trim();

        if (email === '') {
            showError(emailInput, 'Por favor ingresa tu correo electrónico');
            return false;
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(email)) {
            showError(emailInput, 'Por favor ingresa un correo válido (ejemplo@correo.com)');
            return false;
        }

        if (email.length > 100) {
            showError(emailInput, 'El correo es demasiado largo');
            return false;
        }

        showSuccess(emailInput);
        return true;
    }

    function validateMessage() {
        const message = messageInput.value.trim();

        if (message === '') {
            showError(messageInput, 'Por favor escribe tu mensaje');
            return false;
        }

        if (message.length > 1000) {
            showError(messageInput, 'El mensaje no puede exceder 1000 caracteres');
            return false;
        }

        showSuccess(messageInput);
        return true;
    }

    function validateForm() {
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();

        return isNameValid && isEmailValid && isMessageValid;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        emailjs.init({
            publicKey: EMAILJS_CONFIG.publicKey,
        });

        removeError(nameInput);
        removeError(emailInput);
        removeError(messageInput);

        if (!validateForm()) {
            const firstError = form.querySelector('[style*="border: 2px solid #ff4444"]');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
            return;
        }

        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            message: messageInput.value.trim()
        };

        setButtonLoading(true);

        try {

            await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, {
                name: formData.name,
                email: formData.email,
            });

            showMessage('success', '¡Mensaje enviado con éxito! Te contactaremos pronto.');

            form.reset();
            removeError(nameInput);
            removeError(emailInput);
            removeError(messageInput);

            setTimeout(() => {
                nameInput.style.border = '2px solid #F0F0F0';
                emailInput.style.border = '2px solid #F0F0F0';
                messageInput.style.border = '2px solid #F0F0F0';
            }, 2000);

        } catch (error) {
            console.error('❌ Error al enviar:', error);

            let errorMessage = 'Hubo un error al enviar el mensaje. Por favor intenta nuevamente.';

            if (error.message.includes('401')) {
                errorMessage = 'Error de autenticación. Verifica tu Public Key de EmailJS.';
            } else if (error.message.includes('400')) {
                errorMessage = 'Error de configuración. Verifica tus IDs de EmailJS.';
            } else if (error.message.includes('Network')) {
                errorMessage = 'Error de conexión. Verifica tu internet e intenta nuevamente.';
            }

            showMessage('error', errorMessage);

        } finally {
            setButtonLoading(false);
        }
    }

    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    messageInput.addEventListener('blur', validateMessage);

    nameInput.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            removeError(this);
        }
    });

    emailInput.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            removeError(this);
        }
    });

    messageInput.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            removeError(this);
        }
    });

    form.addEventListener('submit', handleSubmit);

    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');

    function closeMenu() {
        mobileMenuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');

            if (mobileMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMenu);
    }

    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    const btnMoreTestimonials = document.querySelector('.btn-more-testimonials');
    if (btnMoreTestimonials) {
        btnMoreTestimonials.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);

            const contactSection = document.querySelector('#contacto');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes slideOutDown {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(30px);
            }
        }

        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    const stepCards = document.querySelectorAll('.step-card');
    stepCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
    });

    const heroButtons = document.querySelectorAll('.hero-buttons a');
    heroButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });

        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease';
    });
});