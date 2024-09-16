function setLeftShadowPosition() {
    let leftShadows = document.querySelectorAll(".table__container .table__scroll-shadow--left");

    leftShadows.forEach((shadow) => {
        let widthBasis = shadow.nextElementSibling.querySelector("th:first-child");
        
        console.log(widthBasis.offsetWidth);
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
    
    container.addEventListener("scroll", (e) => {
        console.log(e.target.scrollLeft, e.target.offsetWidth, table.offsetWidth);
        if (e.target.scrollLeft > 0) {
            leftShadow.style.opacity = 1;
            leftShadow.style.minWidth = "0.75rem";
            if (e.target.scrollLeft + e.target.offsetWidth >= table.offsetWidth) {
                console.log("end");
                rightShadow.style.opacity = 0;
                rightShadow.style.minWidth = 0;
            } else {
                rightShadow.style.opacity = 1;
                rightShadow.style.minWidth = "0.75rem";
            }
        } else if (e.target.scrollLeft == 0) {
            console.log("beginning");
            leftShadow.style.opacity = 0;
            leftShadow.style.minWidth = 0;
        }
    });

});
