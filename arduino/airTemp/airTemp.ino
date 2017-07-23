
#include<dht.h>
#define DHT11 3
#define AIR 4

dht DHT;
int dhtTemp;
int temperature;

void setup() {
  Serial.begin(9600);
  pinMode(AIR,OUTPUT);
}

void loop() {
  dhtTemp = DHT.read11(DHT11); //dht11
  temperature = (int)DHT.temperature; //call 
  Serial.println(temperature);
  delay(1000);
  if(temperature>=25)
  { 
    digitalWrite(AIR,HIGH);
    Serial.println("Air COnditoioner turn on");
  }
  else  
  {
    digitalWrite(AIR,LOW);
    Serial.println(digitalRead(AIR));
  }
    
 }
