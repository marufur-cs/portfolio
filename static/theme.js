(function () {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

    document.documentElement.dataset.theme = initialTheme;

    document.addEventListener("DOMContentLoaded", function () {
        const toggle = document.querySelector(".theme-toggle");

        if (toggle) {
            updateToggle(toggle, initialTheme);

            toggle.addEventListener("click", function () {
                const nextTheme = document.documentElement.dataset.theme === "dark"
                    ? "light"
                    : "dark";

                document.documentElement.dataset.theme = nextTheme;
                localStorage.setItem("theme", nextTheme);
                updateToggle(toggle, nextTheme);
            });
        }

        const animatedElements = document.querySelectorAll(".exp, .pub, .aboutme .text-box, .aboutme .news");
        animatedElements.forEach(function (element, index) {
            element.classList.add("reveal");
            element.style.setProperty("--reveal-delay", (index * 80) + "ms");
        });

        if ("IntersectionObserver" in window) {
            const observer = new IntersectionObserver(function (entries, currentObserver) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        currentObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.12 });

            document.querySelectorAll(".reveal").forEach(function (element) {
                observer.observe(element);
            });
        } else {
            document.querySelectorAll(".reveal").forEach(function (element) {
                element.classList.add("is-visible");
            });
        }
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
