import { computePosition, flip, autoUpdate, size } from "@floating-ui/dom";

class Menu {
    constructor(trigger) {
        this.trigger = trigger;
        this.menu = this.trigger.nextElementSibling;
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
            middleware: [flip(), size({
                padding: 32,
                apply({availableHeight, elements}) {
                    Object.assign(elements.floating.style, {
                        // 228px = 5.5 items + listbox padding
                        maxHeight: `${Math.min(228, availableHeight)}px`,
                    });
                }
            })
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
            let triggerNodes = this.getDescendantNodes(this.trigger);
            let menuNodes = this.getDescendantNodes(this.menu);
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

    getDescendantNodes(node, all = []) {
        all.push(...node.childNodes);
    
        for (const child of node.childNodes) {
            this.getDescendantNodes(child, all);
        }
    
        return all;
    }
}

let triggers = document.querySelectorAll(".menu__trigger");
triggers.forEach((trigger) => {
    new Menu(trigger);
});

/*
TODO: needs to support a lot more keyboard interactions, as described in
https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/examples/menu-button-actions-active-descendant/
*/
