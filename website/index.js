var link = "http://158.108.165.223/data/fukseed/";
var people = 0; // count how many person in house
var doorState = 0; // define 1 = outside in , define 2 = insite go out site.
var lightState = 0;
var airState = 0;
var isAuto = false;
// 0 for off
// 1 for on
$(document).ready(function() {
  setup();
  console.log("im ready");

  $("#currentPeople").html(people);
  setInterval(function() {
    if (isAuto) {
      recieveLight();
      recieveTemperature();
      recieveUltra1();
      recieveUltra2();
    } else {
        manualUltra1();
        manualUltra2();
        recieveTemperature();
    }
    console.log("total people : " + people);
  }, 1000);
});

function setup(){
  $('#mode').click(function(){
     var mode = $('#mode'); 
     if(isAuto){
         mode.html("Manual");
          $("#doorOpen").removeAttr("disabled");
          $("#doorClose").removeAttr("disabled");
          $("#lightOn").removeAttr("disabled");
          $("#lightOff").removeAttr("disabled");
          $("#airOn").removeAttr("disabled");
          $("#airOff").removeAttr("disabled");
      } else {
          mode.html("Automatic");
          $("#doorOpen").attr("disabled", "disabled");
          $("#doorClose").attr("disabled", "disabled");
          $("#lightOn").attr("disabled", "disabled");
          $("#lightOff").attr("disabled", "disabled");
          $("#airOn").attr("disabled", "disabled");
          $("#airOff").attr("disabled", "disabled");
      }
     isAuto = !isAuto;
  });
  $('#doorOpen').click(()=>openDoor());
  $('#doorClose').click(()=>closeDoor());
  $('#lightOn').click(()=>openLight());
  $('#lightOff').click(()=>closeDoor());
  $('#airOn').click(()=>openAir());
  $('#airOff').click(()=>closeAir());
}

var LIGHTCONSTANT = 500;
// this is just revieve the number of light
function recieveLight() {
  $.ajax({
    url: link + "light"
  })
    .done(function(data) {
      switch (lightState) {
        case 0:
          if (parseInt(data) >= LIGHTCONSTANT) {
            openLight();
            lightState = 1;
          }
          break;
        case 1:
          if (parseInt(data) < LIGHTCONSTANT) {
            closeLight();
            lightState = 0;
          }
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
      $("#currentTemp").html(data);
      switch (airState) {
        case 0:
          if (parseInt(data) <= 25) {
            openAir();
            airState = 1;
          }
          break;
        case 1:
          if (parseInt(data) <= 20) {
            closeAir();
            airState = 0;
          }
      }
    })
    .fail();
}

var ULTRACONSTANT = 10;

function manualUltra1(){
    $.ajax({
    url: link + "ultra1"
  })
    .done(function(data) {
      switch (doorState) {
        case 0: // DO NOT THING;
          if (ULTRACONSTANT !== parseInt(data)) {
            doorState = 1;
          }
          break;
        case 1: // keep waiting until user walk out;
          if (ULTRACONSTANT === parseInt(data)) {
            doorState = 2;
          }
          break;
        case 4:
          if (ULTRACONSTANT === parseInt(data)) {
            people--;
            $("#currentPeople").html(people);
            closeDoor;
            doorState = 0;
          }
          break;
        default: //DONOTHTING
      }
    })
    .fail();
}

function manualUltra2(){
  $.ajax({
    url: link + "ultra2"
  })
    .done(function(data) {
      switch (doorState) {
        case 0: // DO NOT THING;
          if (ULTRACONSTANT !== parseInt(data)) {
            openDoor();
            doorState = 3;
          }
          break;
        case 2: // wait ultil user walk out;
          if (ULTRACONSTANT === parseInt(data)) {
            people++;
            $("#currentPeople").html(people);
            doorState = 0;
          }
          break;
        case 3:
          if (ULTRACONSTANT === parseInt(data)) {
            doorState = 4;
          }
          break;
        default: //DONOTHTING
      }
    })
    .fail();
}

// this is for recieving the ultrasonic in front of door/
function recieveUltra1() {
  $.ajax({
    url: link + "ultra1"
  })
    .done(function(data) {
      switch (doorState) {
        case 0: // DO NOT THING;
          if (ULTRACONSTANT !== parseInt(data)) {
            doorState = 1;
            openDoor();
          }
          break;
        case 1: // keep waiting until user walk out;
          if (ULTRACONSTANT === parseInt(data)) {
            doorState = 2;
          }
          break;
        case 4:
          if (ULTRACONSTANT === parseInt(data)) {
            people--;
            $("#currentPeople").html(people);
            closeDoor;
            doorState = 0;
          }
          break;
        default: //DONOTHTING
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
      switch (doorState) {
        case 0: // DO NOT THING;
          if (ULTRACONSTANT !== parseInt(data)) {
            openDoor();
            doorState = 3;
          }
          break;
        case 2: // wait ultil user walk out;
          if (ULTRACONSTANT === parseInt(data)) {
            closeDoor();
            people++;
            $("#currentPeople").html(people);
            doorState = 0;
          }
          break;
        case 3:
          if (ULTRACONSTANT === parseInt(data)) {
            doorState = 4;
          }
          break;
        default: //DONOTHTING
      }
    })
    .fail();
}

function openDoor() {
  $.ajax({
    url: link + "door/set/open"
  })
    .done(function(data) {
      console.log("Door is opening!!");
    })
    .fail();
}

function closeDoor() {
  $.ajax({
    url: link + "door/set/close"
  })
    .done(function(data) {
      console.log("Door is closing!!");
    })
    .fail();
}

function openLight() {
  $.ajax({
    url: link + "lamp/set/on"
  })
    .done(function(data) {
      console.log("light is opening!!");
    })
    .fail();
}

function closeLight() {
  $.ajax({
    url: link + "lamp/set/off"
  })
    .done(function(data) {
      console.log("light is closing!!");
    })
    .fail();
}

function openAir() {
  $.ajax({
    url: link + "air/set/on"
  })
    .done(function(data) {
      console.log("air is opening!!");
    })
    .fail();
}

function closeAir() {
  $.ajax({
    url: link + "air/set/off"
  })
    .done(function(data) {
      console.log("air is closing!!");
    })
    .fail();
}
