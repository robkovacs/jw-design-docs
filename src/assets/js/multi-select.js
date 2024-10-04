import { computePosition, flip, autoUpdate, offset, size } from "@floating-ui/dom";
class MultiSelect {
    constructor(container) {
        this.container = container;
        this.innerContainer = this.container.firstElementChild;
        this.input = this.container.previousElementSibling;
        this.input.value = this.input.value.length ? this.input.value : JSON.stringify([]);

        this.typeahead = this.container.querySelector(".multi-select__typeahead");

        this.setupListbox();
        this.addContainerEventListeners();
    }

    addContainerEventListeners() {
        this.container.addEventListener("click", (e) => {
            if (e.target === this.container && this.enabledOptions.length) {
                this.showListbox();
            }
        });

        this.typeahead.addEventListener("click", (e) => {
            if (this.enabledOptions.length) {
                this.showListbox();
            }
        });

        this.typeahead.addEventListener("input", (e) => {
            if (e.target.value) {
                this.showListbox();
            } else {
                this.hideListbox();
            }

            this.updateListboxContents();
            this.clearActiveDescendant();
        });

        this.typeahead.addEventListener("keydown", (e) => {
            let isCursorAtStart = e.target.selectionStart === 0 && e.target.selectionEnd === 0;

            if (e.key === "ArrowDown") {
                e.preventDefault();

                if (this.listbox.hidden) {
                    this.showListbox();
                }

                this.setActiveDescendant("next");
            }

            if (e.key === "ArrowUp") {
                e.preventDefault();

                if (this.listbox.hidden) {
                    this.showListbox();
                }

                this.setActiveDescendant("previous");
            }

            if (e.key === "ArrowLeft" && isCursorAtStart) {
                e.preventDefault();
                if (e.target.previousElementSibling) {
                    e.target.previousElementSibling.focus();
                }
            }

            if (e.key === "Escape" || (!e.shiftKey && e.key === "Tab")) {
                if (!this.listbox.hidden) {
                    e.preventDefault();
                    this.hideListbox();
                }
            }

            if (e.shiftKey && e.key === "Tab") {
                if (e.target.previousElementSibling) {
                    e.preventDefault();
                    e.target.previousElementSibling.focus();
                }
            }

            if (e.key === "Enter") {
                if (this.activeDescendant && !this.listbox.hidden) {
                    this.selectOption(this.activeDescendant);
                }
            }

            if (e.key === "Backspace" && isCursorAtStart) {
                e.preventDefault();
                if (e.target.previousElementSibling) {
                    this.removeChip(e.target.previousElementSibling);
                }
            }
        });

        document.addEventListener("click", (e) => {
            if (
                !this.listbox.hidden &&
                !this.listbox.contains(e.target) &&
                !this.container.contains(e.target)
            ) {
                this.hideListbox();
            }
        });
    }

    setupListbox() {
        this.listbox = this.container.nextElementSibling;
        this.enabledOptions = this.listbox.querySelectorAll(
            '.multi-select__option:not([aria-disabled="true"])',
        );
        this.options = this.listbox.querySelectorAll(".multi-select__option");
        this.updateListboxContents();
        this.addOptionEventListeners();
        this.autoUpdatingListboxPosition = false;
    }

    showListbox() {
        this.listbox.hidden = false;
        this.startUpdatingListboxPosition();
    }

    hideListbox() {
        this.listbox.hidden = true;
        this.listbox.scrollTop = 0;
        this.stopUpdatingListboxPosition();
    }

    updateListboxPosition() {
        computePosition(this.container, this.listbox, {
            placement: "bottom-start",
            middleware: [
                flip({ padding: 32 }),
                offset(-1),
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
            Object.assign(this.listbox.style, {
                left: `${x}px`,
                top: `${y}px`,
            });
        });
    }

    startUpdatingListboxPosition() {
        if (!this.autoUpdatingListboxPosition) {
            this.listboxPositionAutoUpdater = autoUpdate(this.container, this.listbox, () => {
                this.updateListboxPosition();
            });
            this.autoUpdatingListboxPosition = true;
        }
    }

    stopUpdatingListboxPosition() {
        let newListbox = this.listbox.cloneNode(true);
        newListbox.removeAttribute("style");
        this.listbox.remove();
        this.listboxPositionAutoUpdater();
        this.container.after(newListbox);

        this.setupListbox();
    }

    addOptionEventListeners() {
        this.enabledOptions.forEach((option) => {
            option.addEventListener("click", (e) => {
                this.selectOption(e.target);
            });

            option.addEventListener("mousemove", (e) => {
                this.setActiveDescendant(e.target, false);
            });

            option.addEventListener("mouseleave", (e) => {
                this.clearActiveDescendant();
            });
        });
    }

    updateListboxContents() {
        this.options.forEach((option) => {
            option.hidden = false;
        });

        let filterString = this.typeahead.value.toLowerCase().trim();

        if (filterString) {
            let currentValue = JSON.parse(this.input.value);
            this.options.forEach((option) => {
                if (
                    currentValue.indexOf(option.dataset.value) !== -1 ||
                    (option.dataset.value.toLowerCase().indexOf(filterString) === -1 &&
                        option.innerText.toLowerCase().indexOf(filterString) === -1)
                ) {
                    option.hidden = true;
                }
            });
        }

        if (this.innerContainer.querySelectorAll(".chip")) {
            this.innerContainer.querySelectorAll(".chip").forEach((chip) => {
                let controlledOption = document.getElementById(chip.getAttribute("aria-controls"));
                controlledOption.hidden = true;
            });
        }

        let optionGroups = this.listbox.querySelectorAll(".multi-select__optgroup-options");

        optionGroups.forEach((group) => {
            if (group.querySelectorAll(".multi-select__option:not([hidden])").length) {
                group.parentNode.hidden = false;
            } else {
                group.parentNode.hidden = true;
            }
        });

        if (this.listbox.querySelectorAll(".multi-select__option:not([hidden])").length) {
            this.listbox.querySelector(".multi-select__listbox-empty-message").hidden = true;
        } else {
            this.listbox.querySelector(".multi-select__listbox-empty-message").hidden = false;
        }
    }

    selectOption(option) {
        option.hidden = true;
        option.setAttribute("aria-selected", true);

        let currentInputValue = JSON.parse(this.input.value);
        currentInputValue.push(option.dataset.value);
        this.input.value = JSON.stringify(currentInputValue);

        this.addChip(option);
        this.updateListboxContents();
        this.setActiveDescendant("next");
    }

    addChip(option) {
        let chipHTML = document
            .createRange()
            .createContextualFragment(
                `<button class="chip chip--dismissible" aria-controls="${option.id}" aria-label="${option.innerText} (Click to remove)">${option.innerText}<span class="system-icon system-icon--size-xs"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"> <path fill="currentColor" d="M19.53 18.22a.75.75 0 1 1-1.06 1.06l-6.22-6.22-6.22 6.22a.75.75 0 0 1-1.06-1.06L11.19 12 4.97 5.78a.75.75 0 0 1 1.06-1.06l6.22 6.22 6.22-6.22a.75.75 0 1 1 1.06 1.06L13.31 12l6.22 6.22Z"></path></svg></span></button>`,
            ).children[0];

        chipHTML.addEventListener("click", (e) => {
            e.stopImmediatePropagation();
            this.removeChip(e.target);
        });

        chipHTML.addEventListener("keydown", (e) => {
            if (e.key === "Backspace" || e.key === "Delete") {
                this.removeChip(e.target);
            }

            if (e.key === "ArrowLeft" && e.target.previousElementSibling) {
                e.target.previousElementSibling.focus();
            }

            if (e.key === "ArrowRight" && e.target.nextElementSibling) {
                e.target.nextElementSibling.focus();
            }

            if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                if (this.listbox.hidden) {
                    this.showListbox();
                }

                this.setActiveDescendant("first");

                this.focusTypeahead();
            }

            if (e.shiftKey && e.key === "Tab") {
                if (!e.target.previousElementSibling) {
                    this.hideListbox();
                }
            }
        });

        this.typeahead.parentNode.insertBefore(chipHTML, this.typeahead);
        this.focusTypeahead();
    }

    removeChip(chip) {
        let controlledOption = document.getElementById(chip.getAttribute("aria-controls"));
        chip.remove();
        this.deselectOption(controlledOption);
        this.focusTypeahead();
    }

    deselectOption(deselectedOption) {
        deselectedOption.hidden = false;
        deselectedOption.setAttribute("aria-selected", false);

        if (deselectedOption.parentNode.hidden) {
            deselectedOption.parentNode.hidden = false;
        }

        let currentInputValue = JSON.parse(this.input.value);

        currentInputValue = currentInputValue.filter((value) => {
            return value !== deselectedOption.dataset.value;
        });

        this.input.value = JSON.stringify(currentInputValue);

        this.updateListboxContents();
    }

    setActiveDescendant(target = "first", scrollToActiveDescendant = true) {
        let targetActiveDescendant;
        
        let enabledVisibleOptions = [...this.enabledOptions].filter((option) => {
            return !option.hidden;
        });

        let enabledVisibleOptionsPlusCurrent = [...this.enabledOptions].filter((option) => {
            return !option.hidden || option === this.activeDescendant;
        });
       
        if (enabledVisibleOptions.length) {
            if (target === "first") {
                targetActiveDescendant = enabledVisibleOptions[0];
            } else if (target === "last") {
                targetActiveDescendant = enabledVisibleOptions.slice(-1)[0];
            } else if (target === "previous") {
                let currentIndex = enabledVisibleOptionsPlusCurrent.indexOf(this.activeDescendant);
                
                if (this.activeDescendant && currentIndex !== 0) {
                    targetActiveDescendant = enabledVisibleOptionsPlusCurrent[currentIndex - 1];
                } else {
                    this.setActiveDescendant("last");
                    return;
                }
            } else if (target === "next") {
                let currentIndex = enabledVisibleOptionsPlusCurrent.indexOf(this.activeDescendant);
                
                if (this.activeDescendant && currentIndex !== enabledVisibleOptionsPlusCurrent.length - 1) {
                    targetActiveDescendant = enabledVisibleOptionsPlusCurrent[currentIndex + 1];
                } else {
                    this.setActiveDescendant("first");
                    return;
                }
            } else {
                // target is a specific element
                targetActiveDescendant = target;
            }
        } else {
            this.clearActiveDescendant();
            return; // nothing to set it to
        }
        console.log("oppo:", targetActiveDescendant);

        if (this.activeDescendant) {
            this.activeDescendant.classList.remove("is--aria-activedescendant");
        }

        this.typeahead.setAttribute(
            "aria-activedescendant",
            targetActiveDescendant.getAttribute("id"),
        );
        
        targetActiveDescendant.classList.add("is--aria-activedescendant");
        this.activeDescendant = targetActiveDescendant;

        if (scrollToActiveDescendant) {
            let targetActiveDescendantHidingAbove =
                targetActiveDescendant.getBoundingClientRect().top <
                this.listbox.getBoundingClientRect().top;
            if (
                !targetActiveDescendant.previousElementSibling &&
                targetActiveDescendantHidingAbove &&
                targetActiveDescendant.parentNode.previousElementSibling.classList.contains(
                    "multi-select__optgroup-label",
                )
            ) {
                var scrollTarget = targetActiveDescendant.parentNode.previousElementSibling;
            } else {
                var scrollTarget = targetActiveDescendant;
            }

            scrollTarget.scrollIntoView({
                block: "nearest",
            });
        }
    }

    clearActiveDescendant() {
        this.typeahead.removeAttribute("aria-activedescendant");
        this.activeDescendant = null;

        let currentActiveDescendant = [...this.options].filter((option) => {
            return option.classList.contains("is--aria-activedescendant");
        });

        if (currentActiveDescendant.length > 0) {
            currentActiveDescendant[0].classList.remove("is--aria-activedescendant");
        }
    }

    focusTypeahead() {
        this.typeahead.focus({ preventScroll: true });
        if (
            this.container.getBoundingClientRect().right -
                this.typeahead.getBoundingClientRect().left <
            96
        ) {
            this.container.scrollLeft = this.typeahead.offsetLeft - 96;
        }
    }
}

let containers = document.querySelectorAll(".multi-select__container");
containers.forEach((container) => {
    new MultiSelect(container);
});
