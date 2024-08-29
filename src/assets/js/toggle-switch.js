document.querySelectorAll('.toggle-switch').forEach((toggleSwitch) => {
    toggleSwitch.addEventListener("click", (e) => {
        const currentState = e.target.getAttribute("aria-checked") === "true";
        const newState = String(!currentState);
        e.target.setAttribute("aria-checked", newState);
    });
});