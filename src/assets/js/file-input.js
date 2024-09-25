let fileInputs = document.querySelectorAll(".file-input");

class FileInput {
    constructor(fileInput) {
        this.label = fileInput;
        this.input = fileInput.previousElementSibling;
        this.fileListContainer = fileInput.nextElementSibling;
        this.filled = this.label.classList.contains("file-input--filled");

        this.addEventListeners();
    }

    populateFileList() {
        this.filled = true;

        if (this.input.files.length === 1) {
            /* Also check for existing files though, and if so, add to the list */
            if (!this.label.classList.contains("file-input--filled")) {
                this.label.classList.add("file-input--filled");
            }

            let uploadedFile = this.input.files[0].name;
            let fileNameSlot = this.label.querySelector(
                ".file-input__description-text--filled",
            );

            fileNameSlot.innerText = uploadedFile;
            /* TODO: figure out how to truncate the filename how we wanted */
        } else {
            this.label.classList.remove("file-input--filled");

            this.fileListContainer.replaceChildren();

            [...this.input.files].forEach((file) => {
                this.fileListContainer.insertAdjacentHTML("beforeend", `<button class="file-input__file-list-item">${file.name}</button>`);
            });

            /* TODO: event handlers on these shiny new file list items */
            /* TODO: somewhere, maybe not here... validation on filetype or file size > max */
        }
    }

    addEventListeners() {
        this.input.addEventListener("change", () => {
            this.populateFileList();
            
        });

        this.label.addEventListener("click", (e) => {
            if (this.filled) {
                e.preventDefault();
                this.label.classList.remove("file-input--filled");
                this.input.value = null;
                this.filled = false;
            } else {
                this.input.click();
                // hey wait, this *can* be just a button. fuck them labels
            }
        });

        this.label.addEventListener("dragenter", (e) => {
            e.stopPropagation();
            e.preventDefault();
        });

        this.label.addEventListener("dragover", (e) => {
            e.stopPropagation();
            e.preventDefault();
        });

        this.label.addEventListener("drop", (e) => {
            e.preventDefault();
            let tempDataTransfer = new DataTransfer();

            // This lets you add the same file(s) multiple times, once you get at least two files attached. Is that OK?
            // IIRC the base input type=file will overwrite files that are a match
            if (this.input.files.length) {
                [...this.input.files].forEach((file) => {
                    if (file.type) {
                        tempDataTransfer.items.add(file);
                    }
                });
            }

            if (e.dataTransfer.items) {
                [...e.dataTransfer.items].forEach((item) => {
                    if (item.kind === "file" && item.type) {
                        tempDataTransfer.items.add(item.getAsFile());
                    }
                });
            } else {
                [...e.dataTransfer.files].forEach((file) => {
                    if (file.type) {
                        tempDataTransfer.items.add(file);
                    }
                });
            }

            
            this.input.files = tempDataTransfer.files;
            this.populateFileList();
        });
    }
}

fileInputs.forEach((fileInput) => {
    new FileInput(fileInput);
});
