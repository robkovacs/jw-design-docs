(() => {
    let swatchButton = document.querySelectorAll(".swatch__button");
    const copyContent = async (textToWrite, toastMessage) => {
        try {
            await navigator.clipboard.writeText(textToWrite);

            let toaster = document.querySelector(".toaster");
            
            if (!toaster) {
                toaster = document.createElement("div");
                toaster.classList.add("toaster");
                document.querySelector("body").appendChild(toaster);
            }

            let toast = document.createElement("div");
            toast.classList.add("toaster__toast");
            toast.setAttribute("role", "alert");
            toast.setAttribute("aria-live", "assertive");
            toast.setAttribute("aria-atomic", "true");
            toast.innerHTML = toastMessage;
            toaster.appendChild(toast);
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
            copyContent(e.currentTarget.dataset.copyText, "Copied!");
        });
    });
})();
