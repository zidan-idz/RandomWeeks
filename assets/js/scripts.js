function initFeatures() {

  // Search Logic
  const params = new URLSearchParams(window.location.search);
  const query = params.get("q") || "";
  const searchInput = document.getElementById("search-input");

  if (searchInput) {
    searchInput.value = query;
    if (window.SimpleJekyllSearch) {
      window.sjs = SimpleJekyllSearch({
        searchInput: searchInput,
        resultsContainer: document.getElementById("results-container"),
        json: "/assets/json/search.json",
        searchResultTemplate: `
          <li class="list-group-item">
            <a href="{url}" style="font-weight:600;">{title}</a><br>
            <small class="text-muted">{date}</small><br>
            <span>{excerpt}</span>
          </li>`,
        noResultsText: '<li class="list-group-item">No results found.</li>',
        fuzzy: false,
        limit: 10,
      });
    }

    if (query.trim() !== "") {
      setTimeout(() => {
        searchInput.dispatchEvent(new Event("input"));
      }, 150);
    }
  }

  // Copy Link Toast Logic
  const copyBtn = document.getElementById("copyLinkBtn");
  if (copyBtn) {
    copyBtn.onclick = () => {
      const urlToCopy = copyBtn.getAttribute("data-url");
      
      if (navigator.clipboard) {
        navigator.clipboard.writeText(urlToCopy).then(() => {
          showToast();
        });
      } else {
        const tempInput = document.createElement("input");
        tempInput.value = urlToCopy;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
        showToast();
      }
    };
  }

  function showToast() {
    const toastEl = document.getElementById("copyToast");
    if (toastEl && window.bootstrap) {
      const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
      toast.show();
    }
  }

  // Medium Zoom
  if (typeof mediumZoom !== 'undefined') {
    mediumZoom('.post-content img', {
      margin: 24,
      background: 'rgba(12, 14, 17, 0.95)',
      scrollOffset: 40
    });
  }

  // Time Ago Logic
  const timeAgoElements = document.querySelectorAll('.time-ago');
  if (timeAgoElements.length > 0) {
    const now = new Date();
    timeAgoElements.forEach(el => {
      const dateAttr = el.getAttribute('data-date');
      if (!dateAttr) return;
      const postDate = new Date(dateAttr);
      const seconds = Math.floor((now - postDate) / 1000);
      
      let interval = seconds / 31536000;
      if (interval > 1) return; // Lebih dari 1 tahun, biarkan format asli
      
      interval = seconds / 2592000;
      if (interval > 1) return; // Lebih dari 1 bulan, biarkan format asli
      
      interval = seconds / 86400;
      if (interval >= 1) {
        el.innerHTML = `<i class="bi bi-clock-history me-1"></i> ${Math.floor(interval)} hari yang lalu`;
        return;
      }
      interval = seconds / 3600;
      if (interval >= 1) {
        el.innerHTML = `<i class="bi bi-clock-history me-1"></i> ${Math.floor(interval)} jam yang lalu`;
        return;
      }
      interval = seconds / 60;
      if (interval >= 1) {
        el.innerHTML = `<i class="bi bi-clock-history me-1"></i> ${Math.floor(interval)} menit yang lalu`;
        return;
      }
      if (seconds > 0) {
        el.innerHTML = `<i class="bi bi-clock-history me-1"></i> Baru saja`;
      }
    });
  }

  // Load Giscus Comments
  const giscusContainer = document.getElementById('giscus-container');
  if (giscusContainer) {
    giscusContainer.innerHTML = ''; // Clear lama
    const script = document.createElement('script');
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "zidan-idz/RW-Com");
    script.setAttribute("data-repo-id", "R_kgDOOIdUWw");
    script.setAttribute("data-category", "General");
    script.setAttribute("data-category-id", "DIC_kwDOOIdUW84C5tTR");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", "transparent_dark");
    script.setAttribute("data-lang", "id");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;
    giscusContainer.appendChild(script);
  }
}

// Global Listeners (hanya sekali)

// Dynamic Browser Tab Title
let originalTitle = document.title;
const blurTitles = [
  "👀 Hei, jangan pergi dulu...",
  "🚪 Kok ditinggal pergi?",
  "💭 Realita di tab sebelah lebih berat?",
  "🥀 Ceritanya kan belum selesai...",
  "🤫 Ssst... ada yang ketinggalan di sini.",
  "🚶‍♂️ Kabur dari kenyataan, ya?",
  "🌧️ Dunia luar lagi berisik?",
  "📖 Ada paragraf yang nunggu dibaca...",
  "✨ Ruang random ini merindukanmu...",
  "🤔 Pindah ke mana tuh?"
];

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    originalTitle = document.title; // Simpan title saat ini
    const randomTitle = blurTitles[Math.floor(Math.random() * blurTitles.length)];
    document.title = randomTitle;
  } else {
    document.title = originalTitle; // Kembalikan ke title aslinya
  }
});
const backToTopButton = document.getElementById('backToTop');
if (backToTopButton) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight) {
      backToTopButton.style.display = 'block';
    } else {
      backToTopButton.style.display = 'none';
    }
  });

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}



// Setup Initial Load
document.addEventListener("DOMContentLoaded", () => {
  initFeatures();
  
  // Setup Swup
  if (window.Swup) {
    window.swup = new Swup({
      plugins: [new SwupScriptsPlugin()]
    });

    // Re-init setelah transisi halaman
    window.swup.hooks.on('page:view', () => {
      initFeatures();
      if (typeof initAnimations === 'function') {
        initAnimations();
      }
      
      // Paksa scroll ke atas, kecuali ada hash
      if (!window.location.hash) {
          window.scrollTo(0, 0);
      }
    });
  }
});


