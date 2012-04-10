var grid;
var cellWidth = 10;
var cellHeight = 10;

var cellX;
var cellY;
var targetCell;
var activeGrid = false;
var activeCursor = false;
var turnOff = false;
var turnOn = false;
    
function draw() {
	//
	
	if ( activeGrid === true ){
		grid.generation();
		grid.drawGeneration();
	}
	
}


function initGrid(){
	grid = new LifeGrid()
}


function LifeGrid(){
	this.width = WIDTH;
	this.height = HEIGHT;
	
	var remainder;
	remainder = this.width % cellWidth;
	this.gridWidth = this.width - remainder;
	
	remainder = this.height % cellHeight;
	this.gridHeight = this.height - remainder;
	
	this.rows = Math.floor(this.gridHeight / cellHeight);
	this.cols = Math.floor(this.gridWidth / cellWidth);
	
	bg(0,0,this.gridWidth,this.gridHeight);
		
	this.refresh();
	
	this.curGen = this.blankArray();
	this.nextGen = this.blankArray();
	
}


LifeGrid.prototype.target = function(){
	// Find column target and number
	remainder = cursorX % cellWidth;
	var tx = Math.floor(cursorX - remainder);
	var c = Math.round(tx / cellWidth);
	
	// Find row target and number
	remainder = cursorY % cellHeight;
	var ty = Math.floor(cursorY - remainder);
	var r = Math.round(ty / cellHeight);
	
	// Set Grid or active
	this.toggleCurrentCell();

}


var team1;
var team2;

LifeGrid.prototype.checkCell = function(_r,_c){	
	
	if (_r >= this.curGen.length){ _r = 0; }
	if (_r < 0){ _r = this.curGen.length-1; }
	if (_c < 0){ _c = this.curGen[_r].length-1; }
	if (_c >= this.curGen[_r].length){ _c = 0; }
	
	if ( _r < this.curGen.length && _r >= 0 && _c >= 0 && _c < this.curGen[_r].length ){
	
		var thisN = this.curGen[_r][_c];
		
		if ( thisN != 0 ){
		  	if (thisN == 1){ team1 += 1; }
			if (thisN == 2){ team2 += 1; }
		  	return(1);
		} else {
			return(0);
		}
	
	}
	
}



var neighbors;
LifeGrid.prototype.generation = function(){
	var r = 0;
	var liveState = 0;
	this.changeList = [];
	for (r=0; r < this.rows; r++){
		var c = 0;
		for (c=0; c < this.cols; c++){
			liveState = this.curGen[r][c];

			neighbors = 0;
			team1 = 0;
			team2 = 0;
			neighbors += this.checkCell(r-1,c-1);
			neighbors += this.checkCell(r-1,c);
			neighbors += this.checkCell(r-1,c+1);
			neighbors += this.checkCell(r,c-1);
			neighbors += this.checkCell(r,c+1);
			neighbors += this.checkCell(r+1,c-1);
			neighbors += this.checkCell(r+1,c);
			neighbors += this.checkCell(r+1,c+1);
			
			var change = false;
			
			if (liveState >= 1 && neighbors > 1 && neighbors < 4){
				// STAY ALIVE
				this.nextGen[r][c] = this.curGen[r][c];
			}
			
			if (liveState >= 1){
				if (neighbors < 2 || neighbors > 3){
					// THE LIVE DIE
					this.nextGen[r][c] = 0;
					change = true
				}
			}
			
			if (liveState === 0 && neighbors === 3){
				// THE DEAD ARE BORN
				if (team1 > team2){
					this.nextGen[r][c] = 1;
				} else {
					this.nextGen[r][c] = 2;
				}
				change = true;
			}
			
			if (change === true){
				// ADD TO LIST OF CHANGES
				this.changeList.push([r,c]);
			}
			
		}
	}

}

LifeGrid.prototype.drawGeneration = function(){
	for (ch=0; ch < this.changeList.length; ch++){
		var r = this.changeList[ch][0];
		var c = this.changeList[ch][1];
		var tx = c * cellWidth;
		var ty = r * cellHeight;
		var liveState = this.nextGen[r][c];
		var target = false;
	
		//cell_outline(tx,ty,cellWidth,cellHeight,liveState, target, 1);
	}
	
	// Blank arrays for next Gen
	this.curGen = this.nextGen;
	this.nextGen = this.blankArray();
}


LifeGrid.prototype.toggleCurrentCell = function(){
	// Find column target and number
	remainder = cursorX % cellWidth;
	var tx = Math.floor(cursorX - remainder);
	var c = Math.floor(tx / cellWidth);

	// Find row target and number
	remainder = cursorY % cellHeight;
	var ty = Math.floor(cursorY - remainder);
	var r = Math.floor(ty / cellHeight);

	var target = false;
	//var liveState = this.curGen[prevR][prevC];
			
	// Erase Cell
	if (targetCell){
		var prevC = Math.floor(targetCell[0] / cellWidth);
		var prevR = Math.floor(targetCell[1] / cellHeight);
		target = false;
		liveState = this.curGen[prevR][prevC];
		
		// CHECK SIDE
		cell_outline(targetCell[0],targetCell[1],cellWidth,cellHeight,liveState,target,1);
	}
	
	target = true;
	
	// Set Grid or active
	if (activeCursor == true){
		if (turnOn == true){
			if (c * cellWidth < WIDTH / 2){
				this.curGen[r][c] = 1;
			} else {
				this.curGen[r][c] = 2;
			}
		} else {
			this.curGen[r][c] = 0;
		}
	}
	
	var liveState = this.curGen[r][c];
	
	// CHECK SIDE
	var team = liveState;
		
	//cell_outline(tx,ty,cellWidth,cellHeight,liveState, target, team);
	
	// Coordinates so we can erase the outline
	targetCell = [tx,ty];
}



LifeGrid.prototype.blankArray = function(){
	var rArray = [];
	var r = 0;
	for (r=0; r < this.rows; r++){
		rArray[r] = [];
		var c = 0;
		for (c=0; c < this.cols; c++){
			rArray[r][c] = 0;
		}
	}
	return rArray;
}

LifeGrid.prototype.refresh = function(){
	var r = 0;
	for (r=0; r < this.rows; r++){
		var c = 0;
		for (c=0; c < this.cols; c++){
			cellY = r * cellWidth;
			cellX = c * cellHeight;
			cell(cellX,cellY,cellWidth,cellHeight);
		}
	}
	
}

LifeGrid.prototype.start = function(){
	log("START");
	activeGrid = true;
}
LifeGrid.prototype.pause = function(){
	log("STOP");
	activeGrid = false;
}

LifeGrid.prototype.getCurrentCell = function(){
	remainder = cursorX % cellWidth;
	var tx = Math.floor(cursorX - remainder);
	var c = Math.floor(tx / cellWidth);

	// Find row target and number
	remainder = cursorY % cellHeight;
	var ty = Math.floor(cursorY - remainder);
	var r = Math.floor(ty / cellHeight);
	//this.curGen[r][c] = 1;
	return([r,c]);
}
LifeGrid.prototype.drawStart = function(){

	activeCursor = true;
	var myCoord = grid.getCurrentCell();
	var r = myCoord[0];
	var c = myCoord[1];
	var activeState = grid.curGen[r][c]
	
	if (activeState == false){
		turnOn = true;
	} else {
		turnOn = false;
	}
	
	turnOff = false;
	grid.toggleCurrentCell();
	
	log("Draw Start ");
}

LifeGrid.prototype.drawStop = function(){
	activeCursor = false;
	log("Draw Stop");
}

