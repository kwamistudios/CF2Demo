/* GAME CONSTANTS */
var LOGO_HEIGHT = 10,
	LOGO_WIDTH = 46;

/* GAME VARIABLES */
var animationStartTime = false,
	animationProgress,
	gameWidth,
	cellWidth,
	cellHeight,
	cellRadius;

/* DOM VARIABLES */
var gameColumn = document.getElementById( "cf-game-col" ),
	gameRow = document.getElementById( "cf-game-row" ),
	gameCanvas = document.getElementById( "cf-game-canvas" )
	gameCtx = gameCanvas.getContext( "2d" );

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

/* Animation Loop */
function draw_game( ts ) {
	if( !animationStartTime ) animationStartTime = ts;
	animationProgress = animationStartTime - ts;
	gameWidth = gameColumn.clientWidth;
	if( gameWidth + gameCanvas.offsetTop > window.innerHeight ) {
		gameWidth = window.innerHeight - gameRow.offsetTop;
	}
	if( gameCanvas.width != gameWidth ) {
		gameCanvas.width = gameWidth;
		gameCanvas.height = gameWidth;
		cellWidth = gameWidth / 30 - 4;
		cellHeight = gameWidth / 30 - 4;
		cellRadius = 7;
		gameCtx.fillStyle = "#FF0000";
		gameCtx.lineWidth = 2;
		for( var x = 0; x < 30; x++ ) {
			for( var y = 0; y < 30; y++ ) {
				gameCtx.strokeStyle = "#65c9cf";
				draw_cell( ( x * ( cellWidth + 4 ) ) + 1, ( y * ( cellHeight + 4 ) ) + 1, cellWidth, cellHeight, cellRadius );
				gameCtx.stroke();
				gameCtx.strokeStyle = "#faf334";
				draw_cell( ( x * ( cellWidth + 4 ) ) + 3, ( y * ( cellHeight + 4 ) ) + 3, cellWidth - 4, cellHeight - 4, cellRadius - 2 );
				gameCtx.stroke();
			}
		}
	}
	requestAnimationFrame( draw_game );
}

/* Drawing the rounded cell */
function draw_cell( x, y, cw, ch, cr ) {
	gameCtx.beginPath();
	gameCtx.moveTo( x, y + cr );
	gameCtx.lineTo( x, y + ch - cr );
	gameCtx.quadraticCurveTo( x, y + ch, x + cr, y + ch );
	gameCtx.lineTo( x + cw - cr, y + ch );
	gameCtx.quadraticCurveTo( x + cw, y + ch, x + cw, y + ch - cr );
	gameCtx.lineTo( x + cw, y + cr );
	gameCtx.quadraticCurveTo( x + cw, y, x + cw - cr, y );
	gameCtx.lineTo( x + cr, y );
	gameCtx.quadraticCurveTo( x, y, x, y + cr );
	gameCtx.closePath();
}


init_page();

window.requestAnimationFrame( draw_game );