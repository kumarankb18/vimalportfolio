const toggle = document.getElementById("theme-toggle");

toggle.addEventListener("click", () => {
    const html = document.documentElement;
    const current = html.getAttribute("data-theme");

    if (current === "dark") {
        html.setAttribute("data-theme", "light");
        toggle.textContent = "Dark Mode";
    } else {
        html.setAttribute("data-theme", "dark");
        toggle.textContent = "Light Mode";
    }
});