$(document).ready(function(){

	var img = new Image();
	img.src="imgs/pano.jpg";
	click=false;
	width = img.width;
	height = img.height;
	posX = 0;
	posClick=0;
	newPosMouse=0;

	$("#container").css('background-image', 'url('+img.src+')');


    $("#container").mousedown(function(){
    	click=true;
    	$( "span:last" ).text( "click : " + click );
    	posClick = event.pageX - this.offsetLeft;
    	//mouvement(posClick);
	});

	$("#container").mouseup(function(){
		click=false;
		$( "span:last" ).text( "click : " + click );
	});

	$("#container").mousemove(function(){
		if(click==true){
			var posMouseX = event.pageX - this.offsetLeft;
		    var y = event.pageY - this.offsetTop;

	  		var pageCoords = "( " + posMouseX + ", " + y + " )";
			$( "span:first" ).text( "( event.pageX, event.pageY ) : " + pageCoords + width);

			newPosMouse = posClick - posMouseX;
			$( "span:last" ).text( "newPosMouse : " + newPosMouse );
			$("#container").css('background-position', newPosMouse+' 0px');
	
		}

	});

	function mouvement(posClick){
		/*$( "span:last" ).text( "posClick : " + posClick );

    	$("#container").mousemove(function(event){

		    var posMouseX = event.pageX - this.offsetLeft;
		    var y = event.pageY - this.offsetTop;

	  		var pageCoords = "( " + posMouseX + ", " + y + " )";
			$( "span:first" ).text( "( event.pageX, event.pageY ) : " + pageCoords + width);

    		newPosMouse = posClick - posMouseX;
			$( "span:last" ).text( "newPosMouse : " + newPosMouse );
			$("#container").css('background-position', newPosMouse+' 0px');
    	});*/
	}
});