function initAnimations() {
    const baseDuration = 800;
    const baseDistance = '40px'; 

    // 1. Animasi Segera (Above the Fold)
    const header = document.querySelector('header.site-header');
    if (header && !header.style.opacity) {
      anime({
          targets: ['header.site-header', '.hero-section h1', '.hero-section p', '.post-header'],
          translateY: ['-20px', 0],
          opacity: [0, 1],
          duration: baseDuration,
          easing: 'easeOutExpo',
          delay: anime.stagger(100),
          complete: function() {
              if (header) header.style.transform = '';
          }
      });
    }

    // 2. Animasi Scroll Reveal (Parallax Fade-in)
    // Ambil elemen-elemen yang butuh animasi saat di-scroll
    const revealElements = document.querySelectorAll(`
        .posts-section .post-card,
        .hero-section .post-card,
        .post-content > p,
        .post-content > h2,
        .post-content > h3,
        .post-content > ul,
        .post-content > ol,
        .post-content > blockquote,
        .post-content > img,
        .share-section,
        .related-posts .card,
        .comments-section,
        footer.site-footer
    `);

    // Sembunyikan state awal agar siap di-reveal
    revealElements.forEach(el => {
        if (!el.classList.contains('revealed')) {
            el.style.opacity = '0';
            el.style.transform = `translateY(${baseDistance})`;
        }
    });

    // Buat Observer
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                
                anime({
                    targets: target,
                    translateY: [baseDistance, 0],
                    opacity: [0, 1],
                    duration: 1000,
                    easing: 'easeOutQuart'
                });
                
                target.classList.add('revealed');
                obs.unobserve(target); // Stop mengamati setelah muncul
            }
        });
    }, {
        threshold: 0.1, // Trigger saat 10% elemen masuk layar
        rootMargin: "0px 0px -50px 0px" // Trigger sedikit sebelum elemen benar-benar menyentuh bawah layar
    });

    // Mulai mengamati
    revealElements.forEach(el => {
        if (!el.classList.contains('revealed')) {
            observer.observe(el);
        }
    });
}

document.addEventListener('DOMContentLoaded', initAnimations);
