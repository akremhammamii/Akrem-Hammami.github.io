// ============================
// TYPING ANIMATION
// ============================
const titles = [
  "Software QA Engineer",
  "Test Automation Specialist",
  "Selenium / Java Expert",
  "ISTQB Certified Tester",
  "BDD & CI/CD Advocate"
];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById("typing-text");

function type() {
  const current = titles[titleIndex];
  if (isDeleting) {
    typingEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 50 : 80;

  if (!isDeleting && charIndex === current.length) {
    delay = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    titleIndex = (titleIndex + 1) % titles.length;
    delay = 400;
  }

  setTimeout(type, delay);
}
type();

// ============================
// NAVBAR SCROLL EFFECT
// ============================
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  // Scrolled class
  if (window.scrollY > 60) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Active nav link
  let current = "";
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) {
      current = section.getAttribute("id");
    }
  });
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// ============================
// HAMBURGER MENU
// ============================
const hamburger = document.getElementById("hamburger");
const navLinksContainer = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  navLinksContainer.classList.toggle("open");
});

navLinksContainer.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinksContainer.classList.remove("open");
  });
});

// ============================
// SCROLL REVEAL
// ============================
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
);

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// ============================
// SKILL BARS ANIMATION
// ============================
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll(".skill-fill").forEach(bar => {
          const width = bar.getAttribute("data-width");
          setTimeout(() => {
            bar.style.width = width + "%";
          }, 200);
        });
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".skill-category").forEach(cat => skillObserver.observe(cat));

// ============================
// SMOOTH ANCHOR SCROLLING
// ============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ============================
// PROJECT CARD GLOW FOLLOW MOUSE
// ============================
document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const glow = card.querySelector(".project-glow");
    if (glow) {
      glow.style.left = `${x - 100}px`;
      glow.style.top = `${y - 100}px`;
    }
  });
});

// ============================
// STAGGER REVEAL FOR GRIDS
// ============================
document.querySelectorAll(".skills-grid .skill-category").forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.1}s`;
});
document.querySelectorAll(".projects-grid .project-card").forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.12}s`;
});
document.querySelectorAll(".contact-card").forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.1}s`;
});
