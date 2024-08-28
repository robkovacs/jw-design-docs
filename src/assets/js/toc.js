
window.addEventListener("hashchange", () => {
    let tocLinks = document.querySelectorAll('.toc a');
    let currentLink = document.querySelector('.toc a.current');
    
    if (currentLink) {
        currentLink.classList.remove('current');
    }

    tocLinks.forEach((el) => {
        if (location.hash == el.getAttribute('href')) {
            el.classList.add('current');
        }
    });
});

let firstTocLink = document.querySelector('.toc a');
if (firstTocLink) {
    firstTocLink.classList.add('current');
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        const targetId = entry.target.getAttribute('id');
        if (entry.isIntersecting) {
            document.querySelector('.toc a.current').classList.remove('current');
            document.querySelector('.toc a[href="#' + targetId + '"]').classList.add('current');
        }
        // TODO: fix hashchange outcome getting overridden by observer
    });
}, {
    rootMargin: "0px 0px -50% 0px",
    threshold: 0
});

document.querySelectorAll('.toc__heading').forEach((heading) => {
    observer.observe(heading);
});

