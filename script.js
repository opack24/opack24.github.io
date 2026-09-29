const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");

const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
const sections = [...document.querySelectorAll("main section[id]")];
const revealItems = document.querySelectorAll(".reveal");

const year = document.querySelector("#year");


// --------------------------------------------------
// Header scroll effect
// --------------------------------------------------

function setHeaderState() {
  if (window.scrollY > 12) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", setHeaderState, {
  passive: true
});

setHeaderState();


// --------------------------------------------------
// Mobile navigation
// --------------------------------------------------

function closeMenu() {
  siteNav.classList.remove("open");

  if (menuToggle) {
    menuToggle.setAttribute("aria-expanded", "false");
  }

  document.body.classList.remove("menu-open");
}

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    document.body.classList.toggle(
      "menu-open",
      isOpen
    );
  });
}


// Close mobile menu after clicking a navigation link

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();
  });
});


// Close mobile menu when pressing Escape

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});


// --------------------------------------------------
// Reveal animations when sections enter the screen
// --------------------------------------------------

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

revealItems.forEach((item) => {
  revealObserver.observe(item);
});


// --------------------------------------------------
// Highlight the current navigation section
// --------------------------------------------------

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const currentSection = entry.target.id;

      navLinks.forEach((link) => {
        const linkTarget = link.getAttribute("href");

        link.classList.toggle(
          "active",
          linkTarget === `#${currentSection}`
        );
      });
    });
  },
  {
    rootMargin: "-30% 0px -55% 0px",
    threshold: 0
  }
);

sections.forEach((section) => {
  sectionObserver.observe(section);
});


// --------------------------------------------------
// Automatically display the current year in the footer
// --------------------------------------------------

if (year) {
  year.textContent = new Date().getFullYear();
}
