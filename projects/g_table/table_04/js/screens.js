function openScreen(_num){
	if (_num == 1){
		if (!s1Status){
			screen2 = window.open('screen2.html','screen1','width=1920,height=1080'); 
			upScreen = screen2;
		}
	}
}

function loadScreen(_num){
	switch(_num)
	{
		case 1:
			swapBG("screen1");
			break;
		case 2:
			swapBG("screen2");
			break;
		case 3:
			swapBG("screen3");
			break;
		case 4:
			swapBG("screen4");
			break;
		default:
			return;
	}
}

function swapBG(_class){
	$('body').removeClass();
	$('body').addClass(_class);
}