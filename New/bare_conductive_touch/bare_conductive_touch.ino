


#include <MPR121.h>
#include <Wire.h>

#define switchElectrode1 0
#define outputPin1 8
#define switchElectrode2 1
#define outputPin2 9


void setup(){

  pinMode(outputPin1, OUTPUT);
  digitalWrite(outputPin1, LOW);
  pinMode(outputPin2, OUTPUT);
  digitalWrite(outputPin2, LOW);

  Serial.begin(9600);

  // 0x5C is the MPR121 I2C address on the Bare Touch Board
  if(!MPR121.begin(0x5C)){
    Serial.println("error setting up MPR121");
    while(1);
  }

  // pin 4 is the MPR121 interrupt on the Bare Touch Board
  MPR121.setInterruptPin(4);

  MPR121.setTouchThreshold(40);     // this is the threshold at which the board senses a touch
                                    // higher values are less sensitive, lower values are more sensitive
                                    // for proximity operation, you could try a value of 6

  MPR121.setReleaseThreshold(20);   // this is the threshold at which the board senses a release
                                    // higher values are less sensitive, lower values are more sensitive
                                    // for proximity operation, you could try a value of 3
                                    // this must ALWAYS be lower than the touch threshold

  // initial data update
  MPR121.updateTouchData();
}

void loop(){
  if(MPR121.touchStatusChanged()){
    MPR121.updateTouchData();
    if(MPR121.isNewTouch(switchElectrode1)){
      digitalWrite(outputPin1, HIGH);
      delay(100);
      digitalWrite(outputPin1, LOW);
    }
    if(MPR121.isNewTouch(switchElectrode2)){
      digitalWrite(outputPin2, HIGH);
      delay(100);
      digitalWrite(outputPin2, LOW);
    }
  }
}
