document.addEventListener('DOMContentLoaded', () => {
    // theme toggle logic
    const toggle = document.getElementById('theme-toggle');

    const themeIcon = document.getElementById('theme-icon');
    // logoImg kept only if future logic needed; currently CSS handles visibility
    const logoImg = document.getElementById('logo-img');
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (themeIcon) {
            themeIcon.getBoundingClientRect();
        }
        if (logoImg) {
            logoImg.getBoundingClientRect();
        }
    }

    // initialize theme from storage or default
    const saved = localStorage.getItem('theme') || 'light';
    setTheme(saved);

    if (toggle) {
        toggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            setTheme(current === 'dark' ? 'light' : 'dark');
        });
    }

    // scroll button logic
    const scrollBtn = document.getElementById('scroll-button');
    const scrollIcon = document.getElementById('scroll-icon');

    function updateScrollButton() {
        if (!scrollBtn || !scrollIcon) return;
        const atBottom = (window.innerHeight + window.pageYOffset) >= document.body.scrollHeight - 5;
        if (atBottom) {
            // if separate up/down files exist, swap src; otherwise rotate
            if (scrollIcon.dataset.down && scrollIcon.dataset.up) {
                scrollIcon.src = scrollIcon.dataset.up;
                scrollIcon.style.transform = 'rotate(0deg)';
            } else {
                scrollIcon.style.transform = 'rotate(180deg)';
            }
            scrollBtn.setAttribute('aria-label', 'Scroll to top');
            scrollBtn.setAttribute('title', 'Scroll to top');
        } else {
            if (scrollIcon.dataset.down && scrollIcon.dataset.up) {
                scrollIcon.src = scrollIcon.dataset.down;
                scrollIcon.style.transform = 'rotate(0deg)';
            } else {
                scrollIcon.style.transform = 'rotate(0deg)';
            }
            scrollBtn.setAttribute('aria-label', 'Scroll to bottom');
            scrollBtn.setAttribute('title', 'Scroll to bottom');
        }
    }

    if (scrollBtn && scrollIcon) {
        // initial state
        updateScrollButton();
        window.addEventListener('scroll', updateScrollButton);
        scrollBtn.addEventListener('click', () => {
            const atBottom = (window.innerHeight + window.pageYOffset) >= document.body.scrollHeight - 5;
            if (atBottom) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }
        });
    }
});
