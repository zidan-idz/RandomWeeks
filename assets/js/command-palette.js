document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('cmdPalette');
  const input = document.getElementById('cmdInput');
  const defaultGroup = document.getElementById('cmdDefault');
  const resultsGroup = document.getElementById('cmdResultsGroup');
  const resultsList = document.getElementById('cmdResults');
  
  if (!overlay || !input) return;

  let isPaletteOpen = false;
  let allPosts = [];
  let fetchPromise = null;

  // Tampilkan Command Palette
  function openPalette() {
    isPaletteOpen = true;
    overlay.classList.remove('d-none');
    
    // Animasikan masuk
    if (window.anime) {
      anime({
        targets: '.cmd-palette-container',
        scale: [0.9, 1],
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutQuart'
      });
      anime({
        targets: '.cmd-palette-overlay',
        backgroundColor: ['rgba(0,0,0,0)', 'rgba(0,0,0,0.6)'],
        duration: 300,
        easing: 'linear'
      });
    }

    input.value = '';
    input.focus();
    showDefault();

    // Fetch post data on first open
    if (!fetchPromise) {
      fetchPromise = fetch('/assets/json/search.json')
        .then(response => response.json())
        .then(data => {
          allPosts = data;
        })
        .catch(err => console.error("Gagal mengambil data search:", err));
    }
  }

  // Ekspos ke global agar bisa dipanggil dari tombol navbar
  window.openCommandPalette = openPalette;

  // Tutup Command Palette
  function closePalette() {
    isPaletteOpen = false;
    
    if (window.anime) {
      anime({
        targets: '.cmd-palette-container',
        scale: [1, 0.95],
        opacity: [1, 0],
        duration: 200,
        easing: 'easeInQuart'
      });
      anime({
        targets: '.cmd-palette-overlay',
        backgroundColor: ['rgba(0,0,0,0.6)', 'rgba(0,0,0,0)'],
        duration: 200,
        easing: 'linear',
        complete: () => overlay.classList.add('d-none')
      });
    } else {
      overlay.classList.add('d-none');
    }
  }

  function showDefault() {
    defaultGroup.classList.remove('d-none');
    resultsGroup.classList.add('d-none');
    resetActiveItem();
  }

  function showResults(results) {
    defaultGroup.classList.add('d-none');
    resultsGroup.classList.remove('d-none');
    
    resultsList.innerHTML = '';
    
    if (results.length === 0) {
      resultsList.innerHTML = '<li class="cmd-item text-muted text-center py-3">Tidak ada artikel yang cocok.</li>';
    } else {
      results.forEach(post => {
        const li = document.createElement('li');
        li.className = 'cmd-item';
        li.setAttribute('data-url', post.url);
        li.innerHTML = `<i class="bi bi-file-text me-2"></i> ${post.title}`;
        resultsList.appendChild(li);
      });
    }
    resetActiveItem();
  }

  // Handle Search Input
  input.addEventListener('input', (e) => {
    const val = e.target.value.toLowerCase().trim();
    if (val === '') {
      showDefault();
      return;
    }

    if (allPosts.length > 0) {
      const filtered = allPosts.filter(post => 
        post.title.toLowerCase().includes(val) || 
        post.excerpt.toLowerCase().includes(val)
      ).slice(0, 5); // Batasi 5 hasil
      
      showResults(filtered);
    }
  });

  // Handle Keyboard Navigasi
  document.addEventListener('keydown', (e) => {
    // Buka palette dengan Ctrl+K atau Cmd+K
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      if (isPaletteOpen) closePalette();
      else openPalette();
    }

    if (!isPaletteOpen) return;

    if (e.key === 'Escape') {
      closePalette();
    }

    // Navigasi Atas/Bawah
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const items = Array.from(document.querySelectorAll('.cmd-group:not(.d-none) .cmd-item'));
      if (!items.length) return;

      const activeIndex = items.findIndex(item => item.classList.contains('active'));
      let nextIndex = 0;

      if (e.key === 'ArrowDown') {
        nextIndex = activeIndex >= items.length - 1 ? 0 : activeIndex + 1;
      } else {
        nextIndex = activeIndex <= 0 ? items.length - 1 : activeIndex - 1;
      }

      items.forEach(item => item.classList.remove('active'));
      items[nextIndex].classList.add('active');
      items[nextIndex].scrollIntoView({ block: 'nearest' });
    }

    // Pilih / Enter
    if (e.key === 'Enter') {
      e.preventDefault();
      const activeItem = document.querySelector('.cmd-group:not(.d-none) .cmd-item.active');
      if (activeItem) {
        executeCommand(activeItem);
      } else {
        // Jika tidak ada yang aktif, pilih yang pertama
        const firstItem = document.querySelector('.cmd-group:not(.d-none) .cmd-item');
        if (firstItem) executeCommand(firstItem);
      }
    }
  });

  // Handle Click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closePalette();
  });

  document.addEventListener('click', (e) => {
    const item = e.target.closest('.cmd-item');
    if (item && isPaletteOpen) {
      executeCommand(item);
    }
  });

  function resetActiveItem() {
    const items = document.querySelectorAll('.cmd-item');
    items.forEach(item => item.classList.remove('active'));
    const visibleItems = document.querySelectorAll('.cmd-group:not(.d-none) .cmd-item');
    if (visibleItems.length > 0) visibleItems[0].classList.add('active');
  }

  function executeCommand(item) {
    const url = item.getAttribute('data-url');
    const action = item.getAttribute('data-action');
    
    closePalette();

    if (url) {
      setTimeout(() => {
        if (window.swup) {
          window.swup.navigate(url);
        } else {
          window.location.href = url;
        }
      }, 200);
    }
  }
});
