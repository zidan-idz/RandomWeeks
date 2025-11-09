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
