import { computePosition, flip, autoUpdate, size } from "@floating-ui/dom";

class Menu {
    constructor(trigger) {
        this.trigger = trigger;
        this.menu = this.trigger.nextElementSibling;
        this.autoUpdating = false;

        this.setupMenuItems();        
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
        this.setupMenuItems();
        this.autoUpdating = false;
    }

    updatePosition() {
        computePosition(this.trigger, this.menu, {
            placement: "bottom-start",
            middleware: [flip({ padding: 32 }), size({
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

            if ([...this.menuItems].indexOf(document.activeElement) !== 1) {
                this.menu.scrollTo(0, document.activeElement.offsetTop - 4);
            }
        });
    }

    hideMenu() {
        this.menu.scrollTop = 0;
        this.menu.hidden = true;
        this.stopUpdating();
    }

    showMenu() {
        this.trigger.setAttribute("aria-expanded", true);
        this.menu.hidden = false;
        this.startUpdating();
    }

    addEventListeners() {
        this.trigger.addEventListener("click", () => {
            this.showMenu();
            this.menuItems[0].focus();
        });

        this.trigger.addEventListener("keydown", (e) => {
            if (e.key === "ArrowDown") {
                e.preventDefault();
                this.showMenu();
                this.menuItems[0].focus();
            }

            if (e.key === "ArrowUp") {
                e.preventDefault();
                this.showMenu();
                this.menuItems[this.menuItems.length - 1].focus();
            }
        });
        
        // this may be unnecessary?
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
            if (!this.menu.hidden && !thisMenuTargeted) {
                this.hideMenu();
            }
        });
    }

    setupMenuItems() {
        this.menuItems = this.menu.querySelectorAll('[role="menuitem"]');
        this.menuItems.forEach((el) => {
            el.addEventListener("keydown", (e) => {
                if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                    e.preventDefault();
                    if (e.target.previousElementSibling) {
                        e.target.previousElementSibling.focus();
                    } else {
                        e.target.parentNode.lastElementChild.focus();
                    }
                }

                if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                    e.preventDefault();
                    if (e.target.nextElementSibling) {
                        e.target.nextElementSibling.focus();
                    } else {
                        e.target.parentNode.firstElementChild.focus();
                    }
                }

                if (e.key === "Escape") {
                    e.preventDefault();
                    this.hideMenu();
                    this.trigger.focus();
                }

                if (e.key === "Tab" || (e.shiftKey && e.key === "Tab")) {
                    e.preventDefault();
                    this.hideMenu();
                    this.trigger.focus();
                }
            });
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
