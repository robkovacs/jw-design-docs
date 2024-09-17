import {
    computePosition,
    autoPlacement,
    shift,
    offset
} from "@floating-ui/dom";

let hideMenu = function (menu) {
    menu.scrollTop = 0;
    menu.style.display = "none";
};

let showMenu = function (trigger, menu) {
    menu.style.display = "block";
    
    computePosition(trigger, menu, {
        middleware: [
            autoPlacement({
                alignment: "top",
                crossAxis: true,
            }),
            shift({ padding: 16 }),
            offset(8)
        ],
    }).then(({ x, y, placement, middlewareData }) => {
        Object.assign(menu.style, {
            left: `${x}px`,
            top: `${y}px`,
        });

        const staticSide = {
            top: "bottom",
            right: "left",
            bottom: "top",
            left: "right",
        }[placement.split("-")[0]];
    });

};

let triggers = document.querySelectorAll(".menu__trigger");

triggers.forEach((el) => {
    let trigger = el;
    let menu = el.nextElementSibling;

    trigger.addEventListener("click", () => {
        showMenu(trigger, menu);
    });

    trigger.addEventListener("focus", () => {
        showMenu(trigger, menu);
    });

    trigger.addEventListener("blur", (e) => {
        if (e.relatedTarget === null) {
            hideMenu(menu);
        } else if (!e.relatedTarget.classList.contains("menu") && !e.relatedTarget.classList.contains("menu__item")) {
            hideMenu(menu);
        }
    });
});

document.addEventListener("click", (e) => {
    let menus = document.querySelectorAll(".menu");
    
    menus.forEach((menu) => {
        let menuChildNodesArray = getDescendantNodes(menu);
        let triggerChildNodesArray = getDescendantNodes(menu.previousElementSibling);
        let thisMenuTargeted = (e.target == menu || e.target == menu.previousElementSibling || menuChildNodesArray.indexOf(e.target) !== -1 || triggerChildNodesArray.indexOf(e.target) !== -1);
        if (menu.style.display = "block" && !thisMenuTargeted) {
            hideMenu(menu);
        }
    });
});

function getDescendantNodes(node, all = []) {
    all.push(...node.childNodes);
    
    for (const child of node.childNodes) {
      getDescendantNodes(child, all);
    }
    
    return all;
}