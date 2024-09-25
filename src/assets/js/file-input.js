let fileInputs = document.querySelectorAll(".file-input");

class FileInput {
    constructor(fileInput) {
        this.label = fileInput;
        this.input = fileInput.previousElementSibling;
        this.fileListContainer = fileInput.nextElementSibling;
        this.multiple = this.input.multiple;
        this.filled = this.label.classList.contains("file-input--filled");
        this.currentFiles = [];

        this.addEventListeners();
    }

    populateFileList() {
        this.filled = true;

        if (!this.multiple) {
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
            let tempDataTransfer = new DataTransfer();

            [...this.currentFiles, ...this.input.files].forEach((file) => {
                tempDataTransfer.items.add(file);
            });
    
            this.input.files = tempDataTransfer.files;
            this.currentFiles = [...this.input.files];

            this.label.classList.remove("file-input--filled");

            this.fileListContainer.querySelectorAll(".file-list-item__button--preview").forEach((link) => {
                URL.revokeObjectURL(link.getAttribute("href"));
            });

            this.fileListContainer.replaceChildren();

            [...this.input.files].forEach((file) => {
                let objectURL = URL.createObjectURL(file);
                this.fileListContainer.insertAdjacentHTML("beforeend", `<div class="file-list-item">${file.name}<div class="file-list-item__buttons"><a class="file-list-item__button file-list-item__button--preview" href="${objectURL}" target="_blank" aria-label="Preview file"></a><button class="file-list-item__button file-list-item__button--remove" aria-label="Remove file" /></div></div>`);
            });

            /* TODO: event handlers on these shiny new file list items */
            /* TODO: somewhere, maybe not here... validation on filetype or file size > max */
        }
    }

    addEventListeners() {
        this.input.addEventListener("change", (e) => {
            this.populateFileList(); 
        });

        this.label.addEventListener("click", (e) => {
            if (!this.multiple && this.filled) {
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
