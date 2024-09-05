let mainNav = document.querySelector('.main-nav');
let mainNavButton = document.querySelector('.mobile-header__button');
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