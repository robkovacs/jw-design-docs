
const setCurrentFromHash = () => {
    let tocLinks = document.querySelectorAll('.toc a');
    let currentLink = document.querySelector('.toc a.current');
    
    if (currentLink) {
        currentLink.classList.remove('current');
    }
    
    tocLinks.forEach((el) => {
        if (window.location.hash == el.getAttribute('href')) {
            el.classList.add('current');
            document.querySelector(el.getAttribute('href')).scrollIntoView();
        }
    });
};

window.addEventListener("hashchange", setCurrentFromHash);

window.addEventListener("load", setCurrentFromHash);

document.querySelectorAll('.toc a').forEach((link) => {
    link.addEventListener("click", setCurrentFromHash);
})

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        const targetId = entry.target.getAttribute('id');
        const currentLink = document.querySelector('.toc a.current');
        if (entry.isIntersecting) {
            if (currentLink) {
                currentLink.classList.remove('current');
            }
            document.querySelector('.toc a[href="#' + targetId + '"]').classList.add('current');
            window.history.pushState(null, null, '#'+targetId);
        } else {
            // document.querySelector('.toc a[href="#' + targetId + '"]').classList.remove('current');
            // TODO: if leaving on the bottom, move to previous (if any)
            // if leaving on the top, move to next (if any)
            // Cound this be done with two observers: one at the top of the viewport, and one at the bottom???
        }
    });
}, {
    threshold: 0
});

document.querySelectorAll('.toc__heading').forEach((heading) => {
    observer.observe(heading); 
});

