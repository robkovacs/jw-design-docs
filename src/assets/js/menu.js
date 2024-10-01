import { computePosition, flip, autoUpdate, size } from "@floating-ui/dom";

class Menu {
    constructor(trigger) {
        this.trigger = trigger;
        this.autoUpdating = false;

        this.setupMenu(this.trigger.nextElementSibling);
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
        this.setupMenu(newMenu);
        this.autoUpdating = false;
    }

    updatePosition() {
        computePosition(this.trigger, this.menu, {
            placement: "bottom-start",
            middleware: [
                flip({ padding: 32 }),
                size({
                    padding: 32,
                    apply({ availableHeight, elements }) {
                        Object.assign(elements.floating.style, {
                            // 228px = 5.5 items + listbox padding
                            maxHeight: `${Math.min(228, availableHeight)}px`,
                        });
                    },
                }),
            ],
        }).then(async ({ x, y }) => {
            Object.assign(this.menu.style, {
                left: `${x}px`,
                top: `${y}px`,
            });

            // // Sadly, just .focus()-ing a menu item isn't always enough
            // if ([...this.menuItems].indexOf(document.activeElement) !== 1) {
            //     this.menu.scrollTop = document.activeElement.offsetTop - 4;
            // }
        });
    }

    hideMenu() {
        this.trigger.setAttribute("aria-expanded", false);
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

        document.addEventListener("click", (e) => {
            if (
                !this.menu.hidden && 
                !this.menu.contains(e.target) &&
                !this.trigger.contains(e.target)
            ) {
                this.hideMenu();
            }
        });
    }

    setupMenu(menu) {
        this.menu = menu;
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
}

let triggers = document.querySelectorAll(".menu__trigger");
triggers.forEach((trigger) => {
    new Menu(trigger);
});
