// Mobile nav toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      links.classList.toggle("open");
      const expanded = links.classList.contains("open");
      toggle.setAttribute("aria-expanded", String(expanded));
    });
  }

  // Highlight current nav link
  const path = window.location.pathname.replace(/\/index\.html$/, "/");
  document.querySelectorAll(".nav-links a").forEach((a) => {
    const target = new URL(a.href, window.location.href).pathname.replace(/\/index\.html$/, "/");
    if (target === path) a.classList.add("active");
  });

  // Accordion (Hometown page)
  document.querySelectorAll(".accordion-header").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.closest(".accordion-item").classList.toggle("open");
      const panel = btn.nextElementSibling;
      panel.style.maxHeight = panel.style.maxHeight ? "" : panel.scrollHeight + "px";
    });
  });

  // Filter tabs (Food / Tourist pages)
  document.querySelectorAll(".filter-row").forEach((row) => {
    const buttons = row.querySelectorAll(".filter-btn");
    const targetGrid = document.querySelector(row.dataset.target);
    if (!targetGrid) return;
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const filter = btn.dataset.filter;
        targetGrid.querySelectorAll("[data-category]").forEach((item) => {
          const show = filter === "all" || item.dataset.category === filter;
          item.style.display = show ? "" : "none";
        });
      });
    });
  });

  // Back to top button
  const backToTop = document.getElementById("back-to-top");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      backToTop.classList.toggle("visible", window.scrollY > 400);
    });
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Dark / light theme toggle, remembered per browser
  const themeToggle = document.querySelector(".theme-toggle");
  if (themeToggle) {
    const applyTheme = (theme) => {
      if (theme) document.documentElement.setAttribute("data-theme", theme);
      else document.documentElement.removeAttribute("data-theme");
      themeToggle.classList.toggle("is-dark", theme === "dark");
    };
    let saved = null;
    try { saved = localStorage.getItem("theme"); } catch (e) { /* storage unavailable */ }
    applyTheme(saved);
    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem("theme", next); } catch (e) { /* ignore */ }
    });
  }

  // Footer year
  document.querySelectorAll(".current-year").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
});
