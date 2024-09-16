function setLeftShadowPosition() {
    let leftShadows = document.querySelectorAll(".table__container .table__scroll-shadow--left");

    leftShadows.forEach((shadow) => {
        let widthBasis = shadow.nextElementSibling.querySelector("th:first-child");
        shadow.style.left = ((widthBasis.offsetWidth) / 16) + "rem";
    });
}

window.addEventListener("resize", () => {
    setLeftShadowPosition();
});

window.addEventListener("orientationchange", () => {
    setLeftShadowPosition();
});

setLeftShadowPosition();

let tableContainers = document.querySelectorAll(".table__container");

tableContainers.forEach((container) => {
    let table = container.querySelector(".table");
    let leftShadow = container.querySelector(".table__scroll-shadow--left");
    let rightShadow = container.querySelector(".table__scroll-shadow--right");
    let shadowWidth = window.getComputedStyle(leftShadow, ":before").width;
        
    if (container.offsetWidth < table.offsetWidth) {
        container.classList.add("table__container--scrollable-horizontal");
    }

    container.addEventListener("scroll", (e) => {
        if (e.target.scrollLeft > parseInt(shadowWidth, 10)) {
            e.target.classList.add('table__container--scrolled-right');
            if (e.target.scrollLeft + e.target.offsetWidth >= table.offsetWidth) {
                e.target.classList.add('table__container--scrolled-to-right');
            } else {
                e.target.classList.remove('table__container--scrolled-to-right'); 
            }
        } else if (e.target.scrollLeft <= parseInt(shadowWidth, 10)) {
            e.target.classList.remove('table__container--scrolled-right');
        }
    });

});
