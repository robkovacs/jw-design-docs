import {
    computePosition,
    flip,
    autoUpdate,
    offset,
    size,
} from "@floating-ui/dom";

class MultiSelect {
    constructor(container) {
        this.container = container;
        this.input = this.container.previousElementSibling;
        this.input.value = this.input.value.length
            ? this.input.value
            : JSON.stringify([]);

        this.typeahead = this.container.querySelector(
            ".multi-select__typeahead",
        );

        this.setupListbox();
        this.addContainerEventListeners();
    }

    startUpdatingListboxPosition() {
        if (!this.autoUpdatingListboxPosition) {
            this.listboxPositionAutoUpdater = autoUpdate(
                this.container,
                this.listbox,
                () => {
                    this.updateListboxPosition();
                },
            );
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

    hideListbox() {
        this.listbox.hidden = true;
        this.listbox.scrollTop = 0;
        this.stopUpdatingListboxPosition();
    }

    showListbox() {
        this.listbox.hidden = false;
        this.startUpdatingListboxPosition();
    }

    addContainerEventListeners() {
        this.container.addEventListener("click", (e) => {
            if (e.target === this.container && this.enabledOptions.length) {
                this.showListbox();
            }
        });

        this.typeahead.addEventListener("click", (e) => {
            if (e.target === this.typeahead && this.enabledOptions.length) {
                this.showListbox();
            }
        });

        this.typeahead.addEventListener("input", (e) => {
            if (e.target.value.toLowerCase().trim()) {
                this.filterOptions(e.target.value.toLowerCase().trim());
                if (this.listbox.hidden) {
                    this.showListbox();
                }
            } else {
                this.filterOptions(e.target.value.toLowerCase().trim());
                if (!this.listbox.hidden) {
                    this.hideListbox();
                }
            }
        });

        this.typeahead.addEventListener("keydown", (e) => {
            if (e.key === "ArrowDown") {
                e.preventDefault();

                if (this.listbox.hidden) {
                    this.showListbox();
                }

                let enabledVisibleOptions = [...this.enabledOptions].filter(
                    (option) => {
                        return !option.hidden;
                    },
                );

                if (enabledVisibleOptions.length) {
                    this.showListbox();
                    if (
                        enabledVisibleOptions.indexOf(this.activeDescendant) <
                        enabledVisibleOptions.length - 1
                    ) {
                        this.setActiveDescendant(
                            enabledVisibleOptions[
                                enabledVisibleOptions.indexOf(
                                    this.activeDescendant,
                                ) + 1
                            ],
                        );
                    } else {
                        this.setActiveDescendant(enabledVisibleOptions[0]);
                    }
                }
            }

            if (e.key === "ArrowUp") {
                e.preventDefault();

                if (this.listbox.hidden) {
                    this.showListbox();
                }

                let enabledVisibleOptions = [...this.enabledOptions].filter(
                    (option) => {
                        return !option.hidden;
                    },
                );

                if (enabledVisibleOptions.length) {
                    if (
                        this.activeDescendant &&
                        enabledVisibleOptions.indexOf(this.activeDescendant) > 0
                    ) {
                        this.setActiveDescendant(
                            enabledVisibleOptions[
                                enabledVisibleOptions.indexOf(
                                    this.activeDescendant,
                                ) - 1
                            ],
                        );
                    } else {
                        this.setActiveDescendant(
                            enabledVisibleOptions[
                                enabledVisibleOptions.length - 1
                            ],
                        );
                    }
                }
            }

            if (e.key === "Escape" || e.key === "Tab") {
                if (!this.listbox.hidden) {
                    e.preventDefault();
                    this.hideListbox();
                }
            }

            if (e.key === "Enter") {
                this.selectOption(this.activeDescendant);
            }

            if (
                e.key === "Backspace" &&
                e.target.selectionStart === 0 &&
                e.target.selectionEnd === 0
            ) {
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
        this.filterOptions(this.typeahead.value.toLowerCase().trim());
        this.autoUpdatingListboxPosition = false;
        this.addOptionEventListeners();
    }

    addOptionEventListeners() {
        this.enabledOptions.forEach((option) => {
            option.addEventListener("click", (e) => {
                this.selectOption(e.target);
            });

            option.addEventListener("mouseenter", (e) => {
                // TODO: this can make scrolling the list while your mouse is hovered over the listbox a little funky
                this.setActiveDescendant(e.target, false);
            });
        });
    }

    selectOption(option) {
        this.addChip(option);

        let enabledVisibleOptions = [...this.enabledOptions].filter(
            (option) => {
                return !option.hidden;
            },
        );

        option.hidden = true;

        this.hideParentGroupIfEmpty(option);

        let currentValue = JSON.parse(this.input.value);
        currentValue.push(option.dataset.value);

        this.input.value = JSON.stringify(currentValue);

        this.typeahead.focus();

        this.filterOptions(this.typeahead.value.toLowerCase().trim());

        if (this.listbox.hidden) {
            this.showListbox();
        }

        if (enabledVisibleOptions.length) {
            this.showListbox();
            if (
                enabledVisibleOptions.indexOf(option) <
                enabledVisibleOptions.length - 1
            ) {
                this.setActiveDescendant(
                    enabledVisibleOptions[
                        enabledVisibleOptions.indexOf(option) + 1
                    ],
                );
            } else {
                this.setActiveDescendant(enabledVisibleOptions[0]);
            }
        }

        // TODO: this positioning logic still feels a little off
        if (this.typeahead.getBoundingClientRect().left > this.container.querySelector('.multi-select__icon').getBoundingClientRect().left) {
            this.container.scrollLeft = this.typeahead.getBoundingClientRect().left + 96;
        }
    }

    addChip(option) {
        let chipHTML = document
            .createRange()
            .createContextualFragment(
                `<button class="chip chip--dismissible" aria-controls="${option.id}" aria-label="${option.innerText} (Click to remove)">${option.innerText}<span class="system-icon system-icon--size-xs"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"> <path fill="currentColor" d="M19.53 18.22a.75.75 0 1 1-1.06 1.06l-6.22-6.22-6.22 6.22a.75.75 0 0 1-1.06-1.06L11.19 12 4.97 5.78a.75.75 0 0 1 1.06-1.06l6.22 6.22 6.22-6.22a.75.75 0 1 1 1.06 1.06L13.31 12l6.22 6.22Z"></path></svg></span></button>`,
            );

        chipHTML.children[0].addEventListener("click", (e) => {
            e.stopImmediatePropagation();
            this.removeChip(e.target);
        });

        chipHTML.children[0].addEventListener("keyup", (e) => {
            if (e.key == "Backspace" || e.key == "Delete") {
                this.removeChip(e.target);
            }
        });

        this.container.insertBefore(chipHTML.children[0], this.typeahead);
    }

    removeChip(chip) {
        let option = document.getElementById(
            chip.getAttribute("aria-controls"),
        );

        option.hidden = false;

        if (option.parentNode.hidden) {
            option.parentNode.hidden = false;
        }
        let currentValue = JSON.parse(this.input.value);

        currentValue = currentValue.filter((value) => {
            return value !== option.dataset.value;
        });

        this.input.value = JSON.stringify(currentValue);

        this.filterOptions(this.typeahead.value.toLowerCase().trim());
        this.typeahead.focus();
        chip.remove();
    }

    filterOptions(searchValue) {
        if (searchValue) {
            let currentValue = JSON.parse(this.input.value);
            this.options.forEach((option) => {
                if (
                    currentValue.indexOf(option.dataset.value) !== -1 ||
                    option.dataset.value.toLowerCase().indexOf(searchValue) ===
                        -1 ||
                    option.innerText.toLowerCase().indexOf(searchValue) === -1
                ) {
                    option.hidden = true;
                } else {
                    option.hidden = false;
                    if (option.closest(".multi-select__optgroup").hidden) {
                        option.closest(".multi-select__optgroup").hidden =
                            false;
                    }
                }

                this.hideParentGroupIfEmpty(option);
            });

            if (
                [...this.options].filter((option) => {
                    return !option.hidden;
                }).length == 0
            ) {
                this.listbox.classList.add("multi-select__listbox--empty");
                if (
                    !this.listbox.lastElementChild.classList.contains(
                        "multi-select__no-results",
                    )
                ) {
                    let noResultsHTML = document
                        .createRange()
                        .createContextualFragment(
                            `<div class="multi-select__no-results">No matching options</div>`,
                        );
                    this.listbox.append(noResultsHTML);
                }
            } else {
                if (
                    this.listbox.lastElementChild.classList.contains(
                        "multi-select__no-results",
                    )
                ) {
                    this.listbox.lastElementChild.remove();
                }
            }
        } else if (this.input.value === "[]") {
            this.options.forEach((option) => {
                option.hidden = false;
                if (option.closest(".multi-select__optgroup").hidden) {
                    option.closest(".multi-select__optgroup").hidden = false;
                }
            });
        }
    }

    hideParentGroupIfEmpty(option) {
        // If there's nothing left in this group, hide the group
        let siblings = option.parentNode.querySelectorAll(
            ".multi-select__option",
        );
        if (
            [...siblings].filter((sibling) => {
                return !sibling.hidden;
            }).length == 0
        ) {
            option.parentNode.parentNode.hidden = true;
        }
    }

    setActiveDescendant(newActiveDescendant, scrollToActiveDescendant = true) {
        this.typeahead.setAttribute(
            "aria-activedescendant",
            newActiveDescendant.getAttribute("id"),
        );

        // this.options.querySelector wasn't working for some reason? So I did this...
        let currentActiveDescendant = [...this.options].filter((option) => {
            return option.classList.contains("is--aria-activedescendant");
        });

        if (currentActiveDescendant.length > 0) {
            currentActiveDescendant[0].classList.remove(
                "is--aria-activedescendant",
            );
            currentActiveDescendant[0].setAttribute("aria-selected", false);
        }

        newActiveDescendant.classList.add("is--aria-activedescendant");
        this.activeDescendant = newActiveDescendant;

        if (scrollToActiveDescendant) {
            let newActiveDescendantHidingAbove =
                newActiveDescendant.getBoundingClientRect().y <
                this.listbox.getBoundingClientRect().top;
            if (
                !newActiveDescendant.previousElementSibling &&
                newActiveDescendantHidingAbove
            ) {
                var scrollTarget =
                    newActiveDescendant.parentNode.previousElementSibling;
            } else {
                var scrollTarget = newActiveDescendant;
            }

            scrollTarget.scrollIntoView({
                block: "nearest",
                inline: "nearest",
            });
        }
    }
}

let containers = document.querySelectorAll(".multi-select__container");
containers.forEach((container) => {
    new MultiSelect(container);
});
