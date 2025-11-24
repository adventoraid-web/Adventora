document.addEventListener('DOMContentLoaded', function() {
    // --- 1. Navbar Toggle untuk Mobile ---
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('open');
            // Ganti ikon burger/close (jika menggunakan FontAwesome)
            const icon = navToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // Tutup menu saat link di klik (khusus mobile)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('open');
                    const icon = navToggle.querySelector('i');
                    if (icon) {
                        icon.classList.add('fa-bars');
                        icon.classList.remove('fa-times');
                    }
                }
            });
        });
    }

    // --- 2. Scroll Reveal Animation (Animasi Staggered) ---
    // Gunakan Intersection Observer API yang modern dan ringan
    const animateGroups = document.querySelectorAll('.animate-group');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger saat 10% elemen terlihat
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Tambahkan kelas untuk memicu CSS transition
                entry.target.classList.add('is-visible');
                // Hentikan pengamatan setelah animasi dipicu
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateGroups.forEach(group => {
        observer.observe(group);
    });

    // --- 3. Form Submission Handling (Simulasi) ---
    const bookingForm = document.querySelector('.quick-booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Ambil data form
            const nama = this[0].value;
            const jemput = this[1].value;
            const tujuan = this[2].value;
            const tanggal = this[3].value;
            const jumlah = this[4].value;
            
            // Format pesan WhatsApp
            const message = `Halo Adventora, saya mau pesan travel Probolinggo - Surabaya.
            
Nama: ${nama}
Jemput: ${jemput}
Tujuan: ${tujuan}
Tanggal: ${tanggal}
Jumlah Penumpang: ${jumlah}
            
Mohon info ketersediaan kursinya ya. Terima kasih!`;

            // Enkode URL untuk WhatsApp
            const encodedMessage = encodeURIComponent(message);
            const waNumber = '6281217241263'; // Pastikan nomor ini benar

            // Redirect ke WhatsApp
            window.open(`https://wa.me/${waNumber}?text=${encodedMessage}`, '_blank');
        });
    }
});
