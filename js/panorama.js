$(document).ready(function(){
	var buttonClick=false;
	var click=false;
	var posClick=0;
	var currentColorLine = 599;
	var tabImages = new Array();
	var currentScenePoint = new Array();
	var currentSceneIndex=0;
	var showTransi=0;

	var img = $('img');
	var url_img = img.attr("src");
	var imageWidth,imageHeight;

	var container = $("#container");
	container.css('background-image', 'url('+url_img+')');

	var start = {x: parseInt(container.css('background-positionX')), y: 0};
	var currentX=start.x;
	var zoneXVisite = container.width();

	$("<button id='avant' class='button-deplacement icon-avancer'></button>").appendTo($(".container"));
	$("<button id='gauche' class='button-deplacement icon-direction'></button>").appendTo($(".container"));
	$("<button id='droite' class='button-deplacement icon-direction'></button>").appendTo($(".container"));

	tabImages = getAllTransition();
	getCurrentScene();

  	container.mousedown(function(){
  		if(buttonClick == false){
	    	click=true;
	    	posClick = event.pageX - this.offsetLeft;
  		}

	});

	container.mouseup(function(){
		click=false;
		currentX = start.x;
	});

	container.mousemove(function(){
		if(click == true && buttonClick == false){
			posMouseX = event.pageX - this.offsetLeft;
			start.x = currentX + (posClick - posMouseX);
			horizontal();
		}
	});
	container.mouseout(function(){
		click=false;
		currentX = start.x;
	});

	buttonLeft = $("#gauche");
	buttonLeft.mousedown(function(){
		buttonClick=true;
		start.x = parseInt(container.css('background-positionX')) + 100;
		horizontal();
	});
	buttonLeft.mouseup(function(){
		buttonClick=false;
	});

	buttonRight = $("#droite");
	buttonRight.mousedown(function(){
		buttonClick=true;
		start.x = parseInt(container.css('background-positionX')) - 100;
		horizontal();
	});
	buttonRight.mouseup(function(){
		buttonClick=false;
	});

	buttonAvant = $("#avant");
	buttonAvant.mousedown(function(){
		if(showTransi==1){
			buttonClick=true;
			goToScene(buttonAvant.data("transition"));
		}
	});	
	buttonAvant.mouseup(function(){
		buttonClick=false;
	});
	buttonAvant.mouseover(function(){
		if(showTransi==1){
			buttonAvant.css('background-image','url(imgs/avant.png)');
		}else
			buttonAvant.css("background-image","url(imgs/falseBG.png)");
	});
	buttonAvant.mouseout(function(){
		if(showTransi==1){
			buttonAvant.css('background-image','url(imgs/avantnoir.png)');
		}else
			buttonAvant.css("background-image","url(imgs/falseBG.png)");
	});

	function horizontal(){
        //$('span').text(start.x + " " + start.y);
        if (start.x>imageWidth) 
        	start.x -= imageWidth
        else if(start.x<-imageWidth)
        	start.x+=imageWidth
		container.css('background-position', start.x + 'px ' + start.y + 'px');
		enableTransition()
	}

	function vertical(){
        //$('span').text(start.x + " " + start.y);
		container.css('background-position', start.x + 'px ' + start.y + 'px');
		enableTransition()
		getCurrentScene();
		buttonAvant.css("background-image","url(imgs/falseBG.png)");
		showTransi=0;
	}

	function getImageData( url_img ) {
		var image = new Image();
		image.src = url_img;
	    var canvas = document.createElement( 'canvas' );
	    canvas.width = image.width;
	    canvas.height = image.height;

	    imageWidth = image.width;
	    imageHeight= image.height;

	    var context = canvas.getContext( '2d' );
	    context.drawImage( image, 0, 0 );

	    return context.getImageData( 0, 0, image.width, image.height );
	}

	function getPixel( imageData, x, y ) {
		var position = ( x + imageData.width * y ) * 4, data = imageData.data;
		return { r: data[ position ], g: data[ position + 1 ], b: data[ position + 2 ], a: data[ position + 3 ] };
	
	}

	function getAllTransition(){
		var imageData = getImageData( url_img );
		var nbImages = imageData.height/600;

		var tabReturn = new Array();


		for (var i = 1; i <= nbImages; i++) {
			nbPoint = 0;
			tabImages[i-1] = new Array();	
			for (var j = 0; j <= imageData.width-1; j++) {
				color = getPixel( imageData, j, 600*i-1);

				if(color.r != 0 || color.g != 0 || color.b != 0){
					tabImages[i-1][nbPoint] = new Array();
					tabImages[i-1][nbPoint].push(color.r+';'+color.g+';'+color.b, j, -(600*i-600));
					nbPoint++;
				}
				if(j==imageWidth-1){
					tabReturn.push(tabImages[i-1]);
				}
			}
		}
		return tabReturn;
	}


	function goToScene(initColor){
		iteration:
		for(var i = 0; i < tabImages.length; i++){
			for (var j = 0; j < tabImages[i].length; j++) {
				if(initColor == tabImages[i][j][0] && start.y != tabImages[i][j][2]){
					start.x = tabImages[i][j][1];
					start.y = tabImages[i][j][2];
					vertical();
					break iteration;
				}
			}
		}
	}


	function getCurrentScene(){
		currentScenePoint = [];
		for(var i = 0; i < tabImages.length; i++){
			for (var j = 0; j < tabImages[i].length; j++) {
				if(start.y == tabImages[i][j][2]){
					currentSceneIndex= i;
					currentScenePoint.push(tabImages[i][j]);
				}
			}

		}
	}

	function enableTransition(){
		var transi = -1;
		var point = 0
		for (var i = currentScenePoint.length - 1; i >= 0; i--) {
			point = currentScenePoint[i][1];
			if(start.x < 0 && point < zoneXVisite/2){
				point = -(imageWidth-zoneXVisite/2+point);		
			}else if(start.x > 0 && point < zoneXVisite/2){
				point = zoneXVisite/2-point;
			}else if(start.x < 0 && point > zoneXVisite/2){
				point = -(point-zoneXVisite/2);
			}else if(start.x > 0 && point > zoneXVisite/2){
				point = (imageWidth-point)+zoneXVisite/2;
			}


			if((start.x > 0 && (point <= start.x + 100 && point >= start.x - 100)) || (start.x < 0 && (point <= start.x + 100 && point >= start.x - 100))){
				transi = i;
			}
		}
		if(transi!=-1){
			$('#avant').css("background-image","url(imgs/avantnoir.png)");
			$('#avant').data("transition",currentScenePoint[transi][0]);
			showTransi = 1;
		}else{
			$('#avant').css("background-image","url(imgs/falseBG.png)");
			showTransi = 0;
		}
	}

	function getNbImage(imageData){
		return imageData.height/600
	}
});