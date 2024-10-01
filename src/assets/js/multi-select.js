import { computePosition, flip, shift, autoUpdate, offset, size } from "@floating-ui/dom";

class MultiSelect {
    constructor(container) {
        this.container = container;
        this.input = this.container.previousElementSibling;
        this.input.value = this.input.value.length ? this.input.value : JSON.stringify([]);

        this.typeahead = container.querySelector('.multi-select__typeahead');
        this.listbox = this.container.nextElementSibling;
        this.options = this.listbox.querySelectorAll('.multi-select__option');
        this.autoUpdating = false;
        this.listboxHidden = true;

        this.filterOptions(this.typeahead.value.toLowerCase().trim());
        this.addEventListeners();
    }

    startUpdating() {
        if (!this.autoUpdating) {
            this.autoUpdater = autoUpdate(this.container, this.listbox, () => {
                this.updatePosition();
            });
            this.autoUpdating = true;
        }
    }

    stopUpdating() {
        let newListbox = this.listbox.cloneNode(true);
        newListbox.removeAttribute("style");
        this.listbox.remove();
        this.autoUpdater();
        this.container.after(newListbox);
        this.listbox = newListbox;
        this.options = this.listbox.querySelectorAll('.multi-select__option');
        this.addOptionEventListeners();
        this.autoUpdating = false;
    }

    updatePosition() {
        computePosition(this.container, this.listbox, {
            placement: "bottom-start",
            middleware: [
                flip({ padding: 32 }),
                offset(-1),
                size({
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
            Object.assign(this.listbox.style, {
                left: `${x}px`,
                top: `${y}px`,
            });
        });
    }

    hideListbox() {
        this.listbox.scrollTop = 0;
        this.listbox.style.display = "none";
        this.listboxHidden = true;
        this.stopUpdating();
    }

    showListbox() {
        this.listbox.style.display = "block";
        this.startUpdating();
        this.listboxHidden = false;
    }

    addEventListeners() {
        this.container.addEventListener("click", () => {
            this.showListbox();
        });

        this.container.addEventListener("focus", (e) => {
            this.showListbox();
        });

        this.container.addEventListener("blur", (e) => {
            if (e.relatedTarget === null) {
                this.hideListbox();
            } else if (
                !e.relatedTarget.classList.contains("multi-select__listbox") &&
                !e.relatedTarget.classList.contains("multi-select__option")
            ) {
                this.hideListbox();
            }
        });

        this.typeahead.addEventListener("focus", () => {
            this.showListbox();
        });

        this.typeahead.addEventListener("keyup", (e) => {
            this.filterOptions(e.target.value.toLowerCase().trim());
            if (this.listboxHidden) {
                this.showListbox();
            }

            // TODO: Backspace when cursor position at start should delete last chip, or focus it?
        });

        this.addOptionEventListeners();

        document.addEventListener("click", (e) => {                
            if (!this.listboxHidden && !this.listbox.contains(e.target) && !this.container.contains(e.target)) {
                this.hideListbox();
            }
        });
    }

    hideEmptyParentGroup(option) {
        // If there's nothing left in this group, hide the group
        let siblings = option.parentNode.querySelectorAll(".multi-select__option");
        if ([...siblings].filter((sibling) => { return window.getComputedStyle(sibling).display !== "none"; }).length == 0) {
            option.parentNode.style.display = "none";
        }
    }

    filterOptions(searchValue) {
        let currentValue = JSON.parse(this.input.value);
        this.options.forEach((option) => {
            if (currentValue.indexOf(option.dataset.value) !== -1 || option.dataset.value.toLowerCase().indexOf(searchValue) === -1 || option.innerText.toLowerCase().indexOf(searchValue) === -1) {
                option.style.display = "none";
            } else {
                option.style.display = "block";
                if (option.parentNode.style.display == "none") {
                    option.parentNode.style.display = "block";
                }
            }

            this.hideEmptyParentGroup(option);
        });

        if ([...this.options].filter((option) => { return window.getComputedStyle(option).display !== "none"; }).length == 0) {
            this.listbox.classList.add('multi-select__listbox--empty');
            if (!this.listbox.lastElementChild.classList.contains('multi-select__no-results')) {
                let noResultsHTML = document
                .createRange()
                .createContextualFragment(
                    `<div class="multi-select__no-results">No matching options</div>`,
                );
                this.listbox.append(noResultsHTML);
            }
        } else {
            if (this.listbox.lastElementChild.classList.contains('multi-select__no-results')) {
                this.listbox.lastElementChild.remove();
            }
        }
    }

    addOptionEventListeners() {
        this.options.forEach((option) => {
            if (!option.getAttribute('aria-disabled') && !option.parentNode.getAttribute('aria-disabled')) {
                option.addEventListener("click", (e) => {
                    let chipHTML = document
                    .createRange()
                    .createContextualFragment(
                        `<button class="chip chip--dismissible" aria-controls="${e.target.id}" aria-label="${e.target.innerText} (Click to remove)">${e.target.innerText}<span class="system-icon system-icon--size-xs"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"> <path fill="currentColor" d="M19.53 18.22a.75.75 0 1 1-1.06 1.06l-6.22-6.22-6.22 6.22a.75.75 0 0 1-1.06-1.06L11.19 12 4.97 5.78a.75.75 0 0 1 1.06-1.06l6.22 6.22 6.22-6.22a.75.75 0 1 1 1.06 1.06L13.31 12l6.22 6.22Z"></path></svg></span></button>`,
                    );
                    
                    chipHTML.children[0].addEventListener('click', (e) => {
                        this.chipEventListener(e);
                    });

                    chipHTML.children[0].addEventListener('keyup', (e) => {
                        if (e.key == "Backspace" || e.key == "Delete") {
                            this.chipEventListener(e);
                        }
                    });

                    this.container.insertBefore(chipHTML, this.typeahead);

                    e.target.style.display = "none";

                    this.hideEmptyParentGroup(e.target);
            
                    let currentValue = JSON.parse(this.input.value);
                    currentValue.push(e.target.dataset.value);
                    
                    this.input.value = JSON.stringify(currentValue);

                    this.typeahead.focus();
                    this.filterOptions(this.typeahead.value.toLowerCase().trim());
                    if (this.listboxHidden) {
                        this.showListbox();
                    }

                    this.container.scrollLeft = this.container.scrollWidth;
                });
            }
        });
    }

    chipEventListener(e) {
        let option = document.getElementById(e.target.getAttribute('aria-controls'));
        option.style.display = "block";
        
        if (option.parentNode.style.display == "none") {
            option.parentNode.style.display = "block";
        }        
        let currentValue = JSON.parse(this.input.value);

        currentValue = currentValue.filter((value) => {
            return value !== option.dataset.value;
        });

        this.input.value = JSON.stringify(currentValue);

        this.filterOptions(this.typeahead.value.toLowerCase().trim());
        // TODO: idk if this should actually focus
        this.typeahead.focus();
        e.target.remove();  

        // TODO: this isn't actually filtering options, and showing the listbox. seems to be hiding in based on the document click event. WTF.
    }
}

let containers = document.querySelectorAll(".multi-select__container");
containers.forEach((container) => {
    new MultiSelect(container);
});

/*
TODO: needs to support a lot more keyboard interactions, as described in
https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/examples/menu-button-actions-active-descendant/
*/
