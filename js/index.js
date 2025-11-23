document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. Navbar & Mobile Menu
  ========================================================================== */
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  // Navbar Scroll Effect
  if (navbar) {
    const handleScroll = () => {
      navbar.classList.toggle("scrolled", window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
  }

  // Toggle Mobile Menu
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      const icon = navToggle.querySelector("i");
      if (icon) {
        if (navLinks.classList.contains("open")) {
          icon.classList.replace("fa-bars", "fa-times");
        } else {
          icon.classList.replace("fa-times", "fa-bars");
        }
      }
    });
  }

  // Close menu when clicking a link
  if (navLinks) {
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        if (navToggle) {
          const icon = navToggle.querySelector("i");
          if (icon) icon.classList.replace("fa-times", "fa-bars");
        }
      });
    });
  }

  /* ==========================================================================
     Dropdowns (safe checks)
  ========================================================================== */
  document.querySelectorAll('.dropdown-toggle').forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation(); // agar klik tidak menutup dropdown lain
      const panel = button.nextElementSibling;
      if (!panel) return; // kalau panel tidak ditemukan, hentikan

      // tutup panel lain
      document.querySelectorAll('.dropdown-panel').forEach(p => {
        if (p !== panel) p.classList.remove('show');
      });
      document.querySelectorAll('.dropdown-toggle').forEach(b => {
        if (b !== button) b.classList.remove('active');
      });

      // toggle panel ini
      panel.classList.toggle('show');
      button.classList.toggle('active');
    });
  });

  // Tutup semua dropdown kalau klik di luar
  window.addEventListener('click', () => {
    document.querySelectorAll('.dropdown-panel').forEach(panel => panel.classList.remove('show'));
    document.querySelectorAll('.dropdown-toggle').forEach(b => b.classList.remove('active'));
  });

  /* ==========================================================================
     2. Reveal on Scroll (IntersectionObserver)
  ========================================================================== */
  const revealItems = document.querySelectorAll('.reveal, .reveal-staggered');
  if ("IntersectionObserver" in window && revealItems.length > 0) {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealItems.forEach(el => revealObserver.observe(el));
  }

  /* ==========================================================================
     3. Number Counter
  ========================================================================== */
  const counterElement = document.querySelector('.count-number');
  const duration = 3000;

  if (counterElement) {
    const startCounter = (el) => {
      let current = 0;
      const target = parseInt(el.dataset.target) || 0;
      const increment = target / (duration / 16);

      const update = () => {
        current += increment;
        if (current < target) {
          el.textContent = Math.ceil(current).toLocaleString('id-ID');
          requestAnimationFrame(update);
        } else {
          el.textContent = target.toLocaleString('id-ID');
        }
      };
      requestAnimationFrame(update);
    };

    const counterObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startCounter(counterElement);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    const trustBadge = counterElement.closest('.trust-badge');
    if (trustBadge) counterObserver.observe(trustBadge);
  }

  /* ==========================================================================
     4. Testimonial Slider (Auto Slide)
  ========================================================================== */
  const slider = document.getElementById('testiSlider');

  if (slider) {
    const items = slider.querySelectorAll('.testi-item');
    let idx = 0;

    const showSlide = () => {
      items.forEach(item => item.classList.remove("active"));
      if (items[idx]) items[idx].classList.add("active");
    };

    setInterval(() => {
      idx = (idx + 1) % items.length;
      showSlide();
    }, 5000);

    showSlide();
  }

  /* ==========================================================================
     5. Typing Effect
  ========================================================================== */
  const typing = document.querySelector(".typing-target");

  if (typing) {
    const text = typing.textContent.trim();
    typing.textContent = "";
    let i = 0;

    const type = () => {
      if (i < text.length) {
        typing.textContent += text.charAt(i);
        i++;
        setTimeout(type, 60);
      }
    };

    type();
  }

  /* ==========================================================================
     6. Fade-in Elements
  ========================================================================== */
  const fadeElements = document.querySelectorAll('.fade-in-right, .fade-in-left, .reveal');
  if (fadeElements.length > 0) {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("show");
      });
    });
    fadeElements.forEach(el => fadeObserver.observe(el));
  }

  /* ==========================================================================
     7. Gallery Slider
  ========================================================================== */
  const gallerySlider = document.getElementById('gallerySlider');
  if (gallerySlider) {
    const slides = gallerySlider.children;
    let index = 0;

    const rotate = () => {
      index = (index + 1) % slides.length;
      gallerySlider.style.transform = `translateX(-${index * 100}%)`;
    };

    setInterval(rotate, 3000);
  }

});