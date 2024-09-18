import createToast from "./toast.js";

let colorSwatchButton = document.querySelectorAll(".color-swatch__button");

colorSwatchButton.forEach((el) => {
    el.addEventListener("click", (e) => {
        e.preventDefault();
        createToast(e.currentTarget.dataset.copyText, "Copied!");
    });
});
