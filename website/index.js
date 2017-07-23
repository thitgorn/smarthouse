var link = "http://158.108.165.223/data/fukseed/";
var people = 0; // count how many person in house
var doorState = 0; // define 1 = outside in , define 2 = insite go out site.

$(document).ready(function() {
  console.log("im ready");

  setInterval(function() {
    recieveLight();
    recieveTemperature();
    recieveUltra1();
    recieveUltra2();
  }, 1000);
});


var LIGHTCONSTANT = 500;
// this is just revieve the number of light
function recieveLight() {
  $.ajax({
    url: link + "light"
  })
    .done(function(data) {
        if(data>=LIGHTCONSTANT){
            // openLight();
        }
    })
    .fail();
}

// this is for recieving the tempearture in house
function recieveTemperature() {
  $.ajax({
    url: link + "temperature"
  })
    .done(function(data) {
    })
    .fail();
}

var ULTRACONSTANT = 10;

// this is for recieving the ultrasonic in front of door/
function recieveUltra1() {
  $.ajax({
    url: link + "ultra1"
  })
    .done(function(data) {
        switch(doorState){
            case 0:// DO NOT THING;
            if( ULTRACONSTANT!==parseInt(data) ){
                doorState = 1;
                openDoor();
            }
            break;
            case 1:// keep waiting until user walk out;
            if( ULTRACONSTANT===parseInt(data)){
                doorState = 2;
            }
            break;
            case 4:
            if(ULTRACONSTANT===parseInt(data)){
                people--;
                closeDoor;
                doorState = 0;
            }
            break;
            default://DONOTHTING
        }
    })
    .fail();
}

// this is for recieving the ultrasonic in the house/
function recieveUltra2() {
  $.ajax({
    url: link + "ultra2"
  })
    .done(function(data) {
        switch(doorState){
            case 0:// DO NOT THING;
            if( ULTRACONSTANT!==parseInt(data) ){
                openDoor();
                doorState = 3;
            }break;
            case 2:// wait ultil user walk out;
            if( ULTRACONSTANT===parseInt(data)){
                closeDoor();
                people++;
                doorState = 0;
            }break;
            case 3:
            if( ULTRACONSTANT===parseInt(data)){
                doorState = 4;
            }break;
            default://DONOTHTING
        }
    })
    .fail();
}


function openDoor(){
    console.log("open door");
    // Do open door.
    // sent text to server
    // TODO
}

function closeDoor(){
    console.log("close door");
    // Do close door
    // sent text to server.
    // TODO
}