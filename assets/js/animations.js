document.addEventListener('DOMContentLoaded', () => {
    
    // Config: Snappy & Cepat ⚡
    const baseDuration = 800; // Lebih cepat (dari 1000ms)
    const baseDistance = '30px'; 

    // 1. Navbar & Header (Turun dari atas)
    anime({
        targets: ['header.site-header', '.navbar'],
        translateY: ['-100%', 0],
        opacity: [0, 1],
        duration: baseDuration,
        easing: 'easeOutExpo',
        complete: function(anim) {
            // Fix: Hapus transform setelah animasi selesai (jika header ada)
            const header = document.querySelector('header.site-header');
            if (header) header.style.transform = '';
        }
    });

    // 2. Konten Utama (Naik dari bawah dengan Stagger Cepat)
    anime({
        targets: [
            '.page-content', 
            '.post-content', 
            'main h1', 
            'main h2', 
            'main p',
            '.post-list li',      
            '.row .col',          
            '.card',              
            '.post-card'          
        ],
        translateY: [baseDistance, 0],
        opacity: [0, 1],
        duration: baseDuration, // 800ms
        easing: 'easeOutQuart',
        delay: 0 // Langsung muncul tanpa antri (No Stagger)
    });

    // 3. Elemen Dekoratif / Tombol
    anime({
        targets: ['.btn', '.badge', '.social-links a'],
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 600,
        easing: 'spring(1, 80, 10, 0)',
        delay: anime.stagger(50, {start: 400}) // Start 400ms
    });

    // 4. Footer
    anime({
        targets: 'footer.site-footer',
        opacity: [0, 1],
        duration: baseDuration,
        easing: 'linear',
        delay: 600 // Muncul lebih awal
    });
});
