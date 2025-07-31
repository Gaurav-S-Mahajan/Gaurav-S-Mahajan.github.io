// Theme toggle, accessibility, typewriter, nav, back-to-top, fade-in, contact form

// --------------- THEME TOGGLE ---------------
const themeBtn = document.getElementById('themeToggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const storedTheme = localStorage.getItem('theme');
const docBody = document.body;

function setTheme(theme) {
  if (theme === 'light') {
    docBody.classList.add('light');
    localStorage.setItem('theme', 'light');
  } else {
    docBody.classList.remove('light');
    localStorage.setItem('theme', 'dark');
  }
}
if (storedTheme) {
  setTheme(storedTheme);
} else {
  setTheme(prefersDark ? 'dark' : 'light');
}
themeBtn.addEventListener('click', () => {
  setTheme(docBody.classList.contains('light') ? 'dark' : 'light');
});

// --------------- MOBILE NAV ---------------
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// --------------- TYPEWRITER ---------------
const typewriterEl = document.getElementById('typewriter');
const titles = [
  "Cybersecurity Analyst",
  "Ethical Hacker",
  "Risk Assessor",
  "Digital Forensics Specialist",
  "Security Consultant"
];
let twIdx = 0, charIdx = 0, typing = true;
function typeLoop() {
  if (!typewriterEl) return;
  let current = titles[twIdx];
  if (typing) {
    typewriterEl.textContent = current.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      typing = false;
      setTimeout(typeLoop, 1200);
      return;
    }
    setTimeout(typeLoop, 80);
  } else {
    if (charIdx > 0) {
      typewriterEl.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      setTimeout(typeLoop, 30);
    } else {
      typing = true;
      twIdx = (twIdx + 1) % titles.length;
      setTimeout(typeLoop, 300);
    }
  }
}
if (typewriterEl) typeLoop();

// --------------- BACK TO TOP BUTTON ---------------
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 260) {
    backToTop.hidden = false;
  } else {
    backToTop.hidden = true;
  }
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// --------------- FADE-IN ON SCROLL ---------------
function fadeInOnScroll() {
  document.querySelectorAll('.fadein').forEach(el => {
    const rect = el.getBoundingClientRect();
    if(rect.top < window.innerHeight - 60) el.style.animationPlayState = 'running';
  });
}
window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('load', fadeInOnScroll);

// --------------- CONTACT FORM HANDLING ---------------
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const status = document.getElementById('formStatus');
    status.textContent = '';
    const name = form.user_name.value.trim();
    const email = form.user_email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      status.textContent = "All fields are required.";
      status.style.color = "#EA4335";
      return;
    }
    if (!/^[\w\.\-]+@[\w\.\-]+\.[a-zA-Z]{2,}$/.test(email)) {
      status.textContent = "Please enter a valid email.";
      status.style.color = "#EA4335";
      return;
    }
    status.textContent = "Sending...";
    status.style.color = "#19c3ff";

    // EmailJS (replace with your actual public key/service/template or fallback to mailto)
    if (window.emailjs) {
      emailjs.init('JouKYB9ujAG_LF_2E');
      emailjs.sendForm('service_nzlzn6b', 'template_1sqn4tu', this)
        .then(function() {
          status.textContent = "Message sent!";
          status.style.color = "#19c3ff";
          form.reset();
        }, function() {
          status.textContent = "Failed to send. Please try again.";
          status.style.color = "#EA4335";
        });
    } else {
      window.location = `mailto:gauravmofficial99@gmail.com?subject=Contact from Portfolio&body=${encodeURIComponent(message)}`;
    }
  });
}

// --------------- ACCESSIBILITY: FOCUS VISIBLE ---------------
document.body.addEventListener('keydown', function(e) {
  if (e.key === 'Tab') document.body.classList.add('user-is-tabbing');
});
document.body.addEventListener('mousedown', function() {
  document.body.classList.remove('user-is-tabbing');
});

// --------------- FOOTER YEAR ---------------
const yearSpan = document.getElementById('year');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();