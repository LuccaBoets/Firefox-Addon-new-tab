console.log("main");

class Theme {

    constructor(name,displayName, initFunction, icon) {
        this.name = name;
        this.displayName = displayName;
        this.initFunction = initFunction;
        this.icon = icon;
        this.JSLoaded = false;
    }

    init(){

        console.log("init")
        document.getElementById("scriptLoader").innerHTML = '<link rel="stylesheet" href="css/' + this.name + '.css">';

        listOfThemes.forEach(theme => { document.getElementById(theme.name).style.display = "none";});
        document.getElementById(this.name).style.display = "block";
        if(!this.JSLoaded){

            console.log("loading js")
            this.initFunction();
            this.JSLoaded = true;
        }

        console.log("test  chrome.storage.local");
        if(!(typeof chrome === 'undefined')){
            chrome.storage.local.set({currentTheme: this.name}, function() {
                console.log('Value is set to ');
                
            });
        }
    }
}

let listOfThemes = [new Theme("goldenSkull","Golden Skull",initGoldenSkull, "fa-skull"),new Theme("brushColorize", "Brush Colorize", initBrushColorize, "fa-brush")];
var currentTheme = "brushColorize";
var navBar = document.getElementById('customNav');

console.log(typeof chrome + " " + !(typeof chrome === 'undefined'));

if(!(typeof chrome === 'undefined')){
   chrome.storage.local.get(['currentTheme'], function(result) {
     if(!(typeof result.currentTheme === 'undefined')){
        console.log('chrome.storage.local["currentTheme"]: ' + result.currentTheme);

        currentTheme= result.currentTheme;
     } else {
         console.log("result.currentTheme === 'undefined'");
     }
     initTheme();
   });
} else {
    initTheme();
}

function initTheme() {

    console.log("initMain");

    var count = 0;
    listOfThemes.forEach(theme => {
        console.log("listOfThemes.forEach");

        navBar.innerHTML += `<a class="mdc-list-item" id="`+listOfThemes[count].name+`NavBar">
            <span class="mdc-list-item__ripple"></span>
                <i class="material-icons mdc-list-item__graphic" aria-hidden="true">
                    <i class="fas `+theme.icon+` icons"></i>
                </i>
            </a>`;
        
        if(theme.name == currentTheme){
            console.log("init theme");
            theme.init();
        }

        count++;
    });

    for (let i = 0; i < listOfThemes.length; i++) {
        document.getElementById(listOfThemes[i].name + "NavBar").addEventListener('click', function( ) {listOfThemes[i].init()});
    }
}



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