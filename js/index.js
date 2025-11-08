document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');
  const yearEl = document.getElementById('year');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const contactForm = document.getElementById('contactForm');

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- Navbar Scroll Effect ---
  function handleNavScroll() {
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  handleNavScroll();
  window.addEventListener('scroll', handleNavScroll);

  // --- Mobile Navigation Toggle ---
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = navToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });

    document.querySelectorAll('#navLinks a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768 && navLinks && navToggle) {
          navLinks.classList.remove('active');
          const icon = navToggle.querySelector('i');
          if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
          }
        }
      });
    });
  }

  // --- Typing Effect for Hero Title ---
  const typingEl = document.querySelector('.typing');
  if (typingEl) {
    const fullText = typingEl.textContent;
    typingEl.textContent = '';
    let idx = 0;
    function type() {
      if (idx < fullText.length) {
        typingEl.textContent = fullText.slice(0, idx + 1);
        idx++;
        setTimeout(type, 50);
      }
    }
    setTimeout(type, 1000);
  }

  // --- Reveal on Scroll Animation ---
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length > 0) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    reveals.forEach(r => obs.observe(r));
  }

  // --- Gallery Lightbox ---
  const lightbox = document.getElementById('lightbox');
  const lbImage = document.getElementById('lbImage');
  const lbClose = document.getElementById('lbClose');

  const galleryImages = document.querySelectorAll('.gallery-item img');
  if (galleryImages.length > 0 && lightbox && lbImage) {
    galleryImages.forEach(img => {
      img.addEventListener('click', () => {
        lbImage.src = img.src;
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
      });
    });
  }

  if (lbClose && lightbox) {
    lbClose.addEventListener('click', () => {
      lightbox.classList.remove('active');
      lightbox.setAttribute('aria-hidden', 'true');
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // --- Testimonial Slider ---
  const slides = document.querySelectorAll('.testi-item');
  const prevBtn = document.getElementById('prevTesti');
  const nextBtn = document.getElementById('nextTesti');
  let cur = 0;

  function showSlide(n) {
    if (slides.length === 0) return;
    slides.forEach((s, i) => s.classList.toggle('active', i === n));
  }

  showSlide(cur);

  if (prevBtn && nextBtn && slides.length > 0) {
    prevBtn.addEventListener('click', () => {
      cur = (cur - 1 + slides.length) % slides.length;
      showSlide(cur);
    });
    nextBtn.addEventListener('click', () => {
      cur = (cur + 1) % slides.length;
      showSlide(cur);
    });
  }

  if (slides.length > 0) {
    setInterval(() => {
      cur = (cur + 1) % slides.length;
      showSlide(cur);
    }, 6000);
  }

  // --- Back to Top Button ---
  window.addEventListener('scroll', () => {
    if (!backToTop) return;
    if (window.scrollY > 400) backToTop.classList.add('show');
    else backToTop.classList.remove('show');
  });

  if (backToTop) {
    backToTop.addEventListener('click', () =>
      window.scrollTo({ top: 0, behavior: 'smooth' })
    );
  }

  // --- Contact Form Submission (Example) ---
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(contactForm);
      const name = data.get('name');
      const phone = data.get('phone');
      const pickup = data.get('pickup');
      const destination = data.get('destination');
      const message = data.get('message');

      const whatsappMsg =
        `Halo Adventora, saya ${name} ingin memesan perjalanan.\n\n` +
        `No. HP: ${phone}\n` +
        `Penjemputan: ${pickup}\n` +
        `Tujuan: ${destination}\n` +
        `Catatan: ${message || 'Tidak ada catatan tambahan.'}\n\n` +
        `Mohon informasinya lebih lanjut. Terima kasih!`;

      const whatsappURL = `https://wa.me/6281217241263?text=${encodeURIComponent(whatsappMsg)}`;

      window.open(whatsappURL, '_blank');
      alert(`Terima kasih, ${name}! Kami akan segera menghubungi Anda melalui WhatsApp untuk konfirmasi pesanan.`);
      contactForm.reset();
    });
  }
});

  // --- Gallery Auto Slider ---
const galleryTrack = document.querySelector('.slider-track');
const gallerySlides = document.querySelectorAll('.slide');
let galleryIndex = 0;

if (galleryTrack && gallerySlides.length > 0) {
  function showGallerySlide(i) {
    if (i < 0) galleryIndex = gallerySlides.length - 1;
    else if (i >= gallerySlides.length) galleryIndex = 0;
    else galleryIndex = i;
    galleryTrack.style.transform = `translateX(-${galleryIndex * 100}%)`;
  }

  // Auto geser tiap 4 detik
  setInterval(() => {
    galleryIndex++;
    showGallerySlide(galleryIndex);
  }, 4000);
}
