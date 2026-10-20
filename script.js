/* =========================
   1. AUTOMATIC COPYRIGHT YEAR
========================= */

const yearElement = document.getElementById("current-year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

/* =========================
   2. ACTIVE NAVIGATION LINK
========================= */

const navigationLinks = document.querySelectorAll(
    ".site-header nav a"
);

const pageSections = document.querySelectorAll(
    "main section[id]"
);

function setActiveLink(sectionId) {
    navigationLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${sectionId}`;

        link.classList.toggle("active", isActive);

        if (isActive) {
            link.setAttribute("aria-current", "location");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

/* Highlight the clicked navigation link */

navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
        const sectionId = link.getAttribute("href").slice(1);
        setActiveLink(sectionId);
    });
});

/* Highlight the section currently in view */

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            const visibleSections = entries
                .filter((entry) => entry.isIntersecting)
                .sort(
                    (a, b) =>
                        b.intersectionRatio - a.intersectionRatio
                );

            if (visibleSections.length > 0) {
                setActiveLink(visibleSections[0].target.id);
            }
        },
        {
            root: null,
            rootMargin: "-15% 0px -55% 0px",
            threshold: [0, 0.1, 0.25, 0.5]
        }
    );

    pageSections.forEach((section) => {
        sectionObserver.observe(section);
    });
}

/* Handle the home section when the page first loads */

if (window.location.hash) {
    const initialSectionId = window.location.hash.slice(1);

    if (document.getElementById(initialSectionId)) {
        setActiveLink(initialSectionId);
    }
} else {
    setActiveLink("home");
}