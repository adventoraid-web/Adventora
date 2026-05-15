/**
 * File: js/rutekota.js
 * Deskripsi: Skrip untuk responsivitas, animasi modern, dan fungsionalitas utama.
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. NAVIGASI RESPONSIVE (Toggle Menu) ---
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-times');
                icon.classList.toggle('fa-bars');
            }
        });

        document.querySelectorAll('.nav-item').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 992) {
                    navLinks.classList.remove('active');
                    const icon = navToggle.querySelector('i');
                    if (icon) {
                        icon.classList.add('fa-bars');
                        icon.classList.remove('fa-times');
                    }
                }
            });
        });
    }
// Tutup menu kalau klik area luar
document.addEventListener('click', (e) => {

    const isMenu = navLinks.contains(e.target);
    const isButton = navToggle.contains(e.target);

    if (!isMenu && !isButton) {

        navLinks.classList.remove('active');

        const icon = navToggle.querySelector('i');

        if (icon) {
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    }
});
    // --- 2. ANIMASI SCROLL ---
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { root: null, rootMargin: '0px', threshold: 0.1 });

        revealElements.forEach(el => observer.observe(el));
    }

    // --- 2b. Pastikan Hero Section selalu terlihat ---
    document.querySelectorAll('.animate-group > *').forEach(el => el.classList.add('active'));

    // --- 3. DYNAMIC CONTENT & PRICE INJECTION ---
    if (typeof ruteList !== 'undefined') {
        const currentRuteKey = "Bondowoso-Surabaya"; // Ambil dari rute saat ini
        const ruteData = ruteList[currentRuteKey];

        if (ruteData) {
            document.querySelectorAll('.dyn-origin').forEach(el => el.textContent = ruteData.origin || '');
            document.querySelectorAll('.dyn-dest').forEach(el => el.textContent = ruteData.dest || '');
            const formattedPrice = ruteData.price ? 'Rp ' + ruteData.price.toLocaleString('id-ID') : '-';
            document.querySelectorAll('.price-info strong').forEach(el => el.textContent = 'Mulai ' + formattedPrice);

            const asalInput = document.getElementById('asal');
            const tujuanInput = document.getElementById('tujuan');
            if (asalInput) asalInput.value = ruteData.origin || '';
            if (tujuanInput) tujuanInput.value = ruteData.dest || '';
        }
    }

    // --- 4. QUICK BOOKING FORM TO WHATSAPP ---
    const bookingForm = document.querySelector('.quick-booking-form');
    const waCta = document.getElementById('wa-cta');
    const waNumber = '6281217241263';

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const asal = document.getElementById('asal')?.value || '';
            const tujuan = document.getElementById('tujuan')?.value || '';
            const tanggal = document.getElementById('tanggal')?.value || '';
            const penumpang = document.getElementById('penumpang')?.value || '';
            const nama = document.getElementById('nama')?.value || '';
            const alamatJemput = document.getElementById('alamatjemput')?.value || '';
            const alamatTujuan = document.getElementById('alamattujuan')?.value || '';

            let waMessage = `Halo Adventora, saya ingin pesan travel nih.\n\n`;
            waMessage += `*Rute:* ${asal} → ${tujuan}\n`;
            waMessage += `*Tanggal:* ${tanggal}\n`;
            waMessage += `*Penumpang:* ${penumpang} orang\n`;
            waMessage += `*Nama Pemesan:* ${nama}\n`;
            waMessage += `*Alamat Jemput:* ${alamatJemput}\n`;
            if (alamatTujuan) waMessage += `*Alamat Tujuan:* ${alamatTujuan}\n`;
            waMessage += `\nMohon dicek ketersediaan kursinya ya, terima kasih. 🙏`;

            window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`, '_blank');
        });
    }

    if (waCta) {
        if (typeof ruteList !== 'undefined') {
            const currentRuteKey = "Bondowoso-Surabaya";
            const ruteData = ruteList[currentRuteKey];
            if (ruteData) {
                const waBaseText = `Halo kak, saya mau pesan travel ${ruteData.origin} - ${ruteData.dest}`;
                waCta.href = `https://wa.me/${waNumber}?text=${encodeURIComponent(waBaseText)}`;
            }
        } else {
            waCta.href = `https://wa.me/${waNumber}?text=${encodeURIComponent('Halo kak, saya mau pesan travel')}`;
        }
    }

});