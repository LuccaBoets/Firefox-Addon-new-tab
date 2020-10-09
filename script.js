document.getElementById("menuClickBtn").addEventListener('click', menuClick);
const menu = new mdc.menu.MDCMenu(document.querySelector('.mdc-menu'));
menu.open = false;  
menu.quickOpen = false  

function menuClick(){
    console.log("menuClick");
    menu.open = !menu.open ;
}
