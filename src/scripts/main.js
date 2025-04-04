// Inicialização do AOS com configurações mais suaves
AOS.init({
  duration: 800,
  once: true,
  offset: 100,
  easing: "ease-out",
});

// Tema
function initTheme() {
  const themeToggle = document.getElementById("theme-toggle");
  const themeToggleMobile = document.getElementById("theme-toggle-mobile");
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  const currentTheme = localStorage.getItem("theme");
  const icon = themeToggle.querySelector("i");
  const iconMobile = themeToggleMobile.querySelector("i");

  // Define o tema claro como padrão se nenhum tema estiver salvo
  if (!currentTheme) {
    document.documentElement.setAttribute("data-theme", "light");
    icon.className = "fas fa-moon";
    iconMobile.className = "fas fa-moon";
  } else {
    document.documentElement.setAttribute("data-theme", currentTheme);
    if (currentTheme === "dark") {
      icon.className = "fas fa-sun";
      iconMobile.className = "fas fa-sun";
    } else {
      icon.className = "fas fa-moon";
      iconMobile.className = "fas fa-moon";
    }
  }

  function toggleTheme() {
    const theme = document.documentElement.getAttribute("data-theme");
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      icon.className = "fas fa-sun";
      iconMobile.className = "fas fa-sun";
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
      icon.className = "fas fa-moon";
      iconMobile.className = "fas fa-moon";
    }
  }

  themeToggle.addEventListener("click", toggleTheme);
  themeToggleMobile.addEventListener("click", toggleTheme);
}

// Menu Mobile
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay");
const mobileMenuLinks = document.querySelectorAll(".mobile-menu .nav-link");
const themeToggleMobile = document.getElementById("theme-toggle-mobile");

function toggleMobileMenu() {
  mobileMenu.classList.toggle("active");
  mobileMenuOverlay.classList.toggle("active");
  document.body.style.overflow = mobileMenu.classList.contains("active")
    ? "hidden"
    : "";
}

mobileMenuBtn.addEventListener("click", toggleMobileMenu);
mobileMenuOverlay.addEventListener("click", toggleMobileMenu);

mobileMenuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    toggleMobileMenu();
  });
});

// Sincronizar tema entre botões desktop e mobile
themeToggleMobile.addEventListener("click", () => {
  const isDark = document.body.getAttribute("data-theme") === "dark";
  document.body.setAttribute("data-theme", isDark ? "light" : "dark");
  themeToggleMobile.querySelector("i").className = isDark
    ? "fas fa-sun"
    : "fas fa-moon";
  themeToggle.querySelector("i").className = isDark
    ? "fas fa-sun"
    : "fas fa-moon";
});

// Efeito Parallax no Hero e Grid
const hero = document.getElementById("hero");
const grid = document.querySelector(".grid-overlay");

window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  hero.style.backgroundPositionY = scrolled * 0.5 + "px";
  grid.style.transform = `translateY(${scrolled * 0.2}px)`;
});

// Contador de números
const stats = document.querySelectorAll(".stat-number");
const observerOptions = {
  threshold: 0.5,
};

const startCounter = (element) => {
  const target = parseInt(element.getAttribute("data-target"));
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const updateCounter = () => {
    current += step;
    if (current < target) {
      element.textContent = Math.floor(current);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };

  updateCounter();
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      startCounter(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

stats.forEach((stat) => observer.observe(stat));

// Efeito de hover nos cards
const cards = document.querySelectorAll(".card");
cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    card.querySelector(".card-glow").style.opacity = "0.2";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)";
    card.querySelector(".card-glow").style.opacity = "0";
  });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerOffset = 100;
      const elementPosition = target.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Navbar Scroll Effect
const header = document.querySelector(".header");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    header.classList.remove("scroll-up");
    return;
  }

  if (currentScroll > lastScroll && !header.classList.contains("scroll-down")) {
    header.classList.remove("scroll-up");
    header.classList.add("scroll-down");
  } else if (
    currentScroll < lastScroll &&
    header.classList.contains("scroll-down")
  ) {
    header.classList.remove("scroll-down");
    header.classList.add("scroll-up");
  }

  lastScroll = currentScroll;
});

// Popup de Boas-vindas
const welcomePopup = document.querySelector(".welcome-popup");

// Mostra o popup após 10 segundos
setTimeout(() => {
  welcomePopup.classList.add("active");
  image.png;
}, 5000);

// Fecha o popup ao clicar no botão de acessar
const accessButton = welcomePopup.querySelector(".btn-primary");
accessButton.addEventListener("click", () => {
  welcomePopup.classList.remove("active");
});

// Fecha o popup ao clicar fora dele
welcomePopup.addEventListener("click", (e) => {
  if (e.target === welcomePopup) {
    welcomePopup.classList.remove("active");
  }
});
