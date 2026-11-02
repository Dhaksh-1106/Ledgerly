const themeStorageKey = "ledgerly-theme";
const storedTheme = localStorage.getItem(themeStorageKey);
const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
const initialTheme = storedTheme === "dark" || storedTheme === "light" ? storedTheme : preferredTheme;

document.documentElement.dataset.theme = initialTheme;

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) {
    return;
  }

  const icon = toggle.querySelector("span");

  function applyTheme(theme) {
    const isDark = theme === "dark";
    document.documentElement.dataset.theme = theme;
    toggle.setAttribute("aria-pressed", String(isDark));
    toggle.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} mode`);
    toggle.title = `Switch to ${isDark ? "light" : "dark"} mode`;
    icon.textContent = isDark ? "☀" : "☾";
    document.dispatchEvent(new CustomEvent("ledgerly-theme-change", { detail: { theme } }));
  }

  applyTheme(document.documentElement.dataset.theme);
  toggle.addEventListener("click", () => {
    const theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem(themeStorageKey, theme);
    applyTheme(theme);
  });
});
