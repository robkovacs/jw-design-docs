window.addEventListener("hashchange", () => {
    let tocLinks = document.querySelectorAll('.toc a');
    tocLinks.forEach((el) => {
        el.classList.remove('current');
    });
    tocLinks.forEach((el) => {
        if (location.hash == el.getAttribute('href')) {
            el.classList.add('current');
        }
    });
});