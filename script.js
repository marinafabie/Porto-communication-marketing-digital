document.addEventListener('DOMContentLoaded', function() {
  // Animation script for fade-in elements
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  });

  const hiddenElements = document.querySelectorAll('.hidden');
  hiddenElements.forEach((el) => observer.observe(el));

  // Typing animation for hero section
  const text = "Stage en Marketing Digital & Communication";
  const typingElement = document.getElementById('typing-text');
  if (typingElement) {
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        typingElement.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };
    typeWriter();
  }

  // Smooth scrolling for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Contact form that sends email
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Create form data for sending
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('subject', subject);
      formData.append('message', message);
      
      // Create the email content in HTML format
      const emailBody = `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              h2 { color: #2A9D8F; }
              .info { margin-bottom: 20px; }
              .message { background-color: #f9f9f9; padding: 15px; border-radius: 5px; }
            </style>
          </head>
          <body>
            <div class="container">
              <h2>Nouveau message de votre portfolio</h2>
              <div class="info">
                <p><strong>Nom:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Sujet:</strong> ${subject}</p>
              </div>
              <div class="message">
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
              </div>
            </div>
          </body>
        </html>
      `;

      // In a real implementation, you would use a server-side solution
      // like EmailJS, a backend API, or a service like Formspree
      // Here's a demonstration using EmailJS (you would need to include their script)
      
      // Simulate sending (in a real scenario, use EmailJS or a similar service)
      formStatus.innerHTML = "Envoi en cours...";
      
      // Send the form data
      // For this example, we're simulating the email sending
      // In a real implementation, you would use:
      
      /*
      emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        name: name,
        email: email,
        subject: subject,
        message: message,
        html_message: emailBody
      })
      .then(function() {
        formStatus.className = 'form-status success';
        formStatus.innerHTML = 'Votre message a été envoyé avec succès!';
        contactForm.reset();
      }, function(error) {
        formStatus.className = 'form-status error';
        formStatus.innerHTML = 'Une erreur est survenue. Veuillez réessayer.';
        console.error('EmailJS error:', error);
      });
      */
      
      // Since we don't have EmailJS set up in this example,
      // we'll simulate a successful submission after a delay
      setTimeout(() => {
        formStatus.className = 'form-status success';
        formStatus.innerHTML = 'Votre message a été envoyé avec succès!';
        contactForm.reset();
        
        // Reset status message after 5 seconds
        setTimeout(() => {
          formStatus.innerHTML = '';
          formStatus.className = 'form-status';
        }, 5000);
      }, 1500);
    });
  }

  // Add active class to nav items on scroll
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav a');

  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.pageYOffset >= sectionTop - 200) {
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

  // Animate skill bars when visible
  const skillsSection = document.querySelector('#competences');
  const skillBars = document.querySelectorAll('.skill-progress');
  
  if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        skillBars.forEach(bar => {
          const width = bar.style.width;
          bar.style.width = '0';
          setTimeout(() => {
            bar.style.width = width;
          }, 300);
        });
      }
    }, { threshold: 0.5 });
    
    skillsObserver.observe(skillsSection);
  }
});
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));



// Navigation active sur défilement
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav a');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= (sectionTop - 300)) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === current) {
      link.classList.add('active');
    }
  });
});

// Fonctionnalités des modales de projets
const modal = document.getElementById('projectModal');
const modalContent = document.getElementById('modalContent');
const detailsButtons = document.querySelectorAll('.details-btn');
const closeModal = document.querySelector('.close-modal');

// Ouvrir modal avec contenu approprié
detailsButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const projectType = button.getAttribute('data-project');
    const detailsContent = document.getElementById(`${projectType}Details`).innerHTML;
    modalContent.innerHTML = detailsContent;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Empêcher le défilement
  });
});

// Fermer modal
if (closeModal) {
  closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Réactiver le défilement
  });
}

// Fermer modal en cliquant en dehors
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

// Formulaire de contact avec envoi d'email
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Méthode simple d'envoi d'e-mail via mailto (à remplacer par EmailJS)
    const mailtoLink = `mailto:pereiramarinafabienne@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`De: ${name} (${email})\n\n${message}`)}`;
    
    // Afficher le statut
    formStatus.innerHTML = '<div class="success-message">Message envoyé avec succès! Redirection...</div>';
    
    // Rediriger vers le client de messagerie
    setTimeout(() => {
      window.location.href = mailtoLink;
    }, 1000);
    
    // Réinitialiser le formulaire
    contactForm.reset();
    
    /* 
    // Pour une solution plus robuste avec EmailJS (à décommenter et configurer)
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
      from_name: name,
      from_email: email,
      subject: subject,
      message: message
    })
    .then(function() {
      formStatus.innerHTML = '<div class="success-message">Message envoyé avec succès!</div>';
      contactForm.reset();
    }, function(error) {
      formStatus.innerHTML = '<div class="error-message">Une erreur s\'est produite. Veuillez réessayer.</div>';
      console.log(error);
    });
    */
  });
}
