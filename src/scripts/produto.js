// Formulário de contato
const contactForm = document.querySelector(".contact-form form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Coleta os dados do formulário
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    // Aqui você pode adicionar a lógica para enviar os dados para seu backend
    console.log("Dados do formulário:", data);

    // Mostra mensagem de sucesso
    alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
    this.reset();
  });
}

// Animação dos cards de preço ao scroll
const pricingCards = document.querySelectorAll(".pricing-card");
const observerOptions = {
  threshold: 0.2,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

pricingCards.forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  card.style.transition = "all 0.5s ease-out";
  observer.observe(card);
});

// Animação dos cards de manutenção
const maintenanceCards = document.querySelectorAll(".maintenance-card");
maintenanceCards.forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  card.style.transition = "all 0.5s ease-out";
  observer.observe(card);
});

// Toggle de tema (claro/escuro)
const themeToggle = document.querySelector(".theme-toggle");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    const isLight = document.body.classList.contains("light-theme");
    localStorage.setItem("theme", isLight ? "light" : "dark");
  });
}

// Verifica tema salvo
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  document.body.classList.add("light-theme");
}

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});
