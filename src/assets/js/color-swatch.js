import createToast from "./toast.js";

let colorSwatchButtons = document.querySelectorAll(
    ".color-swatch__button:not(.color-swatch__button--hex)",
);
let colorSwatchHexButtons = document.querySelectorAll(
    ".color-swatch__button--hex",
);

colorSwatchHexButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        e.preventDefault();
        let computedBgColor = window.getComputedStyle(
            e.currentTarget
                .closest(".color-swatch")
                .querySelector(".color-swatch__preview > span"),
        ).backgroundColor;
        e.currentTarget.dataset.copyText =
            computedBgColorToHexA(computedBgColor);
        createToast(e.currentTarget.dataset.copyText, "Copied!");
    });
});

colorSwatchButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        e.preventDefault();
        createToast(e.currentTarget.dataset.copyText, "Copied!");
    });
});

function computedBgColorToHexA(color) {
    let sep = color.indexOf(",") > -1 ? "," : " ";
    let substr = color.indexOf("rgba") > -1 ? 5 : 4;

    color = color.substr(substr).split(")")[0].split(sep);

    if (color.indexOf("/") > -1) color.splice(3, 1);

    for (let R in color) {
        let r = color[R];
        if (r.indexOf("%") > -1) {
            let p = r.substr(0, r.length - 1) / 100;

            if (R < 3) {
                color[R] = Math.round(p * 255);
            } else {
                color[R] = p;
            }
        }
    }

    let r = (+color[0]).toString(16),
        g = (+color[1]).toString(16),
        b = (+color[2]).toString(16),
        a = "";

    if (color[3]) {
        a = Math.round(+color[3] * 255).toString(16);
    }

    if (r.length == 1) r = "0" + r;
    if (g.length == 1) g = "0" + g;
    if (b.length == 1) b = "0" + b;
    if (a.length == 1) a = "0" + a;

    return "#" + r + g + b + a;
}
