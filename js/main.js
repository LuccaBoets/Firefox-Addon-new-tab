console.log("main");

class Theme {

    constructor(name,displayName, initFunction, icon) {
        this.name = name;
        this.displayName = displayName;
        this.initFunction = initFunction;
        this.icon = icon;
    }

    init(){
        console.log("init")
        document.getElementById("scriptLoader").innerHTML = '<link rel="stylesheet" href="css/' + this.name + '.css">';

        listOfThemes.forEach(theme => { document.getElementById(theme.name).style.display = "none";});
        document.getElementById(this.name).style.display = "block";

        this.initFunction();
    }
}



var currentTheme = "brushColorize";

let listOfThemes = [new Theme("goldenSkull","Golden Skull",initGoldenSkull, "fa-skull"),new Theme("brushColorize", "Brush Colorize", initBrushColorize, "fa-brush")];
var navBar = document.getElementById('customNav');
console.log(navBar)

var count = 0;
listOfThemes.forEach(theme => {

    navBar.innerHTML += `<a class="mdc-list-item" onclick="listOfThemes[`+count+`].init()" id="`+listOfThemes[count].name+`NavBar">
        <span class="mdc-list-item__ripple"></span>
            <i class="material-icons mdc-list-item__graphic" aria-hidden="true">
                <i class="fas `+theme.icon+` icons"></i>
            </i>
        </a>`;
    
    if(theme.name == currentTheme){
        theme.init();
        //document.getElementById(theme.name).style.visibility = "visible";
    }// } else {
    //     document.getElementById(theme.name).style.visibility = "hidden";
    // }

    count++;
});


const listEl = document.querySelector('.mdc-drawer .mdc-list');
const drawer = mdc.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer--modal'));
drawer.wrapFocus = true;

function drawerClick(){
    console.log("menuClickDrawer");
    drawer.open = !drawer.open;
}

listEl.addEventListener('click', (event) => {
    
    console.log("listEl.addEventListener click")
    drawer.open = false;
    
});

// document.body.addEventListener('MDCDrawer:closed', () => {
//     mainContentEl.querySelector('input, button').focus();
// });