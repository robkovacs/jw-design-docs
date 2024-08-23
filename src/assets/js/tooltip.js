import { computePosition, flip, shift, offset, arrow, inline } from "@floating-ui/dom";

let triggers = document.querySelectorAll(".tooltip__trigger");

let hideTooltip = function (tooltip) {
    tooltip.style.display = "none";
};

let showTooltip = function (trigger, tooltip) {
    tooltip.style.display = "block";
    update(trigger, tooltip);
};

let update = function (trigger, tooltip) {
    let arrowElement = tooltip.querySelector(".tooltip__arrow");
    let placement = "top";
    
    if (tooltip.dataset.placement) {
        placement = tooltip.dataset.placement;
    }
    
    computePosition(trigger, tooltip, {
        placement: placement,
        middleware: [flip(), inline(), shift({padding: 16}), offset(8), arrow({ element: arrowElement })],
    }).then(({ x, y, placement, middlewareData }) => {
        Object.assign(tooltip.style, {
            left: `${x}px`,
            top: `${y}px`,
        });

        const { x: arrowX, y: arrowY } = middlewareData.arrow;

        const staticSide = {
            top: "bottom",
            right: "left",
            bottom: "top",
            left: "right",
        }[placement.split("-")[0]];

        Object.assign(arrowElement.style, {
            left: arrowX != null ? `${arrowX}px` : "",
            top: arrowY != null ? `${arrowY}px` : "",
            right: "",
            bottom: "",
            [staticSide]: "-4px",
        });
    });
};

triggers.forEach((el) => {
    let trigger = el;
    let tooltip = el.nextElementSibling;

    trigger.addEventListener("mouseenter", () => {
        showTooltip(trigger, tooltip);
    });

    trigger.addEventListener("focus", () => {
        showTooltip(trigger, tooltip);
    });

    trigger.addEventListener("mouseleave", () => {
        hideTooltip(tooltip);
    });

    trigger.addEventListener("blur", () => {
        hideTooltip(tooltip);
    });
});
