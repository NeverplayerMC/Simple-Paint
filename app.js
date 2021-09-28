var colour = $(".selected").css("background-color");
var $canvas = $("canvas");
var context = $canvas[0].getContext("2d");
var lastEvent;
var mouseDown = false;
var	lWidth=5;
// When clicking on colours items
$(".controls").on("click", "li", function () {
    //  Deselect aibling elements
    $(this).siblings().removeClass("selected");
    //  Select clicked element
    $(this).addClass("selected");

    // Cache current colour
    colour = $(this).css("background-color");

});

// When New colour is pressed by user
$("#revealColorSelect").click(function () {
    // Show colour select or hide the color select
    changeColor();
    $("#colorSelect").toggle();
});

// Update the new colour span
function changeColor() {
    var r = $("#red").val();
    var g = $("#green").val();
    var b = $("#blue").val();
    $("#newColor").css("background-color", "rgb(" + r + "," + g + "," + b + ")");
}

// When new colour sliders change
$("input[type=range]").change(changeColor);


// When add colour is pressed
$("#addNewColor").click(function () {
    // Append the colours to the controls
    var $newColor = $("<li></li>");
    $newColor.css("background-color", $("#newColor").css("background-color"));
    $(".controls ul").append($newColor);
    // Select the new added colour
    $newColor.click();
});

// On mouse events on the canvas
$canvas.mousedown(function (e) {
    lastEvent = e;
    mouseDown = true;
}).mousemove(function (e) {
    // Draw lines
    if (mouseDown) {
        context.beginPath();
        context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
        context.lineTo(e.offsetX, e.offsetY);
        context.strokeStyle = colour;
        context.lineWidth = lWidth;
        context.lineCap = 'round';
        context.stroke();
        lastEvent = e;
    }
}).mouseup(function () {
    mouseDown = false;
}).mouseleave(function () {
    $canvas.mouseup();
});
// Clear the canvas when button is clicked
function clear_canvas_width() {
    var s = document.getElementById("mainCanvas");
    var w = s.width;
    s.width = 10;
    s.width = w;
}
// Adjust width with buttons
function increase_brush_size() {
	console.log("Expecting lWidth to be increased by 2. Current value:"+lWidth);
	lWidth=lWidth+2;
	console.log("lWidth value after increasing it by 2:"+lWidth);
}
function decrease_brush_size() {
	if(lWidth<1){
		lWidth=1;
	}
	else{
		lWidth=lWidth-2;
	}
}
function save_canvas(){
	var canv=document.getElementById("mainCanvas");
	canv.toBlob(function(blob){
		saveAs(blob, "canvas.png");
	})
}
function load_canvas(){
	let canvas = document.getElementById("mainCanvas");
	let ctx = canvas.getContext("2d");
	let url = prompt("Please enter the name of the file/path:");
	const drawImage = (url) => {
		const image = new Image();
		image.src = url;
		image.onload = () => {
			ctx.drawImage(image, 0, 0)
		}
	}
}
(function(console){

console.save = function(data, filename){

    if(!data) {
        console.error('Console.save: No data')
        return;
    }

    if(!filename) filename = 'console.json'

    if(typeof data === "object"){
        data = JSON.stringify(data, undefined, 4)
    }

    var blob = new Blob([data], {type: 'text/json'}),
        e    = document.createEvent('MouseEvents'),
        a    = document.createElement('a')

    a.download = filename
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    a.dispatchEvent(e)
 }
})(console)