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

        listOfThemes.forEach(theme => { document.getElementById(theme.name).style.visibility = "hidden";});
        document.getElementById(this.name).style.visibility = "visible";

        this.initFunction();
    }
}



var currentTheme = "goldenSkull";

let listOfThemes = [new Theme("goldenSkull","Golden Skull",initGoldenSkull, "fa-skull"),new Theme("brushColorize", "Brush Colorize", initBrushColorize, "fa-brush")];
var navBar = document.getElementById('customNav');

var count = 0; //
listOfThemes.forEach(theme => {

    navBar.innerHTML += '<a class="mdc-list-item" onclick="listOfThemes['+count+'].init()"><span class="mdc-list-item__ripple"></span><i class="material-icons mdc-list-item__graphic" aria-hidden="true"><i class="fas '+theme.icon+' icons"></i></i></a>';
    
    if(theme.name == currentTheme){
        theme.init();
        //document.getElementById(theme.name).style.visibility = "visible";
    }// } else {
    //     document.getElementById(theme.name).style.visibility = "hidden";
    // }

    count++;
});
