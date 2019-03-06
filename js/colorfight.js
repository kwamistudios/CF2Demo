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

/* WEBSOCKET VARIABLES */
var gameSocket = new WebSocket( "ws://colorfightii.herokuapp.com/game_channel" ),
	gameData = false;

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
	}
	gameCtx.clearRect( 0, 0, gameCanvas.width, gameCanvas.height );
	if( gameData ) {
		gameCtx.fillStyle = "#000000";
		gameCtx.lineWidth = 2;
		for( var y = 0; y < 30; y++ ) {
			for( var x = 0; x < 30; x++ ) {
				gameCtx.strokeStyle = "#65c9cf";
				draw_cell( ( x * ( cellWidth + 4 ) ) + 1, ( y * ( cellHeight + 4 ) ) + 1, cellWidth, cellHeight, cellRadius );
				gameCtx.stroke();
				gameCtx.strokeStyle = "#faf334";
				draw_cell( ( x * ( cellWidth + 4 ) ) + 3, ( y * ( cellHeight + 4 ) ) + 3, cellWidth - 4, cellHeight - 4, cellRadius - 2 );
				gameCtx.fill();
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

function hex_combine( src, dest, per ) {
    var isrc = parseInt( src, 16 );
    var idest = parseInt( dest, 16 );
    var curr = Math.floor( isrc + ( idest - isrc ) * per );
    return ( "0" + curr.toString( 16 ) ).slice( -2 ).toUpperCase();
}

function combine_color( src, dest, per ) {
    if( per < 0 ) per = 0;
    return "#" + hex_combine( src.slice( 1, 3 ), dest.slice( 1, 3 ), per ) + hex_combine( src.slice( 3, 5 ), dest.slice( 3, 5 ), per ) + hex_combine( src.slice( 5 ), dest.slice( 5 ), per );
}

init_page();
window.requestAnimationFrame( draw_game );

gameSocket.onmessage = function( msg ) {
	gameData = JSON.parse( msg.data );
}