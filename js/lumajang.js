/* js/lumajang.js */

document.addEventListener('DOMContentLoaded', function() {
    
    // ----------------------------------------------------
    // 1. NAVIGASI MOBILE TOGGLE & HEADER SCROLL EFFECT
    // ----------------------------------------------------
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const icon = this.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });
        
        // Tutup menu saat link di klik (PENTING untuk Single Page)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                setTimeout(() => {
                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        document.querySelector('#navToggle i').classList.replace('fa-times', 'fa-bars');
                    }
                }, 400); 
            });
        });
    }

    // Header Scroll Effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    
    // ----------------------------------------------------
    // 2. HERO SECTION STAGGERED ANIMATION
    // ----------------------------------------------------
    const animateGroup = document.querySelector('.hero-content.animate-group');
    if (animateGroup) {
        const heroElements = animateGroup.children;
        Array.from(heroElements).forEach((el, index) => {
            // Hitung stagger delay
            const delayTime = (index * 0.2) + 0.3; 
            
            // Set transisi dan delay
            el.style.transition = `opacity 0.8s var(--transition-ease) ${delayTime}s, transform 0.8s var(--transition-ease) ${delayTime}s`;
            
            // Aktifkan animasi
            setTimeout(() => {
                 el.style.opacity = 1;
                 el.style.transform = 'translateY(0)';
            }, 50); 
        });
    }


    // ----------------------------------------------------
    // 3. REVEAL ON SCROLL
    // ----------------------------------------------------
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Ambil delay dari style atribut (digunakan untuk staggered)
                const delay = entry.target.style.getPropertyValue('--stagger-delay') || '0s';
                
                entry.target.style.transitionDelay = delay;

                entry.target.classList.add('active');

                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: '0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));


    // ----------------------------------------------------
    // 4. TESTIMONIAL SLIDER DENGAN KONTROL
    // ----------------------------------------------------
    const testiItems = document.querySelectorAll('.testi-item');
    const testiPrev = document.getElementById('testiPrev');
    const testiNext = document.getElementById('testiNext');
    let currentTestiIndex = 0;
    const testiInterval = 6000;
    let autoSlide;

    function showTestimonial(index) {
        if (testiItems.length === 0) return;

        const previousIndex = currentTestiIndex;
        currentTestiIndex = (index + testiItems.length) % testiItems.length;
        
        if (previousIndex !== currentTestiIndex) {
            // Pindahkan kelas 'leaving' ke item sebelumnya
            testiItems[previousIndex].classList.add('leaving');
            testiItems[previousIndex].classList.remove('active');
        }

        // Tampilkan item baru
        setTimeout(() => {
            // Hapus kelas 'leaving' dari semua item setelah transisi dimulai
            testiItems.forEach(item => item.classList.remove('leaving')); 
            testiItems[currentTestiIndex].classList.add('active');
        }, 10);
    }

    function startAutoSlide() {
        if (autoSlide) clearInterval(autoSlide);
        autoSlide = setInterval(() => {
            showTestimonial(currentTestiIndex + 1);
        }, testiInterval);
    }
    
    if (testiItems.length > 0) {
        showTestimonial(0);
        startAutoSlide();

        if (testiPrev && testiNext) {
            testiPrev.addEventListener('click', () => {
                clearInterval(autoSlide);
                showTestimonial(currentTestiIndex - 1);
                startAutoSlide();
            });
            testiNext.addEventListener('click', () => {
                clearInterval(autoSlide);
                showTestimonial(currentTestiIndex + 1);
                startAutoSlide();
            });
        }
    }
    
   const bookingForm = document.querySelector('.quick-booking-form');

if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault(); // mencegah reload

        const asal = this.asal.value;
        const tujuan = this.tujuan.value;
        const tanggal = this.tanggal.value;
        const penumpang = this.penumpang.value;

        // Pesan menarik untuk WhatsApp
        const message = `Hai Adventora,
Saya ingin memesan kursi:
- Asal: ${asal}
- Tujuan: ${tujuan}
- Tanggal: ${tanggal}
- Jumlah Penumpang: ${penumpang}

Mohon bantu proses pemesanannya. Terima kasih! 🙏`;

        // Nomor WhatsApp tujuan (format internasional, tanpa +, misal 6281234567890)
        const waNumber = "6281217241263";

        // Encode pesan supaya bisa dipakai di URL
        const waURL = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

        // Buka WhatsApp
        window.open(waURL, "_blank");
    });
}


    // ----------------------------------------------------
    // 5. ARMADA GALLERY SLIDER (Auto-Slide hanya di Desktop)
    // ----------------------------------------------------
    const galleryTrack = document.getElementById('gallerySlider');
    if (galleryTrack) {
        const slides = galleryTrack.querySelectorAll('.slide');
        let currentSlide = 0;
        let galleryInterval = null;

        const isDesktop = () => window.innerWidth > 992; // Mode desktop/large tablet

        const getSlidesPerView = () => window.innerWidth <= 992 ? 2 : 3;
        let slidesPerView = getSlidesPerView();
        
        const slideCount = slides.length;

        // Clone slides for infinite loop effect
        for (let i = 0; i < slideCount; i++) {
            galleryTrack.appendChild(slides[i].cloneNode(true));
        }
        
        // Fungsi untuk menggerakkan slider
        const moveGallery = () => {
            if (!isDesktop()) return; // Stop jika bukan desktop

            currentSlide++;
            const offset = -(currentSlide * (100 / slidesPerView));
            
            galleryTrack.style.transition = `transform 0.8s ease-in-out`;
            galleryTrack.style.transform = `translateX(${offset}%)`;

            if (currentSlide >= slideCount) {
                setTimeout(() => {
                    galleryTrack.style.transition = 'none';
                    currentSlide = 0;
                    galleryTrack.style.transform = `translateX(0)`;
                }, 800);
            }
        };

        // Fungsi untuk mengelola interval auto-slide
        const manageAutoSlide = () => {
            if (isDesktop() && !galleryInterval && slideCount > slidesPerView) {
                galleryInterval = setInterval(moveGallery, 4000);
            } else if (!isDesktop() && galleryInterval) {
                clearInterval(galleryInterval);
                galleryInterval = null;
                // Reset tampilan untuk mobile scroll
                galleryTrack.style.transition = 'none';
                galleryTrack.style.transform = `translateX(0)`;
                currentSlide = 0;
            }
        };

        // Inisialisasi dan Kelola saat resize
        manageAutoSlide();
        window.addEventListener('resize', manageAutoSlide);
    }
});
