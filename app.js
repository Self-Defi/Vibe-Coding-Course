(() => {
  const navLinks = Array.from(document.querySelectorAll(".nav__link"));
  const sections = Array.from(document.querySelectorAll("section[data-spy]"));

  function setActive(id) {
    navLinks.forEach(a => {
      const isMatch = a.getAttribute("data-section") === id;
      a.classList.toggle("is-active", isMatch);
      if (isMatch) {
        a.setAttribute("aria-current", "page");
      } else {
        a.removeAttribute("aria-current");
      }
    });
  }

  // Default active based on hash (or first section)
  const initial = (location.hash || "#framework").replace("#", "");
  setActive(initial);

  // Scroll-spy using IntersectionObserver
  const observer = new IntersectionObserver(
    (entries) => {
      // pick the entry most in view
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      const id = visible.target.getAttribute("data-spy");
      if (!id) return;

      setActive(id);
    },
    {
      root: null,
      threshold: [0.25, 0.35, 0.5, 0.65],
      rootMargin: "-20% 0px -60% 0px" // tunes when the highlight changes
    }
  );

  sections.forEach(s => observer.observe(s));

  // Optional: placeholder button action
  const addBtn = document.getElementById("addLinksBtn");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      alert("Drop your video links into this card (edit index.html).");
    });
  }
})();
