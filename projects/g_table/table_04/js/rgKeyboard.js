/**
 * rgKeyboard
 * 
 * @dependency js/jQuery 1.6.2
 * @dependency css/rgKeyboard.css
 * A virtual keyboard designed for use in the framewall project.
 */

var rgKeyboard = function(){

	this.keyList = [
		[ '1','2','3','4','5','6','7','8','9','0','-','=','Bksp' ],
		[ 'q','w','e','r','t','y','u','i','o','p','[',']','\\' ],
		[ 'a','s','d','f','g','h','j','k','l',';','\'' ],
		[ 'Shift','z','x','c','v','b','n','m',',','.','/','Shift' ],
		[ 'Space' ]
	];

	this.shiftKeyList = [
		[ '!','@','#','$','%','^','&','*','(',')','_','+','Bksp' ],
		[ 'Q','W','E','R','T','Y','U','I','O','P','[',']','|'],
		[ 'A','S','D','F','G','H','J','K','L',':','"'],
		[ 'Shift','Z','X','C','V','B','N','M','<','>','?','Shift' ],
		[ 'Space' ]
	];

	this.inputArea = undefined;
	this.bShiftPressed = false;

	this.keyDOMArray = [];

	this.onShiftPress = function()
	{
		this.bShiftPressed = !this.bShiftPressed;
		var keyGroup = (this.bShiftPressed) ? this.shiftKeyList : this.keyList;

		for(var i=0; i<this.keyDOMArray.length; i++){
			for(var k=0; k<this.keyDOMArray[i].length; k++ ){
				$( this.keyDOMArray[i][k] ).find('p').html( keyGroup[i][k] );
			}
		}
	}

	this.onVirtualKeyboardPress = function(a, b)
	{
		if( !this.inputArea ) return;

		var vKey = $(a.currentTarget).find('p').html();

		switch( vKey ){
			case 'Bksp':
				var str = $(this.inputArea).val();
				$(this.inputArea).val( str.substr( 0, str.length-1 ) );
				break;
			case 'Space':
				$(this.inputArea).val( $(this.inputArea).val() + ' ' );
				break;
			case 'Shift':
				this.onShiftPress();
				break;
			case '&amp;':
			$(this.inputArea).val( $(this.inputArea).val() + "&" );
				break;
			default:
				$(this.inputArea).val( $(this.inputArea).val() + decodeURIComponent( escape(vKey) ) );
				break;
		}

		$(this.inputArea).focus();
	}

	/**
	 * Binds keyboard output to an input field
	 * @param domObject {DOMElement} The input field which the keyboard will output to when keys are pressed
	 */
	this.bindOutputTo = function( domObject )
	{
		this.inputArea = domObject;
	}
	/**
	 * Creates and appends the keyboard dom to the passed domObject.
	 * @param domObject {DOMElement || String} The dom element in which the keyboard will be appended
	 */
	this.appendTo = function( domObject )
	{
		var kb = $('<div id="keyboard"></div>');
		var self = this;

		for( var i=0; i<this.keyList.length; i++ ){
			var row = $('<div class="keyRow"></div>');
			$(kb).append( row );
			this.keyDOMArray[i] = [];

			for( var k=0; k<this.keyList[i].length; k++ ){
				var ky = $('<div class="outerKey"><div class="keyS"><p>' + this.keyList[i][k] + '</p></div></div>');
				$(ky).click( function(evt){
					self.onVirtualKeyboardPress(evt);
				});

				$(row).append( ky );

				if( this.keyList[i][k] == "Shift" || this.keyList[i][k] == "Bksp" ){
					$(ky).addClass('largeKey');
				}else if( this.keyList[i][k] == "Space" ){
					$(ky).addClass('spaceBar');
				}

				this.keyDOMArray[i][k] = ky;
			}
		}

		$( domObject ).append( kb );
	}

	return this;
}