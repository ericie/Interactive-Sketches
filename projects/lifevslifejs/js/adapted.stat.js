var currentMatch;
var generation;
var team1Count;
var team2Count;
var frameSig;
var countGrid;
var displayGen;
var displayStatus;
var	gameStatus;

function StatKeeper(_grid){
	countGrid = _grid;
	generation = 0;
	displayGen = $("#generationCount");
	displayTeam1 = $("#team1");
	displayTeam2 = $("#team2");
	displayStatus = $("#gameStatus");
	displayStatus.html("Waiting");
	//this.statusUpdate("Playing");
}

StatKeeper.prototype.count = function(_t1,_t2){
	generation += 1;
	displayGen.html(generation);
	displayTeam1.html(_t1);
	displayTeam2.html(_t2);
}


StatKeeper.prototype.setStatus = function(_status){
	gameStatus = _status;
	displayStatus.html(_status);
}