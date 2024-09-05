let mainNav = document.querySelector('.main-nav');
let mainNavButton = document.querySelector('.mobile-header__menu-button');
let mainNavBackdrop = document.querySelector('.main-nav__backdrop');

function toggleMainNav() {
    if (mainNav.classList.contains('main-nav--open')) {
        closeMainNav();
    } else {
        mainNav.classList.add('main-nav--open');
    }
}

function closeMainNav() {
    mainNav.classList.remove('main-nav--open');
    mainNav.scrollTop = 0;
}

mainNavButton.addEventListener('click', toggleMainNav);
mainNavBackdrop.addEventListener('click', toggleMainNav);

window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 48rem)').matches) {
        closeMainNav();
    }
});

window.addEventListener('orientationchange', () => {
    if (window.matchMedia('(min-width: 48rem)').matches) {
        closeMainNav();
    }
});

document.querySelector('.mobile-header__theme-button').addEventListener("click", (e) => {
    const currentState = e.target.getAttribute("aria-checked") === "true";
    const newState = String(!currentState);
    e.target.setAttribute("aria-checked", newState);

    toggle();
});

let userPreference = localStorage.getItem('appearance') || 'auto';
const query = window.matchMedia('(prefers-color-scheme: dark)');
let isDark = userPreference === 'auto' ? query.matches : userPreference === 'dark';

setClass(isDark);

function setClass(dark) {
    let themeButton = document.querySelector('.mobile-header__theme-button');
    if (dark) {
        document.documentElement.dataset.appearanceMode = "dark";
        themeButton.setAttribute("aria-checked", "true");
    } else {
        document.documentElement.removeAttribute('data-appearance-mode');
        themeButton.setAttribute("aria-checked", "false");
    }
}
  
function toggle() {
    setClass((isDark = !isDark));
    localStorage.setItem(
        'appearance',
        (userPreference = isDark ? (query.matches ? 'auto' : 'dark') : query.matches ? 'light' : 'auto')
    )
}

query.onchange = (e) => {
    if (userPreference === 'auto') {
        setClass((isDark = e.matches));
    }
}