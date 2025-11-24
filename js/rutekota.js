/* js/lumajang.js - versi perbaikan */

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
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.replace('fa-bars', 'fa-times');
                } else {
                    icon.classList.replace('fa-times', 'fa-bars');
                }
            }
        });

        // Tutup menu saat link di klik (PENTING untuk single page)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                setTimeout(() => {
                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        const navIcon = document.querySelector('#navToggle i');
                        if (navIcon) navIcon.classList.replace('fa-times', 'fa-bars');
                    }
                }, 300);
            });
        });
    }

    // Header Scroll Effect
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ----------------------------------------------------
    // 2. HERO SECTION STAGGERED ANIMATION
    // ----------------------------------------------------
    const animateGroup = document.querySelector('.hero-content.animate-group');
    if (animateGroup) {
        const heroElements = animateGroup.children;
        Array.from(heroElements).forEach((el, index) => {
            const delayTime = (index * 0.2) + 0.3;
            // fallback value jika CSS variable tidak tersedia
            const ease = getComputedStyle(document.documentElement).getPropertyValue('--transition-ease') || 'ease';
            el.style.transition = `opacity 0.8s ${ease} ${delayTime}s, transform 0.8s ${ease} ${delayTime}s`;
            // pastikan awalnya tersembunyi di CSS (opacity:0; transform: translateY(8px))
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
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
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
    }

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

        if (testiItems[previousIndex]) {
            testiItems[previousIndex].classList.add('leaving');
            testiItems[previousIndex].classList.remove('active');
        }

        setTimeout(() => {
            testiItems.forEach(item => item.classList.remove('leaving'));
            if (testiItems[currentTestiIndex]) testiItems[currentTestiIndex].classList.add('active');
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

    // ----------------------------------------------------
    // 5. BOOKING FORM -> WhatsApp (single, safe handler)
    // ----------------------------------------------------
    const bookingForm = document.querySelector('.quick-booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const nama = this.nama ? this.nama.value : '-';
            const asal = this.asal ? this.asal.value : 'Jember';
            const tujuan = this.tujuan ? this.tujuan.value : 'Surabaya';
            const tanggal = this.tanggal ? this.tanggal.value : '-';
            const penumpang = this.penumpang ? this.penumpang.value : '1';
            const alamatjemput = this.alamatjemput ? this.alamatjemput.value : '-';
            const alamattujuan = this.alamattujuan ? this.alamattujuan.value : '-';

            const waNumber = '6281217241263';
            const base = `https://wa.me/${waNumber}?text=`;
            const parts = [
                'Halo kak, saya ingin pesan travel:',
                `Nama: ${nama}`,
                `Jumlah penumpang: ${penumpang}`,
                `Asal: ${asal}`,
                `Tujuan: ${tujuan}`,
                `Alamat jemput: ${alamatjemput}`,
                `Alamat tujuan: ${alamattujuan}`,
                `Tanggal berangkat: ${tanggal}`,
                `Potongan harga: Rp.20.000`
            ];
            const msg = encodeURIComponent(parts.join('\n'));
            window.open(base + msg, '_blank');
        });
    }

    // ----------------------------------------------------
    // 6. ARMADA GALLERY SLIDER (Auto-Slide desktop)
    // ----------------------------------------------------
    const galleryTrack = document.getElementById('gallerySlider');
    if (galleryTrack) {
        const slides = Array.from(galleryTrack.querySelectorAll('.slide'));
        if (slides.length > 0) {
            let currentSlide = 0;
            let galleryInterval = null;
            const slideCount = slides.length;

            // clone nodes to create seamless loop only if many slides
            if (slideCount > 1) {
                slides.forEach(sl => galleryTrack.appendChild(sl.cloneNode(true)));
            }

            const isDesktop = () => window.innerWidth > 992;
            const getSlidesPerView = () => window.innerWidth <= 992 ? 2 : 3;
            let slidesPerView = getSlidesPerView();

            const moveGallery = () => {
                if (!isDesktop()) return;
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

            const manageAutoSlide = () => {
                if (isDesktop() && !galleryInterval && slideCount > slidesPerView) {
                    galleryInterval = setInterval(moveGallery, 4000);
                } else if (!isDesktop() && galleryInterval) {
                    clearInterval(galleryInterval);
                    galleryInterval = null;
                    galleryTrack.style.transition = 'none';
                    galleryTrack.style.transform = `translateX(0)`;
                    currentSlide = 0;
                }
            };

            manageAutoSlide();
            window.addEventListener('resize', manageAutoSlide);
        }
    }

    // ----------------------------------------------------
    // 7. Dynamic route text safe-fill (if page filename indicates route)
    // ----------------------------------------------------
    (function fillRouteText(){
        try {
            const ruteList = {
                "Jember-Surabaya": { origin: "Jember", dest: "Surabaya", price: 200000 },
                "Lumajang-Surabaya": { origin: "Lumajang", dest: "Surabaya", price: 175000 }
            };
            const path = window.location.pathname.split('/').pop();
            const filename = path.replace('.html','');
            const key = filename.split('-').map(w => w.charAt(0).toUpperCase()+w.slice(1)).join('-');
            if (ruteList[key]) {
                document.querySelectorAll('.dyn-origin').forEach(e=> e.textContent = ruteList[key].origin);
                document.querySelectorAll('.dyn-dest').forEach(e=> e.textContent = ruteList[key].dest);
                document.querySelectorAll('.dyn-price').forEach(e=> e.textContent = 'Rp ' + ruteList[key].price.toLocaleString('id-ID'));
            }
            const waButton = document.getElementById('wa-cta');
            if (waButton) {
                const waNumber = '6281217241263';
                const waBase = 'https://wa.me/' + waNumber + '?text=';
                const sampleMsg = 'Halo kak, saya ingin pesan travel:%0ANama: {nama}%0AJumlah penumpang: {penumpang}%0AAlamat jemput: {alamatjemput}%0AAlamat tujuan: {alamattujuan}%0ATanggal berangkat: {tanggal}%0ARute: ' + (ruteList[key] ? (ruteList[key].origin + ' - ' + ruteList[key].dest) : 'Jember - Surabaya');
                waButton.setAttribute('href', waBase + sampleMsg);
            }
        } catch (err) {
            // Jangan ganggu fungsi utama kalau error terjadi
            console.warn('fillRouteText error', err);
        }
    })();

}); // DOMContentLoaded