
function sendMessage(_screen, _obj, _json){
	// TODO: Determine Type of Object being sent
	// TODO: Digest the data into JSON
	// TODO: Check if JSON is needed, don't parse if not needed

	//console.log(_obj);
	var sendObj = {
		type: "ambientPage",
		color: _obj.color,
		position: _obj.plane.position,
		velocity: _obj.velocity,
		rotation: _obj.plane.rotation,
		scale: _obj.plane.scale
	};
	var sendJSON = JSON.stringify(sendObj);
	//console.log(sendJSON);

    _screen.postMessage(sendJSON, window.location.origin); 

}


function receiveMessage(event)  
{  
  var newData = JSON.parse(event.data);
  if (newData.type == "ambientPage"){
	//console.log(newData.type);
	//TODO: Pass init values to AddPage function
	receivePage(newData);

  }

}  
window.addEventListener("message", receiveMessage, false);

