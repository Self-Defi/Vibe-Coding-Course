// "You Are Here" cue (Option A):
// Highlights the active nav item based on scroll position.
// Uses IntersectionObserver for smooth + efficient section tracking.

(function () {
  const navLinks = Array.from(document.querySelectorAll(".nav__link"));
  const sections = Array.from(document.querySelectorAll("[data-observe]"));

  if (!navLinks.length || !sections.length) return;

  function setActive(sectionName) {
    navLinks.forEach((a) => {
      const isMatch = a.dataset.section === sectionName;
      a.classList.toggle("is-active", isMatch);
      if (isMatch) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  }

  // Default active on load
  const initial = (location.hash || "#framework").replace("#", "");
  setActive(initial);

  // Click feedback (instant highlight)
  navLinks.forEach((a) => {
    a.addEventListener("click", () => {
      const target = a.dataset.section;
      if (target) setActive(target);
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      // pick the most visible intersecting section
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      const name = visible.target.getAttribute("data-observe");
      if (name) setActive(name);
    },
    {
      root: null,
      // tuned for sticky header + page layout
      rootMargin: "-35% 0px -55% 0px",
      threshold: [0.15, 0.25, 0.35, 0.5, 0.65],
    }
  );

  sections.forEach((s) => observer.observe(s));
})();
