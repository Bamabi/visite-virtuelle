$(document).ready(function(){



	click=false;

	posX = 0;
	posClickX=0;
	newPosMouse=0;
	start = {x: 500, y: 0},

	img = $('img');
	width = img.width;
	height = img.height;

	container = $("#container")
	container.css('background-image', 'url('+img.attr("src")+')');


    container.mousedown(function(){
    	click=true;
    	posClickX = event.pageX - this.offsetLeft;
    	//mouvement(posClick);
	});

	container.mouseup(function(){
		click=false;
	});

	container.mousemove(function(){
		if(click==true){
			var posMouseX = event.pageX - this.offsetLeft;
			
			start.x = posMouseX;


			$(this).css('background-position', start.x + 'px ' + start.y + 'px');
	


			/*var posMouseX = event.pageX - this.offsetLeft;
		    var y = event.pageY - this.offsetTop;

	  		var pageCoords = "( " + posMouseX + ", " + y + " )";
			$( "span:first" ).text( "( event.pageX, event.pageY ) : " + pageCoords + width);

			newPosMouseX = posClickX - posMouseX;
			$( "span:last" ).text( "newPosMouseX : " + newPosMouseX );
			$("#container").css('background-position', newPosMouseX+' 0px');
	*/
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