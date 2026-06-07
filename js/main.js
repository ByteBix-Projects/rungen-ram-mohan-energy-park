/**
 * RUNGEN RAMMOHAN ENERGY PARK - Global JavaScript
 * Manages Dynamic Layout Components, Theme Toggling, Animations, and Interactivity
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Global Header & Footer
  initLayout();

  // 2. Initialize Theme Control (Dark/Light Mode)
  initTheme();

  // 3. Initialize Mobile Navigation Menu Toggle
  initMobileMenu();

  // 4. Initialize Scroll Reveal Animations
  initScrollReveal();

  // 5. Initialize Contact Form Handlers (if present on the page)
  initContactForm();
});

/**
 * Renders consistent navbar and footer across all pages
 */
function initLayout() {
  const header = document.getElementById("global-header");
  const footer = document.getElementById("global-footer");
  const currentPath = window.location.pathname.split("/").pop() || "index.html";

  // Navigation Links Definition
  const navLinksData = [
    { text: "Home", href: "index.html" },
    { text: "About", href: "about.html" },
    { text: "Products", href: "products.html" },
    { text: "Technology", href: "technology.html" },
    { text: "Leadership", href: "leadership.html" },
    { text: "Markets", href: "markets.html" },
    { text: "Sustainability", href: "sustainability.html" },
    { text: "Contact", href: "contact.html" }
  ];

  // Render Header Navbar
  if (header) {
    let navLinksHtml = "";
    navLinksData.forEach(link => {
      const isActive = currentPath === link.href ? "active" : "";
      navLinksHtml += `<li><a href="${link.href}" class="${isActive}">${link.text}</a></li>`;
    });

    header.innerHTML = `
      <div class="container navbar">
        <a href="index.html" class="logo">
          <div class="logo-icon">R</div>
          <span>RUNGEN RAMMOHAN ENERGY PARK</span>
        </a>
        <nav>
          <ul class="nav-links" id="nav-links">
            ${navLinksHtml}
          </ul>
        </nav>
        <div class="controls">
          <button class="theme-toggle-btn" id="theme-toggle" aria-label="Toggle dark/light mode">
            <span class="theme-icon">🌙</span>
          </button>
          <button class="mobile-toggle" id="mobile-menu-toggle" aria-label="Toggle menu">
            ☰
          </button>
        </div>
      </div>
    `;
  }

  // Render Footer
  if (footer) {
    footer.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="index.html" class="logo" style="margin-bottom: 16px;">
              <div class="logo-icon">R</div>
              <span style="font-size: 1.25rem;">RUNGEN RAMMOHAN ENERGY PARK</span>
            </a>
            <p>Integrated innovative energy and power producer manufacturing next-generation clean fuels, green hydrogen, and biofuels.</p>
          </div>
          <div class="footer-col">
            <h4>Quick Links</h4>
            <ul class="footer-links">
              <li><a href="index.html">Home</a></li>
              <li><a href="about.html">About Us</a></li>
              <li><a href="products.html">Products & Solutions</a></li>
              <li><a href="technology.html">Technology & Innovation</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Focus Areas</h4>
            <ul class="footer-links">
              <li><a href="leadership.html">Leadership Profiles</a></li>
              <li><a href="markets.html">Markets & Partnerships</a></li>
              <li><a href="sustainability.html">Sustainability & ESG</a></li>
              <li><a href="contact.html">Contact Us</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Contact Info</h4>
            <ul class="footer-links" style="color: var(--text-secondary)">
              <li><strong>Headquarters:</strong> Srikakulam District, Andhra Pradesh, India</li>
              <li><strong>Email:</strong> info@rungenrammohanenergy.com</li>
              <li><strong>Inquiries:</strong> partner@rungenrammohanenergy.com</li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2026 RUNGEN RAMMOHAN ENERGY PARK PRIVATE LIMITED. All rights reserved.</p>
          <p>CIN: U40106AP2021PTC118123 | Registered Valuer and Scientific Advisor Approved</p>
        </div>
      </div>
    `;
  }
}

/**
 * Manages theme setting (Dark/Light) and persistence in localStorage
 */
function initTheme() {
  const themeToggleBtn = document.getElementById("theme-toggle");
  if (!themeToggleBtn) return;

  const themeIcon = themeToggleBtn.querySelector(".theme-icon");

  // Load saved theme, default to dark
  const currentTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", currentTheme);
  
  if (themeIcon) {
    themeIcon.textContent = currentTheme === "dark" ? "🌙" : "☀️";
  }

  themeToggleBtn.addEventListener("click", () => {
    let theme = document.documentElement.getAttribute("data-theme");
    let newTheme = "dark";

    if (theme === "dark") {
      newTheme = "light";
    }

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    if (themeIcon) {
      themeIcon.textContent = newTheme === "dark" ? "🌙" : "☀️";
    }
  });
}

/**
 * Handles mobile navbar slide-out toggle
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    if (navLinks.classList.contains("active")) {
      toggleBtn.textContent = "✕";
    } else {
      toggleBtn.textContent = "☰";
    }
  });

  // Close mobile menu on clicking links or outside
  document.addEventListener("click", (e) => {
    if (!toggleBtn.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove("active");
      toggleBtn.textContent = "☰";
    }
  });
}

/**
 * Uses Intersection Observer to fade in/slide in components as users scroll
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll(".scroll-reveal");
  if (revealElements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target); // Trigger only once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach(el => observer.observe(el));
}

/**
 * Simulated Contact Form Submission
 */
function initContactForm() {
  const contactForm = document.getElementById("contactForm");
  const formAlert = document.getElementById("formAlert");

  if (!contactForm || !formAlert) return;

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Set loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `Sending... <span style="display:inline-block; animation:spin 1s linear infinite;">🔄</span>`;

    // Simulate server request
    setTimeout(() => {
      // Reset form
      contactForm.reset();
      
      // Reset button
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;

      // Show alert
      formAlert.className = "form-alert success";
      formAlert.innerHTML = `<strong>Success!</strong> Your message has been sent. Our partnerships representative will contact you shortly.`;
      
      // Auto-hide alert after 8 seconds
      setTimeout(() => {
        formAlert.style.display = "none";
      }, 8000);
    }, 1500);
  });
}

// Inline Spinner CSS injection for dynamic loading states
const style = document.createElement('style');
style.innerHTML = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);
