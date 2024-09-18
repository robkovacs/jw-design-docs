const setCurrentFromHash = () => {
    let tocLinks = document.querySelectorAll(".toc a");
    let currentLink = document.querySelector(".toc a.current");

    if (currentLink) {
        currentLink.classList.remove("current");
    }

    tocLinks.forEach((el) => {
        if (window.location.hash == el.getAttribute("href")) {
            el.classList.add("current");
            // document.querySelector(el.getAttribute('href')).scrollIntoView();
        }
    });
};

window.addEventListener("hashchange", setCurrentFromHash);

window.addEventListener("load", setCurrentFromHash);

document.querySelectorAll(".toc a").forEach((link) => {
    link.addEventListener("click", setCurrentFromHash);
});

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            const targetId = entry.target.firstElementChild.getAttribute("id");
            const currentLink = document.querySelector(".toc a.current");
            if (entry.isIntersecting) {
                if (currentLink) {
                    currentLink.classList.remove("current");
                }
                document
                    .querySelector('.toc a[href="#' + targetId + '"]')
                    .classList.add("current");
                window.history.replaceState(null, null, "#" + targetId);
            }
        });
    },
    {
        rootMargin: "0px 0px -75% 0px",
        threshold: 0,
    },
);

document.querySelectorAll("section:has(.toc__heading)").forEach((section) => {
    observer.observe(section);
});
