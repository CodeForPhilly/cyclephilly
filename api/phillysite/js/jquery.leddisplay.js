(function( $ ) {

	var charactersMapData = {
		// A
		97: [[0, 1, 1, 1, 1], [1, 0, 1, 0, 0], [1, 1, 1, 1, 1]],
		65: [[0, 1, 1, 1, 1], [1, 0, 1, 0, 0], [1, 1, 1, 1, 1]],
		1072: [[0, 1, 1, 1, 1], [1, 0, 1, 0, 0], [1, 1, 1, 1, 1]],
		1040: [[0, 1, 1, 1, 1], [1, 0, 1, 0, 0], [1, 1, 1, 1, 1]],
		// Б
		1041: [[1, 1, 1, 1, 1], [1, 0, 1, 0, 1], [1, 0, 1, 1, 1]],
		1073: [[1, 1, 1, 1, 1], [1, 0, 1, 0, 1], [1, 0, 1, 1, 1]],
		// B
		1042: [[1, 1, 1, 1, 1], [1, 0, 1, 0, 1], [0, 1, 0, 1, 0]],
		1074: [[1, 1, 1, 1, 1], [1, 0, 1, 0, 1], [0, 1, 0, 1, 0]],
		98: [[1, 1, 1, 1, 1], [1, 0, 1, 0, 1], [0, 1, 0, 1, 0]],
		66: [[1, 1, 1, 1, 1], [1, 0, 1, 0, 1], [0, 1, 0, 1, 0]],
		// Г
		1043: [[1, 1, 1, 1, 1], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0]],
		1075: [[1, 1, 1, 1, 1], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0]],
		// Д
		1076: [[0, 0, 0, 1, 1], [0, 1, 1, 1, 0], [1, 0, 0, 1, 0], [1, 1, 1, 1, 0], [0, 0, 0, 1, 1]],
		1044: [[0, 0, 0, 1, 1], [0, 1, 1, 1, 0], [1, 0, 0, 1, 0], [1, 1, 1, 1, 0], [0, 0, 0, 1, 1]],
		// Е, Ё
		1045:[[1, 1, 1, 1, 1], [1, 0, 1, 0, 1], [1, 0, 0, 0, 1]],
		1077:[[1, 1, 1, 1, 1], [1, 0, 1, 0, 1], [1, 0, 0, 0, 1]],
		1025:[[1, 1, 1, 1, 1], [1, 0, 1, 0, 1], [1, 0, 0, 0, 1]],
		1105:[[1, 1, 1, 1, 1], [1, 0, 1, 0, 1], [1, 0, 0, 0, 1]],
		69:[[1, 1, 1, 1, 1], [1, 0, 1, 0, 1], [1, 0, 0, 0, 1]],
		101:[[1, 1, 1, 1, 1], [1, 0, 1, 0, 1], [1, 0, 0, 0, 1]],
		// Ж
		1046: [[1, 1, 0, 1, 1], [0, 0, 1, 0, 0], [1, 1, 1, 1, 1], [0, 0, 1, 0, 0], [1, 1, 0, 1, 1]],
		1078: [[1, 1, 0, 1, 1], [0, 0, 1, 0, 0], [1, 1, 1, 1, 1], [0, 0, 1, 0, 0], [1, 1, 0, 1, 1]],
		// З
		1047: [[1,0,0,0,1], [1,0,1,0,1], [0,1,0,1,0]],
		1079: [[1,0,0,0,1], [1,0,1,0,1], [0,1,0,1,0]],
		// И, Й
		1048: [[1,1,1,1,1], [0,0,0,1,0], [0,0,1,0,0], [1,1,1,1,1]],
		1080: [[1,1,1,1,1], [0,0,0,1,0], [0,0,1,0,0], [1,1,1,1,1]],
		1049: [[1,1,1,1,1], [0,0,0,1,0], [0,0,1,0,0], [1,1,1,1,1]],
		1081: [[1,1,1,1,1], [0,0,0,1,0], [0,0,1,0,0], [1,1,1,1,1]],
		// К
		1050: [[1,1,1,1,1], [0,0,1,0,0], [0,1,0,1,0], [1,0,0,0,1]],
		1082: [[1,1,1,1,1], [0,0,1,0,0], [0,1,0,1,0], [1,0,0,0,1]],
		75: [[1,1,1,1,1], [0,0,1,0,0], [0,1,0,1,0], [1,0,0,0,1]],
		107: [[1,1,1,1,1], [0,0,1,0,0], [0,1,0,1,0], [1,0,0,0,1]],
		// Л
		1051: [[0,0,0,0,1], [0,1,1,1,1], [1,0,0,0,0], [1,1,1,1,1]],
		1083: [[0,0,0,0,1], [0,1,1,1,1], [1,0,0,0,0], [1,1,1,1,1]],
		// М
		1052: [[1,1,1,1,1], [0,1,0,0,0], [0,0,1,0,0], [0,1,0,0,0], [1,1,1,1,1]],
		1084: [[1,1,1,1,1], [0,1,0,0,0], [0,0,1,0,0], [0,1,0,0,0], [1,1,1,1,1]],
		77: [[1,1,1,1,1], [0,1,0,0,0], [0,0,1,0,0], [0,1,0,0,0], [1,1,1,1,1]],
		109: [[1,1,1,1,1], [0,1,0,0,0], [0,0,1,0,0], [0,1,0,0,0], [1,1,1,1,1]],
		// Н
		72: [[1, 1, 1, 1, 1], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [1, 1, 1, 1, 1]],
		104: [[1, 1, 1, 1, 1], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [1, 1, 1, 1, 1]],
		1053: [[1, 1, 1, 1, 1], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [1, 1, 1, 1, 1]],
		1085: [[1, 1, 1, 1, 1], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [1, 1, 1, 1, 1]],
		// О
		79:[[0, 1, 1, 1, 0], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [0, 1, 1, 1, 0]],
		111:[[0, 1, 1, 1, 0], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [0, 1, 1, 1, 0]],
		1054:[[0, 1, 1, 1, 0], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [0, 1, 1, 1, 0]],
		1086:[[0, 1, 1, 1, 0], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [0, 1, 1, 1, 0]],
		// П
		1055: [[1,1,1,1,1], [1,0,0,0,0], [1,0,0,0,0], [1,1,1,1,1]],
		1087: [[1,1,1,1,1], [1,0,0,0,0], [1,0,0,0,0], [1,1,1,1,1]],
		// Р
		1056: [[1,1,1,1,1], [1,0,1,0,0], [1,1,1,0,0]],
		1088: [[1,1,1,1,1], [1,0,1,0,0], [1,1,1,0,0]],
		80: [[1,1,1,1,1], [1,0,1,0,0], [1,1,1,0,0]],
		112: [[1,1,1,1,1], [1,0,1,0,0], [1,1,1,0,0]],
		// С [0,0,0,0,0]
		67: [[0,1,1,1,0], [1,0,0,0,1], [1,0,0,0,1]],
		99: [[0,1,1,1,0], [1,0,0,0,1], [1,0,0,0,1]],
		1057: [[0,1,1,1,0], [1,0,0,0,1], [1,0,0,0,1]],
		1089: [[0,1,1,1,0], [1,0,0,0,1], [1,0,0,0,1]],
		// Т
		1058: [[1,0,0,0,0], [1,1,1,1,1], [1,0,0,0,0]],
		1090: [[1,0,0,0,0], [1,1,1,1,1], [1,0,0,0,0]],
		84: [[1,0,0,0,0], [1,1,1,1,1], [1,0,0,0,0]],
		116: [[1,0,0,0,0], [1,1,1,1,1], [1,0,0,0,0]],
		// У
		1059: [[1,1,1,0,1], [0,0,1,0,1], [1,1,1,1,0]],
		1091: [[1,1,1,0,1], [0,0,1,0,1], [1,1,1,1,0]],
		// Ф
		1092: [[0,1,1,0,0], [1,0,0,1,0], [1,1,1,1,1], [1,0,0,1,0], [0,1,1,0,0]],
		1060: [[0,1,1,0,0], [1,0,0,1,0], [1,1,1,1,1], [1,0,0,1,0], [0,1,1,0,0]],
		// Х
		1061: [[1,1,0,1,1], [0,0,1,0,0], [1,1,0,1,1]],
		1093: [[1,1,0,1,1], [0,0,1,0,0], [1,1,0,1,1]],
		88: [[1,1,0,1,1], [0,0,1,0,0], [1,1,0,1,1]],
		120: [[1,1,0,1,1], [0,0,1,0,0], [1,1,0,1,1]],
		// Ц
		1062: [[1,1,1,1,1], [0,0,0,0,1], [1,1,1,1,1], [0,0,0,0,1]],
		1094: [[1,1,1,1,1], [0,0,0,0,1], [1,1,1,1,1], [0,0,0,0,1]],
		// Ч
		1063: [[1,1,1,0,0], [0,0,1,0,0], [1,1,1,1,1]],
		1095: [[1,1,1,0,0], [0,0,1,0,0], [1,1,1,1,1]],
		// Ш
		1064: [[1,1,1,1,1], [0,0,0,0,1], [0,0,1,1,1],[0,0,0,0,1], [1,1,1,1,1]],
		1096: [[1,1,1,1,1], [0,0,0,0,1], [0,0,1,1,1],[0,0,0,0,1], [1,1,1,1,1]],
		// Щ
		1065: [[1,1,1,1,1], [0,0,0,0,1], [0,0,1,1,1],[0,0,0,0,1], [1,1,1,1,1],[0,0,0,0,1]],
		1097: [[1,1,1,1,1], [0,0,0,0,1], [0,0,1,1,1],[0,0,0,0,1], [1,1,1,1,1],[0,0,0,0,1]],
		// Ъ
		1066: [[1,0,0,0,0], [1,1,1,1,1], [0,0,1,0,1], [0,0,1,1,1]],
		1098: [[1,0,0,0,0], [1,1,1,1,1], [0,0,1,0,1], [0,0,1,1,1]],
		// Ы
		1067: [[1,1,1,1,1], [0,0,1,0,1], [0,0,1,1,1], [0,0,0,0,0], [1,1,1,1,1]],
		1099: [[1,1,1,1,1], [0,0,1,0,1], [0,0,1,1,1], [0,0,0,0,0], [1,1,1,1,1]],
		// Ь
		1068: [[1,1,1,1,1], [0,0,1,0,1], [0,0,1,1,1]],
		1100: [[1,1,1,1,1], [0,0,1,0,1], [0,0,1,1,1]],
		// Э
		1069: [[0,1,0,1,0],[1,0,0,0,1], [1,0,1,0,1], [0,1,1,1,0]],
		1101: [[0,1,0,1,0],[1,0,0,0,1], [1,0,1,0,1], [0,1,1,1,0]],
		// Ю
		1070: [[1,1,1,1,1], [0,0,1,0,0], [0,1,1,1,0], [1,0,0,0,1], [0,1,1,1,0]],
		1102: [[1,1,1,1,1], [0,0,1,0,0], [0,1,1,1,0], [1,0,0,0,1], [0,1,1,1,0]],
		// Я
		1071: [[1,1,1,0,1],[1,0,1,1,0],[1,1,1,1,1]],
		1103: [[1,1,1,0,1],[1,0,1,1,0],[1,1,1,1,1]],
		
		// D
		68:[[1, 1, 1, 1, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [0, 1, 1, 1, 0]],
		100:[[1, 1, 1, 1, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [0, 1, 1, 1, 0]],
		// F
		70: [[1, 1, 1, 1, 1], [1,0,1,0,0], [1,0,0,0,0]],
		102: [[1, 1, 1, 1, 1], [1,0,1,0,0], [1,0,0,0,0]],
		// G
		71: [[0,1,1,1,0], [1,0,0,0,1], [1,0,1,0,1], [1,0,1,1,1]],
		103: [[0,1,1,1,0], [1,0,0,0,1], [1,0,1,0,1], [1,0,1,1,1]],
		// I
		73: [[1,0,0,0,1], [1,1,1,1,1], [1,0,0,0,1]],
		105: [[1,0,0,0,1], [1,1,1,1,1], [1,0,0,0,1]],
		// J
		74: [[0,0,0,1,0],[0,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0]],
		106: [[0,0,0,1,0],[0,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0]],
		// L
		76:[[1, 1, 1, 1, 1], [0, 0, 0, 0, 1], [0, 0, 0, 0, 1]],
		108:[[1, 1, 1, 1, 1], [0, 0, 0, 0, 1], [0, 0, 0, 0, 1]],
		// N
		78: [[1,1,1,1,1], [0,0,1,0,0], [0,0,0,1,0], [1,1,1,1,1]],
		110: [[1,1,1,1,1], [0,0,1,0,0], [0,0,0,1,0], [1,1,1,1,1]],
		// Q
		81: [[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0],[0,0,0,0,1]],
		113: [[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0],[0,0,0,0,1]],
		// R
		82:[[1, 1, 1, 1, 1], [1, 0, 1, 1, 0], [1, 1, 1, 0, 1]],
		114:[[1, 1, 1, 1, 1], [1, 0, 1, 1, 0], [1, 1, 1, 0, 1]],
		// S
		83: [[0,1,1,0,1],[1,0,1,0,1],[1,0,1,1,0]],
		115: [[0,1,1,0,1],[1,0,1,0,1],[1,0,1,1,0]],
		// U
		85: [[1,1,1,1,0],[0,0,0,0,1],[0,0,0,0,1],[1,1,1,1,0]],
		117: [[1,1,1,1,0],[0,0,0,0,1],[0,0,0,0,1],[1,1,1,1,0]],
		// V
		86: [[1,1,1,0,0],[0,0,0,1,0],[0,0,0,0,1],[0,0,0,1,0],[1,1,1,0,0]],
		118: [[1,1,1,0,0],[0,0,0,1,0],[0,0,0,0,1],[0,0,0,1,0],[1,1,1,0,0]],
		// W
		87:[[1, 1, 1, 1, 0], [0, 0, 0, 0, 1], [0, 0, 1, 1, 0], [0, 0, 0, 0, 1], [1, 1, 1, 1, 0]],
		119:[[1, 1, 1, 1, 0], [0, 0, 0, 0, 1], [0, 0, 1, 1, 0], [0, 0, 0, 0, 1], [1, 1, 1, 1, 0]],
		// Y
		89: [[1,1,0,0,0],[0,0,1,0,0],[0,0,0,1,1],[0,0,1,0,0],[1,1,0,0,0]],
		121: [[1,1,0,0,0],[0,0,1,0,0],[0,0,0,1,1],[0,0,1,0,0],[1,1,0,0,0]],
		// Z
		90: [[1,0,0,1,1],[1,0,1,0,1],[1,1,0,0,1]],
		122: [[1,0,0,1,1],[1,0,1,0,1],[1,1,0,0,1]],
		
		// 1
		49: [[0,1,0,0,1],[1,1,1,1,1],[0,0,0,0,1]],
		// 2
		50: [[1,0,1,1,1],[1,0,1,0,1],[1,1,1,0,1]],
		// 3
		51: [[1,0,1,0,1],[1,0,1,0,1],[1,1,1,1,1]],
		// 4
		52: [[1,1,1,0,0],[0,0,1,0,0],[1,1,1,1,1]],
		// 5
		53: [[1,1,1,0,1],[1,0,1,0,1],[1,0,1,1,1]],
		// 6
		54: [[0,1,1,1,1], [1,0,1,0,1], [0,0,1,1,1]],
		// 7
		55: [[1,0,0,0,0], [1,0,0,0,0], [1,1,1,1,1]],
		// 8
		56: [[1,1,1,1,1],[1,0,1,0,1],[1,1,1,1,1]],
		// 9
		57: [[1,1,1,0,1],[1,0,1,0,1],[1,1,1,1,1]],
		// 0
		48: [[1,1,1,1,1],[1,0,0,0,1],[1,1,1,1,1]],
		
		// +
		43: [[0,0,1,0,0],[0,1,1,1,0],[0,0,1,0,0]],
		// -
		45: [[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0]],
		// .
		46: [[0,0,0,0,1]],
		// ,
		44: [[0,0,0,0,1],[0,0,0,1,0]],
		// !
		33: [[1,1,1,0,1]],
		// (
		40: [[0,1,1,1,0], [1,0,0,0,1]],
		// )
		41: [[1,0,0,0,1], [0,1,1,1,0]],
		32: [[0,0,0,0,0], [0,0,0,0,0]],
	}

	var _betweenChar = [0,0,0,0,0];
	
	var defaults = {
			horizontalPixelsCount: 90,
			verticalPixelsCount: 5,
			pixelSize: 5,
			disabledPixelColor: '#404040',
			enabledPixelColor: 'red',
			pathToPixelImage: 'pixel.png',
			stepDelay: 40,
			// only for canvas
			backgroundColor: '#202020',
			// only for canvas
			pixelRatio: 0.7,
			runImmidiatly: true
		};
	
	var resolveMethods = function(element){
		var methods = null;
		if (element.tagName == 'DIV')
			return divMethods;
		if (element.tagName == 'CANVAS')
			return canvasMethods;
			
		$.error( 'Element "' +  element.tagName + '" dont supported in jQuery.leddisplay plugin' );
	}
	
	var privateMethods = {
		getPixelByOptions: function(options){
			var pixel = $('<div></div>');
			pixel.css('width', options.pixelSize + 'px');
			pixel.css('height', options.pixelSize + 'px');
			pixel.css('background', 'url("' + options.pathToPixelImage + '")');
			pixel.css('float', 'left');
			pixel.css('background-size', 'cover');
			pixel.css('background-color', options.disabledPixelColor);
			return pixel;
		},
		showTextDiv: function(containerElement, textData, startPosition){
			var options = containerElement.data('options');
			var textDataToDrawStartPosition = 0;
			if (startPosition < 0)
				textDataToDrawStartPosition = startPosition * -1;
				
			var textDataToDrawEndPosition = textData.length;
			if (startPosition >= 0)
			{
				textDataToDrawEndPosition = textDataToDrawStartPosition + (options.horizontalPixelsCount - startPosition)
			}
			else
			{
				textDataToDrawEndPosition = textDataToDrawStartPosition + options.horizontalPixelsCount;
			}
			
			if (textDataToDrawEndPosition > textData.length)
					textDataToDrawEndPosition = textData.length;
			
			var allPixels = containerElement.data('allPixels');
			
			for(var i = textDataToDrawStartPosition; i < textDataToDrawEndPosition; i++){
				var oneLine = textData[i];
				var position = startPosition + i;
				for(var j = 0; j < oneLine.length; j++){
					if (position > options.horizontalPixelsCount) position -= options.horizontalPixelsCount;
					var pixel = allPixels[j * options.horizontalPixelsCount + position];
					if (oneLine[j] == 0)
						$(pixel).css('background-color', options.disabledPixelColor);
					else
						$(pixel).css('background-color', options.enabledPixelColor);
				}
			}
		},
		showTextCanvas: function(containerElement, textData, startPosition){
			var options = containerElement.data('options');
			var context = containerElement.data('2dContext');
			var textDataToDrawStartPosition = 0;
			if (startPosition < 0)
				textDataToDrawStartPosition = startPosition * -1;
				
			var textDataToDrawEndPosition = textData.length;
			if (startPosition >= 0)
			{
				textDataToDrawEndPosition = textDataToDrawStartPosition + (options.horizontalPixelsCount - startPosition)
			}
			else
			{
				textDataToDrawEndPosition = textDataToDrawStartPosition + options.horizontalPixelsCount;
			}
			
			if (textDataToDrawEndPosition > textData.length)
					textDataToDrawEndPosition = textData.length;
			
			var allPixels = containerElement.data('allPixels');
			
			for(var i = textDataToDrawStartPosition; i < textDataToDrawEndPosition; i++){
				var oneLine = textData[i];
				var position = startPosition + i;
				for(var j = 0; j < oneLine.length; j++){
					if (oneLine[j] == 0) continue;
					
					if (position > options.horizontalPixelsCount) position -= options.horizontalPixelsCount;
					var pixel = allPixels[j * options.horizontalPixelsCount + position];
					
					context.beginPath();
					context.arc(pixel.centerX, pixel.centerY, pixel.radius, 0, 2 * Math.PI, false);
					
					pixel.enabled = true;
					context.fillStyle = options.enabledPixelColor;
					context.fill();
				}
			}
		},
		getDataFromString: function(str){
			var resultData = [];
			for (var i = 0; i < str.length; i++){
				var character = str[i];
				var characterData = this.getDataForCharacter(character);
				for (var d = 0; d < characterData.length; d++)
				{
					resultData.push(characterData[d]);
				}
				if (character.charCodeAt() != 32)
					resultData.push(_betweenChar);
			}
			
			return resultData;
		},
		getDataForCharacter: function(character){
			var charCode = character.charCodeAt();
			
			// trim enter, tabulation, etc.
			if (charCode < 32)
				return [];
			
			if (charactersMapData[charCode])
				return charactersMapData[charCode];
				
			return [[1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1]];
		},
		clearDiv: function($this){
			var options = $this.data('options');
			var allPixels = $this.data('allPixels');
			allPixels.css('background-color', options.disabledPixelColor);
		},
		clearCanvas: function($this){
			var options = $this.data('options');
			var allPixels = $this.data('allPixels');
			var context = $this.data('2dContext');
			//privateMethods.canvas_fillBackground(context, options);
			privateMethods.canvas_drawDisabledPixels(context, allPixels, options);
		},
		canvas_fillBackground: function(context, options){
			context.beginPath();
			var width = options.horizontalPixelsCount * options.pixelSize;
			var height = options.verticalPixelsCount * options.pixelSize;
			context.rect(0, 0, width, height);
			context.fillStyle = options.backgroundColor;
			context.fill();
		},
		canvas_drawDisabledPixels: function(context, allPixels, options){
			$(allPixels).each(function(){
				 if (this.enabled){
					 var x = this.centerX - options.pixelSize/2;
					 var y = this.centerY - options.pixelSize/2;
					 context.beginPath();
					 context.rect(x, y, options.pixelSize, options.pixelSize);
					 context.fillStyle = options.backgroundColor;
					 context.fill();
					 context.beginPath();
					 context.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI, false);
					 context.fillStyle = options.disabledPixelColor;
					 context.fill();
					 this.enabled = false;
				 }
			});
		}
	}
		
	var canvasMethods = {
		init: function(params, text){
			var options = $.extend(defaults, params);
			var context = this[0].getContext('2d');
			this.data('2dContext', context);
			this.data('options', options);
			var textToDisplay = text ? text : this.text();
			this.data('initialText', textToDisplay);
			this.data('textData', privateMethods.getDataFromString(textToDisplay));
			this.text('');
			this.data('currentPosition', options.horizontalPixelsCount);
			this.attr('width', (options.horizontalPixelsCount * options.pixelSize) + 'px');
			this.attr('height', (options.verticalPixelsCount * options.pixelSize) + 'px');
			
			privateMethods.canvas_fillBackground(context, options);
			
			var allPixels = [];
			for (var h = 0; h < options.verticalPixelsCount; h++)
				for (var w = 0; w < options.horizontalPixelsCount; w++)
					{
						 var centerX = w * options.pixelSize + (options.pixelSize/2);
						 var centerY = h * options.pixelSize + (options.pixelSize/2);
						 var radius = options.pixelSize * (options.pixelRatio / 2);
						 allPixels.push({centerX: centerX, centerY: centerY, radius: radius, enabled: true});
					}
					
			privateMethods.canvas_drawDisabledPixels(context, allPixels, options);
			
			this.data('allPixels', allPixels);
			var _this = this;
			
			if (!options.runImmidiatly)
				return;
			
			var intervalId = setInterval(function() {
				privateMethods.clearCanvas(_this);
				var currentPosition = _this.data('currentPosition');
				var currentData = _this.data('textData');
				privateMethods.showTextCanvas(_this, currentData, --currentPosition)
				
				if (currentPosition <= 0 && currentData.length < currentPosition * -1)
					currentPosition = options.horizontalPixelsCount;
				
				_this.data('currentPosition', currentPosition);
			}, options.stepDelay);
			
			this.data('intervalId', intervalId);
		},
		destroy: function(){
			clearInterval(this.data('intervalId'));
			this.removeData();
			this.removeAttr('width');
			this.removeAttr('height');
		}
	}	
	
	var divMethods = {
		init: function(params, text){
			var options = $.extend(defaults, params);
			
			this.data('options', options);
			var textToDisplay = text ? text : this.text();
			this.data('initialText', textToDisplay);
			this.data('textData', privateMethods.getDataFromString(textToDisplay));
			this.text('');
			this.data('currentPosition', options.horizontalPixelsCount);
			this.css('width', (options.horizontalPixelsCount * options.pixelSize) + 'px');
			this.css('height', (options.verticalPixelsCount * options.pixelSize) + 'px');
			for (var h = 1; h <= options.verticalPixelsCount; h++)
				for (var w = 1; w <= options.horizontalPixelsCount; w++)
					this.append(privateMethods.getPixelByOptions(options));
					
			this.data('allPixels', this.find('div'));
			var _this = this;
			if (!options.runImmidiatly)
				return;
			var intervalId = setInterval(function() {
				privateMethods.clearDiv(_this);
				var currentPosition = _this.data('currentPosition');
				var currentData = _this.data('textData');
				privateMethods.showTextDiv(_this, currentData, --currentPosition)
				
				if (currentPosition <= 0 && currentData.length < currentPosition * -1)
					currentPosition = options.horizontalPixelsCount;
				
				_this.data('currentPosition', currentPosition);
			}, options.stepDelay);
			this.data('intervalId', intervalId);
		},
		destroy: function(){
			clearInterval(this.data('intervalId'));
			this.children().remove();
			this.removeData();
			this.css('width', '');
			this.css('height', '');
		}
	}
	
	var customMethods = {
		init: function(){
			var _arg = arguments;
			return this.each(function() {
				var $this = $(this);
				if ($this.data('leddisplay'))
					return;
					
				$this.data('leddisplay', true);
				var methods = resolveMethods(this);
				methods.init.apply($this, _arg);
			});
		},
		destroy: function(){
			var _arg = arguments;
			return this.each(function() {
				var $this = $(this);
				if (!$this.data('leddisplay'))
					return;
					
				$this.data('leddisplay', null);
				var methods = resolveMethods(this);
				methods.destroy.apply($this, _arg);
			});
		},
		start: function(){
			
		},
		stop: function(){
		
		}
	}
		
	$.fn.leddisplay = function(method) {
		if ( customMethods[method] ) {
			return customMethods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return customMethods.init.apply( this, arguments );
		} else {
			$.error( 'Method "' +  method + '" dont find in jQuery.leddisplay plugin' );
		}
	};
})(jQuery);