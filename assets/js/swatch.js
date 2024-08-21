(() => {
    let swatchButton = document.querySelectorAll(".swatch__button");
    const copyContent = async (textToWrite, successMessage) => {
        try {
            await navigator.clipboard.writeText(textToWrite);

            let toaster = document.querySelector(".toaster");
            
            if (!toaster) {
                let newToaster = document.createElement("div");
                newToaster.classList.add("toaster");
                document.querySelector("body").appendChild(newToaster);
                toaster = newToaster;
            }

            let newToast = document.createElement("div");
            newToast.classList.add("toaster__toast");
            newToast.innerHTML = successMessage;
            toaster.appendChild(newToast);
            let thisToast = toaster.lastChild;
            window.setTimeout(() => {
                thisToast.classList.add("fade-out");
                window.setTimeout(() => { thisToast.remove(); }, 500);
            }, 3000);
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };

    swatchButton.forEach((el) => {
        el.addEventListener("click", (e) => {
            e.preventDefault();

            copyContent(e.target.dataset.toCopy, "Copied!");
        });
    });
})();
