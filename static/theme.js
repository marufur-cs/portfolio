(function () {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

    document.documentElement.dataset.theme = initialTheme;

    document.addEventListener("DOMContentLoaded", function () {
        const toggle = document.querySelector(".theme-toggle");
        if (!toggle) {
            return;
        }

        updateToggle(toggle, initialTheme);

        toggle.addEventListener("click", function () {
            const nextTheme = document.documentElement.dataset.theme === "dark"
                ? "light"
                : "dark";

            document.documentElement.dataset.theme = nextTheme;
            localStorage.setItem("theme", nextTheme);
            updateToggle(toggle, nextTheme);
        });
    });

    function updateToggle(toggle, theme) {
        const isDark = theme === "dark";
        toggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
        toggle.innerHTML = '<span class="theme-icon" aria-hidden="true">'
            + (isDark ? "☀" : "☾")
            + "</span> "
            + (isDark ? "Light mode" : "Dark mode");
    }
})();
