import { computePosition, flip, size, autoUpdate } from "@floating-ui/dom";

class Menu {
    constructor(trigger, menu) {
        this.trigger = trigger;
        this.menu = menu;
        this.autoUpdating = false;
        this.menuHidden = true;

        this.addEventListeners();
    }

    startUpdating() {
        if (!this.autoUpdating) {
            this.autoUpdater = autoUpdate(this.trigger, this.menu, () => {
                this.updatePosition();
            });
            this.autoUpdating = true;
        }
    }

    stopUpdating() {
        let newMenu = this.menu.cloneNode(true);
        newMenu.removeAttribute("style");
        this.menu.remove();
        this.autoUpdater();
        this.trigger.after(newMenu);
        this.menu = newMenu;
        this.autoUpdating = false;
    }

    updatePosition() {
        computePosition(this.trigger, this.menu, {
            placement: "bottom-start",
            middleware: [
                flip(),
                size({
                    apply({ availableWidth, availableHeight, elements }) {
                        Object.assign(elements.floating.style, {
                            maxWidth: `${Math.min(256, Math.max(128, availableWidth - 8))}px`,
                            maxHeight: `${Math.min(256, Math.max(128, availableHeight - 8))}px`,
                        });
                    },
                }),
            ],
        }).then(async ({ x, y }) => {
            Object.assign(this.menu.style, {
                left: `${x}px`,
                top: `${y}px`,
            });
        });
    }

    hideMenu() {
        this.menu.scrollTop = 0;
        this.menu.style.display = "none";
        this.menuHidden = true;
        this.stopUpdating();
    }

    showMenu() {
        this.menu.style.display = "block";
        this.startUpdating();
        this.menuHidden = false;
    }

    addEventListeners() {
        this.trigger.addEventListener("click", () => {
            this.showMenu();
        });

        this.trigger.addEventListener("focus", (e) => {
            this.showMenu();
        });

        this.trigger.addEventListener("blur", (e) => {
            if (e.relatedTarget === null) {
                this.hideMenu();
            } else if (
                !e.relatedTarget.classList.contains("menu") &&
                !e.relatedTarget.classList.contains("menu__item")
            ) {
                this.hideMenu();
            }
        });

        document.addEventListener("click", (e) => {
            let triggerNodes = getDescendantNodes(this.trigger);
            let menuNodes = getDescendantNodes(this.menu);
            let thisMenuTargeted =
                e.target == this.menu ||
                e.target == this.trigger ||
                menuNodes.indexOf(e.target) !== -1 ||
                triggerNodes.indexOf(e.target) !== -1;
            if (!this.menuHidden && !thisMenuTargeted) {
                this.hideMenu();
            }
        });
    }
}

let triggers = document.querySelectorAll(".menu__trigger");
triggers.forEach((trigger) => {
    let menu = trigger.nextElementSibling;

    new Menu(trigger, menu);
});

function getDescendantNodes(node, all = []) {
    all.push(...node.childNodes);

    for (const child of node.childNodes) {
        getDescendantNodes(child, all);
    }

    return all;
}

/*
TODO: needs to support a lot more keyboard interactions, as described in
https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/examples/menu-button-actions-active-descendant/
*/
