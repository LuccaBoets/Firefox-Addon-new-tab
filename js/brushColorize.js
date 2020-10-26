var colorPalettes = [
  ["#161a1d","#660708","#a4161a","#ba181b","#e5383b"],
  ["#ffdab9","#fbc4ab","#f8ad9d","#f4978e","#f08080"],
  ["#000000","#14213d","#fca311","#e5e5e5","#ffffff"],
  ["#61b3f4","#f4ec61","#e9c46a","#f4a261","#e76f51"],
  ["#93482b","#2b9348","#55a630","#80b918","#aacc00"]
];

var color = colorPalettes[0];

var brushCanvas = document.getElementById('brushColorizeCanvas');
var brushCtx = brushCanvas.getContext('2d');

function initBrushColorize(){
  console.log("BrushColorize")

  document.getElementById("BrushDrawerClickBtn").addEventListener('click', drawerClick);
  document.getElementById("brushColorizeNavBar").tabIndex = "0";
  document.getElementById("brushColorizeNavBar").getAttributeNames.current = "page";

  var x = 0;
  var y = 0;

  var count = 0;
  var mousedownBrushBool = false;

  brushCanvas.width  = window.innerWidth;
  brushCanvas.height = window.innerHeight;

  //brushCanvas.addEventListener("click", BrushclickScreen); 
  brushCanvas.addEventListener("mousedown", mousedownBrush);
  brushCanvas.addEventListener("mouseup", mouseupBrush);

  chooseColor(0);

  //console.log(colorPalettes);
  document.getElementById("colorPaletteId").innerHTML= "";
  colorPalettes.forEach(colorPalette => {
    document.getElementById("colorPaletteId").innerHTML += `<div class="colorBox">
      <div class="mdc-radio">
        <input class="mdc-radio__native-control" type="radio" id="colorPalette-`+count+`" name="radios" primary="black">
        <div class="mdc-radio__background">
          <div class="mdc-radio__outer-circle"></div>
          <div class="mdc-radio__inner-circle"></div>
        </div>
        <div class="mdc-radio__ripple"></div>
      </div>
      <label for="colorPalette-`+count+`" class="align-middle colorPalette">
        <div class="colorPaletteComponent" style="background-color: `+colorPalette[0]+`;border-top-left-radius: 14px;border-bottom-left-radius: 14px;"></div>
        <div class="colorPaletteComponent" style="background-color: `+colorPalette[1]+`;"></div>
        <div class="colorPaletteComponent" style="background-color: `+colorPalette[2]+`;"></div>
        <div class="colorPaletteComponent" style="background-color: `+colorPalette[3]+`;"></div>
        <div class="colorPaletteComponent" style="background-color: `+colorPalette[4]+`;border-top-right-radius: 14px;border-bottom-right-radius: 14px;"></div>
      </label>
      </div>`;
    
    count++;
  });

  for (let i = 0; i < colorPalettes.length; i++) {
    document.getElementById("colorPalette-"+i).addEventListener('click', function() { chooseColor(i); } ); // chooseColor(`+count+`)
  }
  

  const sliderBrush = new mdc.slider.MDCSlider(document.querySelector('.mdc-slider'));
  //sliderBrush.listen('MDCSlider:change', () => console.log(`Value changed to ${sliderBrush.value}`));

  var randomBrushSize = false;
  sliderBrush.disabled = true;
  document.getElementById("BrushSizeRandom").addEventListener('click',  function() { randomBrushSize = true; sliderBrush.disabled = true; });
  document.getElementById("BrushSizeSet").addEventListener('click',  function() { randomBrushSize = false; sliderBrush.disabled = false;});


  document.onmousemove = handleMouseMove;
  function handleMouseMove(event) {
      var eventDoc, doc, body;

      event = event || window.event; // IE-ism

      // If pageX/Y aren't available and clientX/Y are,
      // calculate pageX/Y - logic taken from jQuery.
      // (This is to support old IE)
      if (event.pageX == null && event.clientX != null) {
          eventDoc = (event.target && event.target.ownerDocument) || document;
          doc = eventDoc.documentElement;
          body = eventDoc.body;

          event.pageX = event.clientX +
            (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
            (doc && doc.clientLeft || body && body.clientLeft || 0);
          event.pageY = event.clientY +
            (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
            (doc && doc.clientTop  || body && body.clientTop  || 0 );
      }

      // Use event.pageX / event.pageY here
      x = event.pageX;
      y = event.pageY;

      if(mousedownBrushBool){
        brushAction();
      }
  }

  function brushAction(){
    //console.log("BrushclickScreen " + x + " " + y + " " + (Math.round(Math.random()*50)+20));
    brushCtx.beginPath();
    if(randomBrushSize){
      brushCtx.arc(x, y, (Math.round(Math.random()*50)+20), 0, 2 * Math.PI);
    } else {
      brushCtx.arc(x, y, sliderBrush.value, 0, 2 * Math.PI);
    }
    brushCtx.fillStyle = color[Math.round(Math.random()*3)+1];
    brushCtx.fill();
    //brushCtx.stroke(); 
  }

  function mousedownBrush(){
    mousedownBrushBool = true;
    brushAction();
  }

  function mouseupBrush(){
    mousedownBrushBool = false;
  }
}

function chooseColor(index){
  console.log("test " + index)
  color = colorPalettes[index];
  updateColor();
  brushCtx.clearRect(0, 0, brushCanvas.width, brushCanvas.height);
}

function updateColor(){
  brushCanvas.style.backgroundColor = color[0];
}