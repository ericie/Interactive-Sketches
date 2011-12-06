$(function() {
	var cur = 0;
	$('img.screenshot').click(function(e) {
		cur++;
		if (cur >= imgList.length){
			cur = 0;
		}
		
		console.log("Clicked " + cur);
		var imgUrl = 'images/' + imgList[cur];
		$(this).attr({'src': imgUrl});
		

	});
	
	/*
	$('.games_link').click(function(e) {
		//window.location = '../quiz/';
		imgList = ['facts-1.png', 'facts-2.png', 'facts-3.png', 'facts-4.png', 'facts-5.png', 'facts-6.png', 'facts-7.png', 'facts-7.png'];
		
		//cur++;
		//if (cur >= imgList.length){
			cur = 0;
		//}
		
		console.log("Clicked " + cur);
		var imgUrl = 'images/' + imgList[cur];
		$(this).attr({'src': imgUrl});
		
	});
	*/
	
});