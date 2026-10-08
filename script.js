const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const plannerForm = document.querySelector("#planner-form");
const destinationSelect = document.querySelector("#destination-select");
const plannerMessage = document.querySelector("#planner-message");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox.querySelector("img");

function updateHeader() {
    header.classList.toggle("scrolled", window.scrollY > 24);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
    navLinks.classList.toggle("open", !isOpen);
});

navLinks.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation menu");
        navLinks.classList.remove("open");
    }
});

document.querySelectorAll(".place-card").forEach((card) => {
    card.addEventListener("click", () => {
        destinationSelect.value = card.dataset.place;
        plannerMessage.textContent = `${card.dataset.place} is on your list. Tell us where to take you next.`;
    });
});

plannerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    plannerMessage.textContent = destinationSelect.value
        ? `${destinationSelect.value} sounds like a lovely place to begin. Your journey is ready to explore.`
        : "Choose a place to start dreaming up your journey.";
});

document.querySelectorAll(".gallery-tile").forEach((tile) => {
    tile.addEventListener("click", () => {
        lightboxImage.src = tile.dataset.full;
        lightboxImage.alt = tile.querySelector("img").alt;
        lightbox.showModal();
    });
});

lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) lightbox.close();
});
