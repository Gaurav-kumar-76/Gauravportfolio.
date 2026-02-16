const yearElement = document.getElementById("year");
const toggleButton = document.getElementById("themeToggle");
const filterButtons = [...document.querySelectorAll("#projectFilters .chip")];
const projectCards = [...document.querySelectorAll("#projectGrid .card")];

yearElement.textContent = new Date().getFullYear();

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const savedTheme = localStorage.getItem("theme");
const currentTheme = savedTheme || (prefersDark ? "dark" : "light");

if (currentTheme === "dark") {
  document.body.classList.add("dark");
}

function updateToggleIcon() {
  toggleButton.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
}

updateToggleIcon();

toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const theme = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", theme);
  updateToggleIcon();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((chip) => chip.classList.remove("active"));
    button.classList.add("active");

    const activeFilter = button.dataset.filter;
    projectCards.forEach((card) => {
      const tags = card.dataset.tags || "";
      const show = activeFilter === "all" || tags.includes(activeFilter);
      card.hidden = !show;
    });
  });
});
