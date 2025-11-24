/**
 * File: js/lumajang-route.js
 * Deskripsi: Skrip unik rute Lumajang-Surabaya.
 * Fokus: Animasi Intersection Observer dan Logic Form.
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. NAVIGASI MOBILE (Logika menggunakan observer) ---
    const mobileMenuBtn = document.getElementById('navToggle');
    const navBarLinks = document.getElementById('navLinks');
    const toggleIcon = mobileMenuBtn.querySelector('i');

    const handleMenuToggle = () => {
        navBarLinks.classList.toggle('active');
        if (navBarLinks.classList.contains('active')) {
            toggleIcon.classList.replace('fa-bars', 'fa-times');
        } else {
            toggleIcon.classList.replace('fa-times', 'fa-bars');
        }
    };

    mobileMenuBtn.addEventListener('click', handleMenuToggle);

    // Tutup menu saat link diklik (di mobile)
    document.querySelectorAll('.nav-item').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 992) {
                navBarLinks.classList.remove('active');
                toggleIcon.classList.replace('fa-times', 'fa-bars');
            }
        });
    });

    // --- 2. ANIMASI SCROLL DENGAN INTERSECTION OBSERVER (Paling Stabil) ---
    const animatedItems = document.querySelectorAll('.reveal');

    const observerConfig = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Animasi akan dipicu saat 15% elemen terlihat
    };

    const runObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Hentikan observasi setelah aktif
            }
        });
    }, observerConfig);

    animatedItems.forEach(el => {
        runObserver.observe(el);
    });

    // --- 3. INJEKSI DATA RUTE DINAMIS ---
    const routeId = "Lumajang-Surabaya"; 
    
    if (typeof ruteList !== 'undefined' && ruteList[routeId]) {
        const routeData = ruteList[routeId];

        // Update teks
        document.querySelectorAll('.dyn-origin').forEach(el => el.textContent = routeData.origin);
        document.querySelectorAll('.dyn-dest').forEach(el => el.textContent = routeData.dest);

        // Update harga dan form
        const priceFormatted = 'Rp ' + routeData.price.toLocaleString('id-ID');
        document.querySelectorAll('.price-info strong').forEach(el => el.textContent = 'Mulai ' + priceFormatted);
        
        const originInput = document.getElementById('asal');
        const destInput = document.getElementById('tujuan');
        if (originInput) originInput.value = routeData.origin;
        if (destInput) destInput.value = routeData.dest;

        // Update CTA WA
        const waButton = document.getElementById('wa-cta');
        if (waButton) {
             waButton.innerHTML = `<i class="fab fa-whatsapp"></i> PESAN TRAVEL ${routeData.origin} ⇆ ${routeData.dest} SEKARANG!`;

             const defaultMsg = `Halo Adventora, saya mau pesan travel ${routeData.origin} - ${routeData.dest}`;
             waButton.href = `https://wa.me/6281217241263?text=${encodeURIComponent(defaultMsg)}`;
        }
    }


    // --- 4. QUICK BOOKING FORM TO WHATSAPP ---
    const quickForm = document.querySelector('.quick-booking-form');
    const officialWA = '6281217241263';

    if (quickForm) {
        quickForm.addEventListener('submit', (event) => {
            event.preventDefault();

            // Ambil semua data input
            const formData = new FormData(quickForm);
            const data = Object.fromEntries(formData.entries());

            // Susun pesan WA
            let waMessage = `Halo Adventora, saya mau booking travel (via Form Website):\n\n`;
            waMessage += `*Rute:* ${data.asal} → ${data.tujuan}\n`;
            waMessage += `*Tanggal Keberangkatan:* ${data.tanggal}\n`;
            waMessage += `*Jumlah Penumpang:* ${data.penumpang} orang\n`;
            waMessage += `*Nama Pemesan:* ${data.nama}\n`;
            waMessage += `*Alamat Jemput:* ${data.alamatjemput}\n`;
            waMessage += `*Alamat Tujuan:* ${data.alamattujuan || "Belum ada keterangan spesifik"}\n`;
            waMessage += `\nMohon segera dikonfirmasi. Terima kasih. 🙏`;

            const encodedMsg = encodeURIComponent(waMessage);

            window.open(`https://wa.me/${officialWA}?text=${encodedMsg}`, '_blank');
        });
    }

});
