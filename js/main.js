console.log("main");

class Theme {


    constructor(name,displayName) {
        this.name = name;
        this.displayName = displayName;
    }

    init(){
        document.getElementById("scriptLoader").innerHTML = '<link rel="stylesheet" href="css/' + this.name + '.css"><script onload="speak()" src="js/' + this.name + '.js">        speak();        </script>';
    }
}



var currentTheme = "goldenSkull";

let listOfThemes = [new Theme("goldenSkull","Golden Skull"),new Theme("brushColorize", "Brush Colorize")];

listOfThemes.forEach(theme => {

    document.getElementById('customNav').innerHTML += '<a class="mdc-list-item mdc-list-item--activated" href="#" aria-current="page" tabindex="0">    <span class="mdc-list-item__ripple"></span><i class="material-icons mdc-list-item__graphic" aria-hidden="true">inbox</i></a>';

    if(theme.name == currentTheme){
        theme.init();
    }
});
