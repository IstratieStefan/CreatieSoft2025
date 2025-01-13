#include <Wire.h>
#include <Adafruit_BMP280.h>
#include <HardwareSerial.h>
#include <MHZ19.h>
#include <WiFi.h>
#include <ESPAsyncWebServer.h>

// Pin Definitions
#define CO2_RX_PIN 16
#define CO2_TX_PIN 17
#define MOISTURE_PIN 34
#define LIGHT_PIN 35

// Initialize BMP280 sensor
Adafruit_BMP280 bmp;  

// Initialize CO2 sensor
HardwareSerial mySerial(1);
MHZ19 co2Sensor;
int co2Concentration = 0; 

// WiFi credentials
const char* ssid = "SSID";  
const char* password = "PASSWORD";  

// Initialize web server
AsyncWebServer server(80);

void setup() {
  Serial.begin(115200);
  
  // Initialize BMP280 sensor
  if (!bmp.begin()) {
    Serial.println("Could not find BMP280 sensor!");
    while (1); 
  }

  // Initialize CO2 Sensor (using hardware serial)
  mySerial.begin(9600, SERIAL_8N1, CO2_RX_PIN, CO2_TX_PIN); 
  co2Sensor.begin(mySerial);

  // Connect to WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");

  // Serve sensor data as JSON
  server.on("/data", HTTP_GET, [](AsyncWebServerRequest *request){
    String jsonResponse = "{";
    
    // BMP280 sensor data
    jsonResponse += "\"temperature\": " + String(bmp.readTemperature()) + ",";
    jsonResponse += "\"pressure\": " + String(bmp.readPressure() / 100.0F) + ",";
    
    // CO2 sensor data
    co2Concentration = co2Sensor.getCO2();
    jsonResponse += "\"co2\": " + String(co2Concentration) + ",";
    
    // Moisture sensor data
    int moistureValue = analogRead(MOISTURE_PIN);
    jsonResponse += "\"moisture\": " + String(moistureValue) + ",";
    
    // Light sensor data
    int lightValue = analogRead(LIGHT_PIN);
    jsonResponse += "\"light\": " + String(lightValue);
    
    jsonResponse += "}";
    request->send(200, "application/json", jsonResponse);
  });

  // Start the server
  server.begin();
}

void loop() {

}
