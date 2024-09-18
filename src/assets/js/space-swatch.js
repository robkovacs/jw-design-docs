import createToast from "./toast.js";

let spaceSwatchButton = document.querySelectorAll(".space-swatch__button");

spaceSwatchButton.forEach((el) => {
    el.addEventListener("click", (e) => {
        e.preventDefault();
        createToast(e.currentTarget.dataset.copyText, "Copied!");
    });
});
