/* GAME CONSTANTS */
var LOGO_HEIGHT = 10,
	LOGO_WIDTH = 46;

/* GAME VARIABLES */
var animationStartTime = false,
	animationProgress;

/* DOM VARIABLES */
var gameColumn = document.getElementById( "cf-game-col" ),
	gameRow = document.getElementById( "cf-game-row" ),
	gameCanvas = document.getElementById( "cf-game-canvas" );

/* Rendering the logo */
function init_page() {
	var logo = document.getElementById( "colorfight-logo" ),
		pixel;
	for( var i = 0; i < LOGO_WIDTH * LOGO_HEIGHT; i++ ) {
		pixel = document.createElement( "div" );
		pixel.setAttribute( "class", "logo-pixel" );
		logo.appendChild( pixel );
	}
}

/* GAME CONSTANTS */
function draw_game( ts ) {
	if( !animationStartTime ) animationStartTime = ts;
	animationProgress = animationStartTime - ts;
	console.log( gameRow.offsetTop );
	console.log( window.innerHeight );
	if( gameColumn.clientWidth + gameCanvas.offsetTop > window.innerHeight ) {
		gameCanvas.width = window.innerHeight - gameRow.offsetTop;
		gameCanvas.height = gameCanvas.width;
	}
	requestAnimationFrame( draw_game );
}

init_page();

window.requestAnimationFrame( draw_game );