const els = {
  navbar: document.getElementById("navbar"),
  menuToggle: document.getElementById("menuToggle"),
  mobileMenu: document.getElementById("mobileMenu"),
  navDropdown: document.getElementById("navDropdown"),
  dropdownTrigger: document.getElementById("dropdownTrigger"),
  dropdownMenu: document.getElementById("dropdownMenu"),
};

// ---- Shadow once the page is scrolled ----
function updateScrollShadow() {
  els.navbar.classList.toggle("is-scrolled", window.scrollY > 4);
}
updateScrollShadow();
window.addEventListener("scroll", updateScrollShadow, { passive: true });

// ---- Mobile menu toggle ----
function setMobileMenuOpen(open) {
  els.menuToggle.classList.toggle("is-open", open);
  els.menuToggle.setAttribute("aria-expanded", String(open));
  els.mobileMenu.classList.toggle("is-open", open);
}

els.menuToggle.addEventListener("click", () => {
  const isOpen = els.menuToggle.classList.contains("is-open");
  setMobileMenuOpen(!isOpen);
});

// Close the mobile menu after tapping a link (so it doesn't stay open
// after navigating to a section).
els.mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMobileMenuOpen(false));
});

// ---- Services dropdown (desktop) ----
function setDropdownOpen(open) {
  els.navDropdown.classList.toggle("is-open", open);
  els.dropdownTrigger.setAttribute("aria-expanded", String(open));
}

els.dropdownTrigger.addEventListener("click", (e) => {
  e.stopPropagation();
  setDropdownOpen(!els.navDropdown.classList.contains("is-open"));
});

document.addEventListener("click", (e) => {
  if (!els.navDropdown.contains(e.target)) setDropdownOpen(false);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setDropdownOpen(false);
});

els.dropdownMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setDropdownOpen(false));
});

// ---- Scroll-spy: highlight the nav link for whichever section is in view ----
const sectionLinks = document.querySelectorAll("[data-section]");
const sections = document.querySelectorAll("main .section[id]");

function setActiveSection(id) {
  sectionLinks.forEach((link) => {
    link.classList.toggle("is-active", link.dataset.section === id);
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    // Pick the entry closest to the top of the viewport among those
    // currently intersecting, so the "most visible" section wins.
    const visible = entries.filter((entry) => entry.isIntersecting);
    if (visible.length === 0) return;
    const topMost = visible.reduce((a, b) =>
      a.boundingClientRect.top < b.boundingClientRect.top ? a : b
    );
    setActiveSection(topMost.target.id);
  },
  { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
);

sections.forEach((section) => observer.observe(section));