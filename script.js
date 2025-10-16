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

// ===============================
// Tech Stack Slider
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const techList = [
    { name: "React", img: "images/reactjs.png" },
    { name: "NestJS", img: "images/nestjs.png" },
    { name: "MongoDB", img: "images/mongodb.png" },
    { name: "Firebase", img: "images/firebase.png" },
    { name: "Oracle OCI", img: "images/oracle.png" },
    { name: "GitHub", img: "images/github.png" },
    { name: "JavaScript", img: "images/javascript.png" },
    { name: "WordPress", img: "images/wordpress.png" },
    { name: "Docker", img: "images/docker.png" },
    { name: "Kubernetes", img: "images/kubernetes.png" },
    { name: "AWS", img: "images/aws.png" },
    { name: "Azure", img: "images/azure.png" },
    { name: "Linux", img: "images/linux.png" },
    { name: "Node.js", img: "images/nodejs.png" },
    { name: "Python", img: "images/python.png" },
    { name: "SQL", img: "images/sql.png" }
  ];

  const sliderTrack = document.querySelector(".slider-track");
  const nextBtn = document.querySelector(".slide-btn.next");
  const prevBtn = document.querySelector(".slide-btn.prev");
  if (!sliderTrack || !nextBtn || !prevBtn) return;

  // Create cards
  techList.forEach(tech => {
    const card = `<div class="tech-card">
      <img src="${tech.img}" alt="${tech.name}" />
      <span>${tech.name}</span>
    </div>`;
    sliderTrack.insertAdjacentHTML("beforeend", card);
  });

  // Duplicate track for seamless loop
  sliderTrack.innerHTML += sliderTrack.innerHTML;

  const trackWidth = sliderTrack.scrollWidth / 2;
  const cardWidth = sliderTrack.querySelector('.tech-card').offsetWidth + 20; // card + gap
  let offset = 0;
  let isDragging = false;
  let startX;
  let animationFrame;
  const speed = 1; // px/frame

  // Continuous auto scroll
  const animate = () => {
    offset -= speed;
    if (-offset >= trackWidth) offset = 0; // seamless loop
    sliderTrack.style.transform = `translateX(${offset}px)`;
    animationFrame = requestAnimationFrame(animate);
  };
  animate();

  // Pause on hover
  sliderTrack.parentElement.addEventListener("mouseenter", () => cancelAnimationFrame(animationFrame));
  sliderTrack.parentElement.addEventListener("mouseleave", () => animate());

  // Drag/Swipe
  const startDrag = (pageX) => { isDragging = true; startX = pageX - offset; cancelAnimationFrame(animationFrame); };
  const moveDrag = (pageX) => { if (!isDragging) return; offset = pageX - startX; if (-offset >= trackWidth) offset += trackWidth; if (offset > 0) offset -= trackWidth; sliderTrack.style.transform = `translateX(${offset}px)`; };
  const endDrag = () => { isDragging = false; animate(); };

  sliderTrack.addEventListener("mousedown", e => startDrag(e.pageX));
  sliderTrack.addEventListener("mousemove", e => moveDrag(e.pageX));
  sliderTrack.addEventListener("mouseup", endDrag);
  sliderTrack.addEventListener("mouseleave", endDrag);

  sliderTrack.addEventListener("touchstart", e => startDrag(e.touches[0].pageX));
  sliderTrack.addEventListener("touchmove", e => moveDrag(e.touches[0].pageX));
  sliderTrack.addEventListener("touchend", endDrag);

  // Arrow buttons
  nextBtn.addEventListener("click", () => {
    cancelAnimationFrame(animationFrame);
    offset -= cardWidth;
    if (-offset >= trackWidth) offset += trackWidth;
    sliderTrack.style.transform = `translateX(${offset}px)`;
    animate();
  });

  prevBtn.addEventListener("click", () => {
    cancelAnimationFrame(animationFrame);
    offset += cardWidth;
    if (offset > 0) offset -= trackWidth;
    sliderTrack.style.transform = `translateX(${offset}px)`;
    animate();
  });
});
