function initGoldenSkull(){
    console.log("GoldenSkull")

    document.getElementById("drawerClickBtn").addEventListener('click', drawerClick);
    document.getElementById("goldenSkullNavBar").tabIndex = "0";
    document.getElementById("goldenSkullNavBar").aria.current = "page";

    // const drawer = mdc.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer--modal'));
    // drawer.wrapFocus = true;

    // console.log(drawer);

    // function drawerClick(){
    //     console.log("menuClickDrawer");
    //     drawer.open = !drawer.open;
    // }

    document.getElementById("menuClickBtn").addEventListener('click', menuClick);
    const menu = new mdc.menu.MDCMenu(document.querySelector('.mdc-menu'));
    menu.open = false;  
    menu.quickOpen = false  

    function menuClick(){
        console.log("menuClickMenu " + menu.open);

        menu.open = !menu.open;
    }
}
