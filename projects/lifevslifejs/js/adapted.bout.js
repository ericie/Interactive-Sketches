var boardsLoaded = false;
var board1;
var board2;
var boutGrid;

function Bout(_grid){
	boutGrid = _grid;
	this.loadBout("bout1.js");
}

Bout.prototype.loadBout = function(_boutName){
	log("Try: "+_boutName);
	
	$.ajax({
		url: "bouts/bout1.js",
		global: false,
		type: "GET",
		dataType: "json",
		success: function(data, msg){
		
	        //alert("MSG: "+msg);
			log("Board Loading = "+msg);
			boardsLoaded = true;
			
			log("DATA: "+data.title);
			
			$.each(data.boards, function(i,item){
				
				log("EACH: "+item);
				
				if ( i == 0){
					board1 = item;
				} else if ( i == 1){
					board2 = item;
				} else {
					return false;
				}
			});
			
			
			log("after");
			if (msg == "success"){
				grid.setupGrids();
			} else {
				log("Board Loading Failure");
			}
			
			
			//startBoards();

		}
	});
	
}

Bout.prototype.getBoards = function(){
	//alert(board1);
	return [board1,board2];
}