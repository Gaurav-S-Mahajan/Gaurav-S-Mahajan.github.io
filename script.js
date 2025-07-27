// Dark/Light Mode Toggle with localStorage persistence
document.addEventListener("DOMContentLoaded", function() {
  // Mode toggle
  const modeToggle = document.getElementById("modeToggle");
  const modeIcon = document.getElementById("modeIcon");
  const body = document.body;

  // Set mode from localStorage
  if(localStorage.getItem('portfolioMode') === 'light') {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    modeIcon.textContent = "☀️";
  }
  modeToggle.addEventListener("click", function() {
    if (body.classList.contains("dark-mode")) {
      body.classList.remove("dark-mode");
      body.classList.add("light-mode");
      modeIcon.textContent = "☀️";
      localStorage.setItem('portfolioMode', 'light');
    } else {
      body.classList.remove("light-mode");
      body.classList.add("dark-mode");
      modeIcon.textContent = "🌙";
      localStorage.setItem('portfolioMode', 'dark');
    }
  });

  // Hamburger menu for mobile
  const menuToggle = document.getElementById("menuToggle");
  const menu = document.getElementById("menu");
  menuToggle.addEventListener("click", function() {
    menu.classList.toggle("menu-open");
  });
  // Close menu on link click (mobile)
  Array.from(menu.querySelectorAll("a")).forEach(link => {
    link.addEventListener("click", () => {
      if(window.innerWidth < 900) menu.classList.remove("menu-open");
    });
  });

  // Fade-in on scroll
  const fadeEls = document.querySelectorAll('.fadein');
  function fadeInOnScroll() {
    fadeEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if(rect.top < window.innerHeight - 40) el.style.animationPlayState = 'running';
    });
  }
  window.addEventListener('scroll', fadeInOnScroll);
  fadeInOnScroll();

  // EmailJS Contact Form
  emailjs.init('JouKYB9ujAG_LF_2E'); // Public Key
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('contact-submit');
  if(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const status = document.getElementById('form-status');
      status.textContent = '';
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      // Simple validation
      if(!form.user_name.value.trim() || !form.user_email.value.trim() || !form.message.value.trim()) {
        status.textContent = "All fields are required.";
        status.style.color = "#EA4335";
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
        return;
      }

      emailjs.sendForm('service_nzlzn6b', 'template_1sqn4tu', this)
        .then(function() {
          status.textContent = "Message sent successfully!";
          status.style.color = "#19c3ff";
          form.reset();
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message';
        }, function(error) {
          status.textContent = "Failed to send message. Please try again.";
          status.style.color = "#EA4335";
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message';
        });
    });
  }
});