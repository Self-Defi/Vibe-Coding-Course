// "You Are Here" cue (Option A): highlight active nav item based on section in view.
// Uses IntersectionObserver for smooth tracking.

(function () {
  const navLinks = Array.from(document.querySelectorAll(".nav__link"));
  const sections = Array.from(document.querySelectorAll("[data-observe]"));

  if (!navLinks.length || !sections.length) return;

  function setActive(sectionName) {
    navLinks.forEach((a) => {
      const isMatch = a.dataset.section === sectionName;
      a.classList.toggle("is-active", isMatch);
      a.setAttribute("aria-current", isMatch ? "page" : "false");
    });
  }

  // Default active on load based on hash or first section
  const initial = (location.hash || "#framework").replace("#", "");
  setActive(initial);

  // Click: immediate feedback
  navLinks.forEach((a) => {
    a.addEventListener("click", () => {
      const target = a.dataset.section;
      if (target) setActive(target);
    });
  });

  // Scroll: update active state based on what is on screen
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      const name = visible.target.getAttribute("data-observe");
      if (name) setActive(name);
    },
    {
      root: null,
      rootMargin: "-40% 0px -55% 0px",
      threshold: [0.15, 0.25, 0.35, 0.5, 0.65],
    }
  );

  sections.forEach((s) => observer.observe(s));
})();
