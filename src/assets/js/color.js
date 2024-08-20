(() => {
    let swatchButton = document.querySelectorAll('.swatch__button');

    swatchButton.forEach((el) => {
        el.addEventListener("click", (e) => {
            e.preventDefault();

            const copyContent = async () => {
                try {
                  await navigator.clipboard.writeText(e.target.dataset.toCopy);
                  console.log('Content copied to clipboard');
                } catch (err) {
                  console.error('Failed to copy: ', err);
                }
            };

            copyContent();
        });
    });
})();