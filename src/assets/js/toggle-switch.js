const toggleSwitchOnClick = function(e) {
    const currentState = e.target.getAttribute("aria-checked") === "true";
    const newState = String(!currentState);
    e.target.setAttribute("aria-checked", newState);
}

document.querySelectorAll('.toggle-switch').forEach((toggleSwitch) => {
    toggleSwitch.addEventListener("click", toggleSwitchOnClick);
});

/*
    Disable aria-disabled toggle switches
    Note that in real life there might be other earlier click events on here that these won't catch
*/
let disabledToggleSwitches = document.querySelectorAll('.toggle-switch[aria-disabled="true"]');

disabledToggleSwitches.forEach((toggleSwitch) => {
    toggleSwitch.removeEventListener('click', toggleSwitchOnClick);
});