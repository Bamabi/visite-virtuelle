$(document).ready(function(){
	buttonClick=false
	click=false
	posClick=0
	currentX=0
	currentColorLine = 599
	tabImages = new Array()
	currentScenePoint = new Array()
	currentSceneIndex=0


	start = {x: 0, y: 0}
	final = {x: 0, y: 0}
	img = $('img')
	url_img = img.attr("src")

	tabImages = getAllTransition()
	console.info(tabImages[0])

	//getCurrentScene()
	//alert(posXColor)
	//getTransition(currentColorLine+600)
	//alert(color.b)


	container = $("#container")
	container.css('background-image', 'url('+url_img+')')
	container.css('background-position','0 0')

	$("<button id='avant' class='button-deplacement icon-avancer'></button>").appendTo($(".container"));
	$("<button id='gauche' class='button-deplacement icon-direction'></button>").appendTo($(".container"));
	$("<button id='droite' class='button-deplacement icon-direction'></button>").appendTo($(".container"));

  	container.mousedown(function(){
  		if(buttonClick == false){
	    	click=true;
	    	posClick = event.pageX - this.offsetLeft;
  		}

	});

	container.mouseup(function(){
		click=false;
		currentX = start.x;
		//start.y += 600;
	});

	container.mousemove(function(){
		if(click == true && buttonClick == false){
			posMouseX = event.pageX - this.offsetLeft;
			start.x = currentX + (posClick - posMouseX);
			horizontal();
		}
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
		buttonClick=true;
		goToScene(currentSceneIndex)
		vertical();
	});
	buttonAvant.mouseup(function(){
		buttonClick=false;
	});

	function horizontal(){
        $('span').text(start.x + " " + start.y);
        if (start.x>2000) 
        	start.x -= 2000
        else if(start.x<-2000)
        	start.x+=2000

		container.css('background-position', start.x + 'px ' + start.y + 'px');
		
		$('.transition').css('left', start.x );	
			

	}
	function vertical(){
        $('span').text(start.x + " " + start.y);

		container.css('background-position', start.x + 'px ' + start.y + 'px');
		
		$('.transition').css('top', start.y);	
	}

	function getImageData( url_img ) {
		var image = new Image();
		image.src = url_img;
	    var canvas = document.createElement( 'canvas' );
	    canvas.width = image.width;
	    canvas.height = image.height;

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

		for (var i = 1; i <= nbImages; i++) {
			nbPoint = 0;
			for (var j = 0; j <= imageData.width-1; j++) {
				tabImages[i-1] = new Array();	
				color = getPixel( imageData, j, 600*i-1);

				if(color.r != 0 || color.g != 0 || color.b != 0){
					tabImages[i-1][nbPoint] = new Array();
					tabImages[i-1][nbPoint].push(color.r+';'+color.g+';'+color.b, j, 600*i-600)
					console.info("Image n" + i + " position x :" + tabImages[i-1][nbPoint][1] + " n point " + nbPoint + " " + tabImages[i-1][nbPoint][0])
					console.info(tabImages)
					nbPoint++
				}
			}

		}
		console.info(tabImages)
		return tabImages
	}


	function goToScene(currentSceneIndex){
		currentColor = tabImages[currentSceneIndex]['color']
		currentPositionY = tabImages[currentSceneIndex]['positionY']
		/*for(i=0;i<tabImages.length;i++){
			alert(tabImages[i]['positionY'] + " et " + tabImages[i]['color'])
			if(currentPositionY != tabImages[i]['positionY'] && currentColor == tabImages[i]['color']){
				alert(start.y)
				start.y = tabImages[i]['positionY']
				alert(start.y+ " " + tabImages[i]['positionY'])
			}	
		}*/
		getCurrentScene()
	}


	function getCurrentScene(){
		currentScenePoint.length=0
		console.info(tabImages[0][0])
		for(i=0;i<tabImages.length;i++){
			/*if(start.y == tabImages[i][0][3]){
				currentSceneIndex=i

				for (var j = 0 - 1; j < 10; j--) {
					if(tabImages[i][j]==null)
						alert('coucou')
				};
				currentScenePoint = new Array()
				currentScenePoint[currentScenePoint.lenght]['xColor'] = tabImages[i]['xColor']
				alert(tabImages[i]['xColor'].length)

				[nbPoint] = new Array();
					tabImages[i-1][nbPoint][0] = color.r+';'+color.g+';'+color.b
					tabImages[i-1][nbPoint][1] = j
					tabImages[i-1][nbPoint][2] = 600*i-600
				//alert(tabImages[i]['xColor'])

				//alert(currentScenePoint[currentScenePoint.lenght]['xColor'])
			}	*/
		}
	}

	function enableTransition(){



	}

	function getTransition(currentColorLine){
		var imageData = getImageData( url_img );
		var nbImages = getNbImage(imageData)

		for (var j = 0; j <= imageData.width-1; j++) {

			color = getPixel( imageData, j, currentColorLine);

			if(color.r != 0 || color.g != 0 || color.b != 0){
				//alert(color.r+';'+color.g+';'+color.b + ' posX '+j+ ' posY '+currentColorLine);
				$("<i class='icon-transition'></i>").appendTo($(".container"));
				//alert(start.x +" "+ j + " " + start.x%j);
				return j;
			}
		};
		//var color = getPixel( imageData, 10, 10 );
	}

	function getNbImage(imageData){
		return imageData.height/600
	}
});