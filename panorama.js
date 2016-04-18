$(document).ready(function(){



	click=false;
	posClick=0;
	currentX=0;

	start = {x: 0, y: 0},
	final = {x: 0, y: 0},
	img = $('img');
	width = img.width;
	height = img.height;

	container = $("#container")
	container.css('background-image', 'url('+img.attr("src")+')');
	container.css('background-position','0 0');

    container.mousedown(function(){
    	click=true;
    	posClick = event.pageX - this.offsetLeft;
	});

	container.mouseup(function(){
		click=false;
		currentX = start.x;
	});

	container.mousemove(function(){
		if(click==true){
			posMouseX = event.pageX - this.offsetLeft;

			

			start.x = currentX + (posClick - posMouseX);
			$('span').text(currentX + ' ' + posClick + ' ' + posMouseX + ' ' + start.x);

			$(this).css('background-position', start.x + 'px ' + start.y + 'px');
	


			/*var posMouseX = event.pageX - this.offsetLeft;
		    var y = event.pageY - this.offsetTop;

	  		var pageCoords = "( " + posMouseX + ", " + y + " )";
			$( "span:first" ).text( "( event.pageX, event.pageY ) : " + pageCoords + width);

			newPosMouseX = posClickX - posMouseX;
			$( "span:last" ).text( "newPosMouseX : " + newPosMouseX );
			$("#container").css('background-position', newPosMouseX+' 0px');*/
		}
	});

	function mouvement(posClickX){
		/*$( "span:last" ).text( "posClickX : " + posClick );

    	$("#container").mousemove(function(event){

		    var posMouseX = event.pageX - this.offsetLeft;
		    var y = event.pageY - this.offsetTop;

	  		var pageCoords = "( " + posMouseX + ", " + y + " )";
			$( "span:first" ).text( "( event.pageX, event.pageY ) : " + pageCoords + width);

    		newPosMouse = posClickX - posMouseX;
			$( "span:last" ).text( "newPosMouse : " + newPosMouse );
			$("#container").css('background-position', newPosMouse+' 0px');
    	});*/
	}
});