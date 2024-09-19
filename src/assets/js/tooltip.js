import {
    arrow,
    autoUpdate,
    computePosition,
    flip,
    inline,
    offset,
    size,
} from "@floating-ui/dom";

class Tooltip {
    constructor(trigger, tooltip) {
        this.trigger = trigger;
        this.tooltip = tooltip;
        this.arrow = this.tooltip.querySelector(".tooltip__arrow");

        this.addEventListeners();
    }

    startUpdating() {
        if (!this.autoUpdating) {
            this.autoUpdater = autoUpdate(this.trigger, this.tooltip, () => {
                this.updatePosition();
            });
            this.autoUpdating = true;
        }
    }

    stopUpdating() {
        let newTooltip = this.tooltip.cloneNode(true);
        newTooltip.removeAttribute("style");
        newTooltip.querySelector(".tooltip__arrow").removeAttribute("style");
        this.tooltip.remove();
        this.autoUpdater();
        this.trigger.after(newTooltip);
        this.tooltip = newTooltip;
        this.arrow = newTooltip.querySelector(".tooltip__arrow");
        this.autoUpdating = false;
    }

    updatePosition() {
        let placement = this.tooltip.dataset.placement
            ? this.tooltip.dataset.placement
            : "top";
        computePosition(this.trigger, this.tooltip, {
            placement: placement,
            middleware: [
                inline(),
                flip({
                    fallbackAxisSideDirection: "start",
                }),
                offset(8),
                size({
                    apply({ availableWidth, availableHeight, elements }) {
                        Object.assign(elements.floating.style, {
                            maxWidth: `${Math.min(256, Math.max(128, availableWidth - 8))}px`,
                            maxHeight: `${Math.min(256, Math.max(128, availableHeight - 8))}px`,
                        });
                    },
                }),
                arrow({ element: this.arrow }),
            ],
        }).then(({ x, y, placement, middlewareData }) => {
            Object.assign(this.tooltip.style, {
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

            Object.assign(this.arrow.style, {
                left: arrowX != null ? `${arrowX}px` : "",
                top: arrowY != null ? `${arrowY}px` : "",
                right: "",
                bottom: "",
                [staticSide]: "-4px",
            });
        });
    }

    showTooltip() {
        this.tooltip.style.display = "block";
        this.startUpdating();
    }

    hideTooltip() {
        this.tooltip.style.display = "none";
        this.stopUpdating();
    }

    addEventListeners() {
        this.trigger.addEventListener("mouseenter", () => {
            this.showTooltip();
        });

        this.trigger.addEventListener("focus", () => {
            this.showTooltip();
        });

        this.trigger.addEventListener("mouseleave", () => {
            this.hideTooltip();
        });

        this.trigger.addEventListener("blur", () => {
            this.hideTooltip();
        });
    }
}

let triggers = document.querySelectorAll(".tooltip__trigger");

triggers.forEach((trigger) => {
    let tooltip = trigger.nextElementSibling;

    new Tooltip(trigger, tooltip);
});
