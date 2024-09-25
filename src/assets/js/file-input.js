let fileInputs = document.querySelectorAll(".file-input");

class FileInput {
    constructor(fileInput) {
        this.label = fileInput;
        this.input = fileInput.previousElementSibling;
        this.fileListContainer = fileInput.nextElementSibling;

        // Props
        this.multiple = this.input.multiple;
        this.accept = this.parseAccept();
        this.maxFileSize = parseInt(this.input.dataset.maxFileSize, 10)

        // State
        this.filled = this.label.classList.contains("file-input--filled");
        this.currentFiles = [];
        
        this.addEventListeners();
    }

    validateFiles() {
        /*
            * remove invalid files from this.input.files (so that they aren't submitted, not that it matters)
            * return what is needed to populate the UI with files and/or errors. per file:
                - filename
                - error message (if any)
                - objectURL (if this.multiple)
        */

        let tempDataTransfer = new DataTransfer();
        let uiData = [];

        [...this.input.files].forEach((file) => {
            let isAcceptable = false,
                errorMessages = [];

            if (this.accept.length) {
                this.accept.forEach((criterion) => {
                    if (criterion[0] === ".") {
                        if (file.name.endsWith(criterion)) {
                            isAcceptable = true;
                        }
                    } else if (file.type === criterion) {
                        isAcceptable = true;
                    }
                });
            } else {
                isAcceptable = true;    
            }

            if (!isAcceptable) {
                errorMessages.push("File is not of an accepted file type");
            }

            if (this.maxFileSize && file.size > this.maxFileSize) {
                errorMessages.push(`File must be under ${this.maxFileSize} bytes`);
            }

            if (!errorMessages.length) {
                tempDataTransfer.items.add(file);
            }

            uiData.push({
                filename: file.name,
                objectURL: this.multiple ? URL.createObjectURL(file) : null,
                errorMessages: errorMessages
            });
        });

        this.input.files = tempDataTransfer.files;
        console.log(this.input.files);

        return uiData;
    }

    populateFileInputUI() {
        const uiData = this.validateFiles();

        if (!this.multiple) {
            if (this.input.files.length) {
                this.filled = true;
                if (!this.label.classList.contains("file-input--filled")) {
                    this.label.classList.add("file-input--filled");
                }

                let fileNameSlot = this.label.querySelector(
                    ".file-input__description-text--filled",
                );
                fileNameSlot.innerText = uiData[0].filename;
            } else {
                let inputMessageListHTML = document.createRange().createContextualFragment('<div class="input-message__list"></div>');
                uiData[0].errorMessages.forEach((message) => {
                    let inputMessageHTML = document.createRange().createContextualFragment(`<div class="input-message input-message--type-error"><span class="system-icon system-icon--size-md"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"> <path fill="currentColor" d="M12 13.5a.75.75 0 0 0 .75-.75V7.5a.75.75 0 0 0-1.5 0v5.25c0 .414.336.75.75.75Zm1.125 2.625a1.125 1.125 0 1 1-2.25 0 1.125 1.125 0 0 1 2.25 0Z"></path> <path fill="currentColor" d="m21.31 7.521-4.833-4.834a1.505 1.505 0 0 0-1.056-.437H8.583c-.396 0-.783.161-1.06.44L2.686 7.521c-.282.284-.437.66-.437 1.059v6.835c0 .401.157.778.44 1.06l4.832 4.835c.282.283.659.438 1.06.438h6.835c.4 0 .777-.156 1.06-.44l4.835-4.832c.283-.282.438-.659.438-1.06V8.582c0-.395-.16-.781-.44-1.06ZM15.416 20.25l-6.835.001-4.832-4.834-.001-6.834L8.583 3.75h6.834v-.002l4.832 4.834.001 6.835-4.834 4.832Z"></path></svg></span> ${message}</div>`);
                    inputMessageListHTML.querySelector('.input-message__list').appendChild(inputMessageHTML);
                });
                this.label.after(inputMessageListHTML);

            }

            /* TODO: figure out how to truncate the filename how we wanted */
        } else {
            let tempDataTransfer = new DataTransfer();

            [...this.currentFiles].forEach((file) => {
                tempDataTransfer.items.add(file);
            });

            [...this.input.files].forEach((file) => {
                console.log(file);
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

    reset() {
        if (!this.multiple) {
            this.label.classList.remove("file-input--filled");
            this.input.value = null;
            this.filled = false;
        }
    }

    addEventListeners() {
        this.input.addEventListener("change", (e) => {
            this.populateFileInputUI(); 
        });

        this.label.addEventListener("click", (e) => {
            if (!this.multiple && this.filled) {
                this.reset();
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
            
            // get files that were dropped
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
            this.populateFileInputUI();
        });
    }

    parseAccept() {
        if (this.input.getAttribute("accept")) {
           return this.input.getAttribute("accept").split(",").map(item => item.trim());
        }

        return [];
    }
}

fileInputs.forEach((fileInput) => {
    new FileInput(fileInput);
});
