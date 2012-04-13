
function sendMessage(_screen, _obj, _json){
	// TODO: Determine Type of Object being sent
	// TODO: Digest the data into JSON
	// TODO: Check if JSON is needed, don't parse if not needed

	//console.log(_obj);
	var sendObj = {
		type: "ambientPage",
		color: _obj.color,
		position: _obj.plane.position,
		speed: _obj.plane.speed,
		rotation: _obj.plane.rotation,
		scale: _obj.plane.scale
	};
	var sendJSON = JSON.stringify(sendObj);
	//console.log(sendJSON);

    _screen.postMessage(sendJSON, window.location.origin); 

}


function receiveMessage(event)  
{  
  //console.log(event);
  //console.log(JSON.parse(event.data));
  var newData = JSON.parse(event.data);
  if (newData.type == "ambientPage"){
	//console.log(newData.type);
	//TODO: Pass init values to AddPage function
  }

  //console.log(newData);
  //addBox(newData);

}  
window.addEventListener("message", receiveMessage, false);

