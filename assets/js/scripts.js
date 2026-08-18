document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menuToggle");
  const popup = document.getElementById("popupMenu");
  const close = document.getElementById("closeMenu");

  if (toggle && popup && close) {
    toggle.addEventListener("click", () => popup.classList.add("active"));
    close.addEventListener("click", () => popup.classList.remove("active"));

    popup.addEventListener("click", (e) => {
      if (e.target === popup) popup.classList.remove("active");
    });
  }
});

// =================================================================

// Ambil tombol
const backToTopButton = document.getElementById('backToTop');

// Tampilkan tombol jika scroll sudah melewati tinggi layar awal
window.addEventListener('scroll', () => {
  if (window.scrollY > window.innerHeight) {
    backToTopButton.style.display = 'block';
  } else {
    backToTopButton.style.display = 'none';
  }
});

// Scroll ke atas saat tombol diklik
backToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// =================================================================

// Ambil query dari URL
const params = new URLSearchParams(window.location.search);
const query = params.get("q") || "";

const searchInput = document.getElementById("search-input");

// Pastikan elemen ada sebelum mengaksesnya
if (searchInput) {
  searchInput.value = query;

  // Inisialisasi SimpleJekyllSearch
  const sjs = SimpleJekyllSearch({
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

  if (query.trim() !== "") {
    setTimeout(() => {
      searchInput.dispatchEvent(new Event("input"));
    }, 150);
  }
}

// =================================================================
// Fitur Tambahan (Copy Link & Reading Progress)

document.addEventListener("DOMContentLoaded", () => {
  // Logic Copy Link dengan Toast
  const copyBtn = document.getElementById("copyLinkBtn");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const urlToCopy = copyBtn.getAttribute("data-url");
      
      if (navigator.clipboard) {
        navigator.clipboard.writeText(urlToCopy).then(() => {
          showToast();
        });
      } else {
        // Fallback
        const tempInput = document.createElement("input");
        tempInput.value = urlToCopy;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
        showToast();
      }
    });
  }

  function showToast() {
    const toastEl = document.getElementById("copyToast");
    if (toastEl) {
      const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
      toast.show();
    }
  }
});

// Logic Reading Progress Bar
window.addEventListener("scroll", () => {
  const progressBar = document.getElementById("readingProgressBar");
  if (progressBar) {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    if (height > 0) {
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + "%";
    }
  }
});
