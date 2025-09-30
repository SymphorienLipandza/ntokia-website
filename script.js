// ===============================
// Mobile Menu Toggle (ton code actuel)
// ===============================
const menuToggle = document.getElementById('menuToggle');
const navList = document.getElementById('mainNav');

menuToggle.addEventListener('click', () => {
  navList.classList.toggle('show');
  menuToggle.setAttribute('aria-expanded', navList.classList.contains('show'));
});

// ===============================
// Scroll Reveal (étendu à toutes les sections)
// ===============================
const revealElements = document.querySelectorAll('.reveal');
const revealOnScroll = () => {
  const windowHeight = window.innerHeight;

  revealElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if(elementTop < windowHeight - 100){
      el.classList.add('visible');
    }
  });

  // Services détaillés
  const detailedServices = document.querySelectorAll('#services-detailed .service-detailed');
  detailedServices.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if(elementTop < windowHeight - 100){
      el.classList.add('visible');
    }
  });

  // Portfolio cards
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  portfolioCards.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if(elementTop < windowHeight - 100){
      el.classList.add('visible');
    }
  });

  // Blog cards
  const blogCards = document.querySelectorAll('.blog-card');
  blogCards.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if(elementTop < windowHeight - 100){
      el.classList.add('visible');
    }
  });

  // Testimonials (fade-in handled by carousel)
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ===============================
// Set Current Year
// ===============================
document.getElementById('year').textContent = new Date().getFullYear();

// ===============================
// Testimonials Carousel Auto-Rotate
// ===============================
const testimonials = document.querySelectorAll('.testimonial-card');
let currentTestimonial = 0;

const showTestimonial = index => {
  testimonials.forEach((card, i) => {
    card.classList.remove('visible');
    if (i === index) card.classList.add('visible');
  });
};

if (testimonials.length > 0) {
  showTestimonial(currentTestimonial); // show first initially

  setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
  }, 5000); // rotate every 5 seconds
}

// ===============================
// Contact Form Submission with Formspree
// ===============================
const contactForm = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    formMsg.textContent = "Envoi en cours...";
    formMsg.style.color = "blue";

    try {
      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        formMsg.textContent = "Merci ! Votre message a été envoyé.";
        formMsg.style.color = "green";
        contactForm.reset();
      } else {
        formMsg.textContent = "Oups ! Une erreur s'est produite. Réessayez.";
        formMsg.style.color = "red";
      }
    } catch (error) {
      formMsg.textContent = "Erreur réseau. Vérifiez votre connexion.";
      formMsg.style.color = "red";
    }
  });
}


