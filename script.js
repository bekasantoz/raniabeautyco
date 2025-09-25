 // ====== Mobile Menu Toggle ======
      const mobileMenuBtn = document.getElementById('mobileMenuBtn');
      const navLinks = document.getElementById('navLinks');

      mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
      });

      // Close mobile menu when clicking on a link
      const navItems = document.querySelectorAll('.nav-links a');
      navItems.forEach(item => {
        item.addEventListener('click', () => {
          navLinks.classList.remove('active');
        });
      });

      // ====== Header scroll effect ======
      const header = document.getElementById('header');
      window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      });

      // ====== Fade in animation on scroll ======
      const fadeElements = document.querySelectorAll('.fade-in');
      const fadeInOnScroll = () => {
        fadeElements.forEach(element => {
          const elementTop = element.getBoundingClientRect().top;
          const elementVisible = 150;
          if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
          }
        });
      };

      window.addEventListener('scroll', fadeInOnScroll);
      fadeInOnScroll(); // Check on load

      // ====== Smooth scrolling ======
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 80,
              behavior: 'smooth'
            });
          }
        });
      });

      // ====== Formulário de contato para WhatsApp ======
      const contactForm = document.getElementById('contactForm');
      const formMessage = document.getElementById('formMessage');

      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const service = document.getElementById('service').value;
        const eventDate = document.getElementById('eventDate').value;
        const message = document.getElementById('message').value;

        // Validar telefone
        const phoneRegex = /^[0-9]{10,11}$/;
        const cleanPhone = phone.replace(/\D/g, '');
        if (!phoneRegex.test(cleanPhone)) {
          showMessage('Por favor, insira um número de telefone válido com DDD.', 'error');
          return;
        }

        // Criar mensagem para WhatsApp
        let whatsappMessage = `Olá Rania, meu nome é ${name}.`;
        if (service) whatsappMessage += ` Estou interessado(a) no serviço: ${service}.`;
        if (eventDate) whatsappMessage += ` Data do evento: ${eventDate}.`;
        whatsappMessage += ` Mensagem: ${message}`;

        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappURL = `https://wa.me/5581985907093?text=${encodedMessage}`;
        window.open(whatsappURL, '_blank');

        showMessage('Obrigada! Redirecionando para o WhatsApp...', 'success');
        setTimeout(() => {
          contactForm.reset();
          formMessage.style.display = 'none';
        }, 3000);
      });

      function showMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = 'form-message ' + type;
        formMessage.style.display = 'block';
      }

      // ====== Máscara para o telefone ======
      const phoneInput = document.getElementById('phone');
      phoneInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);

        if (value.length > 10) {
          value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (value.length > 6) {
          value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
        } else if (value.length > 2) {
          value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
        }
        e.target.value = value;
      });

      // ====== Máscara para a data ======
      const dateInput = document.getElementById('eventDate');
      dateInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 8) value = value.slice(0, 8);

        if (value.length > 4) {
          value = value.replace(/(\d{2})(\d{2})(\d{0,4})/, '$1/$2/$3');
        } else if (value.length > 2) {
          value = value.replace(/(\d{2})(\d{0,2})/, '$1/$2');
        }
        e.target.value = value;
      });