//Connect server
#include <Wire.h>
#include <UnoWiFiDevEd.h>

//Connect server
#define CONNECTOR     "rest"
#define SERVER_ADDR   "158.108.165.223"
String str = "";
CiaoData data;

//LDR
#define LED 2
int LDR;

//Ultrasonic
#define maxRange 200
#define minRange 0
//Ultrasonic1 (outdoor)
#define U1_echoPin 7
#define U1_trigPin 8
//Ultrasinic2 (indoor)
#define U2_echoPin 9
#define U2_trigPin 10
long U1_duration, U1_distance, U2_duration, U2_distance;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);

  //Connect server
  Ciao.begin();
  

  //LDR
  /*pinMode(LED, OUTPUT);
  */

  //Ultrasonic
  pinMode(U1_trigPin, OUTPUT);
  pinMode(U2_trigPin, OUTPUT);
  pinMode(U1_echoPin, INPUT);
  pinMode(U2_echoPin, INPUT);
  

}

void loop() {
  // put your main code here, to run repeatedly:

  //Connect server
    /*str = String("/data/5910500112/set/") + "Success";
    Serial.println(str);
    data = Ciao.write(CONNECTOR, SERVER_ADDR, str);

    if(!data.isEmpty()) {
    Ciao.println("State: " + String(data.get(1)));
    Ciao.println("Response: " + String(data.get(2)));
    } else {
    Ciao.println("Write Error");
    }
    str = "";
    delay(1000);*/

  //LDR
  /*LDR = analogRead(A0);
  //Serial.println(LDR);
  */
  //Ultrasonic1 (outdoor)
  /*digitalWrite(U1_trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(U1_trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(U1_trigPin, LOW);
  U1_duration = pulseIn(U1_echoPin, HIGH);
  U1_distance = U1_duration/58.2;

  if( U1_distance >= maxRange || U1_distance <= minRange) { U1_distance = -1; } 
  Serial.println(U1_distance);
  delay(50);;

  str = String("/data/fukseed/ultra1/set/") + String(U1_distance);
  Serial.println(str);
  data = Ciao.write(CONNECTOR, SERVER_ADDR, str);
  delay(1000);*/
  
  /*//Ultrasonic2 (indoor)
  digitalWrite(U2_trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(U2_trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(U2_trigPin, LOW);
  U2_duration = pulseIn(U2_echoPin, HIGH);
  U2_distance = U2_duration/58.2;

  if( U2_distance >= maxRange || U2_distance <= minRange) { U2_distance = -1; } 
  Serial.println(U2_distance);
  delay(50);*/
}
