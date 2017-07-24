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
      console.log(doorState);
    } else {
        manualUltra1();
        manualUltra2();
        showTemperature();
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
  $('#lightOff').click(()=>closeLight());
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
          if (parseInt(data) >= 29) {
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

function showTemperature() {
  $.ajax({
    url: link + "temperature"
  })
    .done(function(data) {
      $("#currentTemp").html(data);
    })
    .fail();
}

var ULTRACONSTANT = 9;
var ULTRADOORCONSTANT = 5;

function manualUltra1(){
    $.ajax({
    url: link + "ultra1"
  })
    .done(function(data) {
      switch (doorState) {
        case 0: // DO NOT THING;
          if (ULTRACONSTANT >= parseInt(data)) {
            doorState = 1;
          }
          break;
        case 1: // keep waiting until user walk out;
          if (ULTRACONSTANT <= parseInt(data)) {
            doorState = 2;
          }
          break;
        case 4:
          if (ULTRACONSTANT <= parseInt(data)) {
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
          if (ULTRACONSTANT >= parseInt(data)) {
            doorState = 3;
          }
          break;
        case 2: // wait ultil user walk out;
          if (ULTRADOORCONSTANT <= parseInt(data)) {
            people++;
            $("#currentPeople").html(people);
            doorState = 0;
          }
          break;
        case 3:
          if (ULTRADOORCONSTANT <= parseInt(data)) {
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
          if (ULTRACONSTANT >= parseInt(data)) {
            doorState = 1;
            console.log("0");
            openDoor();
          }
          break;
        case 1: // keep waiting until user walk out;
          if (ULTRACONSTANT <= parseInt(data)) {
            doorState = 2;
            console.log("1");
          }
          break;
        case 4:
          if (ULTRACONSTANT <= parseInt(data)) {
            people--;
            $("#currentPeople").html(people);
            closeDoor;
            doorState = 0;
            console.log("4");
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
          if (ULTRACONSTANT >= parseInt(data)) {
            openDoor();
            doorState = 3;
            console.log("0");
          }
          break;
        case 2: // wait ultil user walk out;
          if (ULTRADOORCONSTANT <= parseInt(data)) {
            closeDoor();
            people++;
            $("#currentPeople").html(people);
            doorState = 0;
            console.log("2");
          }
          break;
        case 3:
          if (ULTRADOORCONSTANT <= parseInt(data)) {
            doorState = 4;
            console.log("4");
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
      $('#showDoor').html(":open");
    })
    .fail();
}

function closeDoor() {
  $.ajax({
    url: link + "door/set/close"
  })
    .done(function(data) {
        $('#showDoor').html(":close");
    })
    .fail();
}

function openLight() {
  $.ajax({
    url: link + "lamp/set/on"
  })
    .done(function(data) {
       $('#showLight').html(":Bright");
    })
    .fail();
}

function closeLight() {
  $.ajax({
    url: link + "lamp/set/off"
  })
    .done(function(data) {
       $('#showLight').html(":Dark");
    })
    .fail();
}

function openAir() {
  $.ajax({
    url: link + "air/set/on"
  })
    .done(function(data) {
      $('#showAir').html(":On");
    })
    .fail();
}

function closeAir() {
  $.ajax({
    url: link + "air/set/off"
  })
    .done(function(data) {
      $('#showAir').html(":Off");
    })
    .fail();
}
