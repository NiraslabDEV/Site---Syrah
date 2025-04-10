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

  // Verifica se há um tema no localStorage
  const currentTheme = localStorage.getItem("theme");

  // Se não houver tema salvo, define como light por padrão
  if (!currentTheme) {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    if (themeToggleMobile)
      themeToggleMobile.innerHTML = '<i class="fas fa-moon"></i>';
  } else {
    // Se houver um tema salvo, aplica ele
    document.documentElement.setAttribute("data-theme", currentTheme);
    if (currentTheme === "dark") {
      if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      if (themeToggleMobile)
        themeToggleMobile.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      if (themeToggleMobile)
        themeToggleMobile.innerHTML = '<i class="fas fa-moon"></i>';
    }
  }
}

// Função para alternar o tema
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  // Atualiza o ícone do botão com base no novo tema
  const themeToggle = document.getElementById("theme-toggle");
  const themeToggleMobile = document.getElementById("theme-toggle-mobile");

  if (newTheme === "dark") {
    if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    if (themeToggleMobile)
      themeToggleMobile.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    if (themeToggleMobile)
      themeToggleMobile.innerHTML = '<i class="fas fa-moon"></i>';
  }
}

// Função para manipular o menu mobile
function toggleMobileMenu() {
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay");

  if (mobileMenu && mobileMenuOverlay) {
    mobileMenu.classList.toggle("active");
    mobileMenuOverlay.classList.toggle("active");
    document.body.style.overflow = mobileMenu.classList.contains("active")
      ? "hidden"
      : "";
  }
}

// Função para configurar os dropdowns do menu mobile
function setupMobileDropdowns() {
  const mobileNavItems = document.querySelectorAll(".mobile-menu .nav-item");

  mobileNavItems.forEach((item) => {
    const toggleLink = item.querySelector(".nav-link.dropdown-toggle");
    if (toggleLink) {
      toggleLink.addEventListener("click", (e) => {
        e.preventDefault(); // Previne fechar o menu inteiro
        item.classList.toggle("active"); // Alterna a classe active no nav-item pai

        // Alterna o ícone de seta
        const icon = toggleLink.querySelector(".dropdown-icon");
        if (icon) {
          if (item.classList.contains("active")) {
            icon.classList.remove("fa-chevron-down");
            icon.classList.add("fa-chevron-up");
          } else {
            icon.classList.remove("fa-chevron-up");
            icon.classList.add("fa-chevron-down");
          }
        }

        // Fecha outros dropdowns abertos
        mobileNavItems.forEach((otherItem) => {
          if (otherItem !== item && otherItem.classList.contains("active")) {
            otherItem.classList.remove("active");
            const otherIcon = otherItem.querySelector(".dropdown-icon");
            if (otherIcon) {
              otherIcon.classList.remove("fa-chevron-up");
              otherIcon.classList.add("fa-chevron-down");
            }
          }
        });
      });
    }
  });

  // Fecha o menu mobile APENAS se clicar em um link que NÃO seja um dropdown toggle
  const mobileMenuLinks = document.querySelectorAll(".mobile-menu .nav-link");
  mobileMenuLinks.forEach((link) => {
    if (!link.classList.contains("dropdown-toggle")) {
      link.addEventListener("click", () => {
        // Verifica se o menu está ativo antes de tentar fechar
        const mobileMenu = document.querySelector(".mobile-menu");
        if (mobileMenu && mobileMenu.classList.contains("active")) {
          toggleMobileMenu();
        }
      });
    }
  });

  // Garante que os dropdown-items também fechem o menu
  const mobileDropdownItems = document.querySelectorAll(
    ".mobile-menu .dropdown-item"
  );
  mobileDropdownItems.forEach((item) => {
    item.addEventListener("click", () => {
      const mobileMenu = document.querySelector(".mobile-menu");
      if (mobileMenu && mobileMenu.classList.contains("active")) {
        toggleMobileMenu();
      }
    });
  });
}

// Manipular FAQ
function initFaq() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    if (question) {
      question.addEventListener("click", () => {
        // Toggle active class on the clicked item
        item.classList.toggle("active");

        // Close other items when one is opened
        faqItems.forEach((otherItem) => {
          if (otherItem !== item && otherItem.classList.contains("active")) {
            otherItem.classList.remove("active");
          }
        });
      });
    }
  });
}

// Inicialização principal quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", function () {
  // Inicializa o tema
  initTheme();

  // Adicionar evento de clique para alternar o tema
  const themeToggle = document.getElementById("theme-toggle");
  const themeToggleMobile = document.getElementById("theme-toggle-mobile");

  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  if (themeToggleMobile) {
    themeToggleMobile.addEventListener("click", toggleTheme);
  }

  // Configurar botão de menu mobile
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay");

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", toggleMobileMenu);
  }

  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener("click", toggleMobileMenu);
  }

  // Configurar dropdowns do menu mobile
  setupMobileDropdowns();

  // Inicializar FAQ se existir na página
  if (document.querySelector(".faq-item")) {
    initFaq();
  }

  // Contador de números estatísticos
  const statNumbers = document.querySelectorAll(".stat-number");
  if (statNumbers.length > 0) {
    statNumbers.forEach((stat) => {
      const target = parseInt(stat.getAttribute("data-target"));
      if (!isNaN(target)) {
        let count = 0;
        const increment = target / 100;

        const updateCount = () => {
          if (count < target) {
            count += increment;
            stat.innerText = Math.floor(count);
            setTimeout(updateCount, 10);
          } else {
            stat.innerText = target;
          }
        };

        updateCount();
      }
    });
  }

  // Initialize AOS
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      once: true,
    });
  }
});

// Efeito Parallax no Hero e Grid (se existirem)
window.addEventListener("scroll", () => {
  const hero = document.getElementById("hero");
  const grid = document.querySelector(".grid-overlay");

  if (hero) {
    const scrolled = window.pageYOffset;
    if (hero.style) {
      hero.style.backgroundPositionY = scrolled * 0.5 + "px";
    }

    if (grid && grid.style) {
      grid.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
  }
});
