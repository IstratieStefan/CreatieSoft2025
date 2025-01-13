
# Smart Garden

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Espressif](https://img.shields.io/badge/espressif-E7352C.svg?style=for-the-badge&logo=espressif&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

Smart Garden is a modern web application built to monitor and manage garden conditions with a real-time dashboard and chatbot. The app connects to various sensors using an ESP32 and provides an intelligent chatbot powered by GPT-4 to help users with gardening queries.
![Home](https://github.com/IstratieStefan/CreatieSoft2025/blob/main/Gallery/Home.png)
## Features
- **Real-Time Sensor Dashboard**: Displays live data from ESP32 sensors, including temperature, humidity, soil moisture, and light levels.
  ![Dash](https://github.com/IstratieStefan/CreatieSoft2025/blob/main/Gallery/Dashboard.png)
- **Chatbot**: Powered by GPT-4, it provides instant gardening advice and answers user queries.
  ![Chatbot](https://github.com/IstratieStefan/CreatieSoft2025/blob/main/Gallery/Chatbot.png)
- **ESP32 Integration**: Collects sensor data via HTTP communication, making it easy to connect and monitor your garden remotely.
  ![Settings](https://github.com/IstratieStefan/CreatieSoft2025/blob/main/Gallery/Settings.png)
- **Responsive UI**: Built using React and Material UI for a clean and intuitive user interface.

## Technologies Used
- **Frontend**: React, TypeScript, Material UI (MUI)
- **Backend**: ESP32 with HTTP communication
- **Chatbot**: GPT-4 via OpenAI API
- **Charts**: MUI X Charts for visualizing sensor data

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-username/smart-garden.git
cd smart-garden
```

### 2. Install dependencies
```bash
npm install react-camera
```

### 3. Set up the ESP32 Sensor
Follow the guide for setting up the ESP32 and connecting sensors:
- [ESP32-CAM Setup](https://randomnerdtutorials.com/program-upload-code-esp32-cam/)
- [ESP32 Pinout and Features](https://microcontrollerslab.com/esp32-cam-ai-thinker-pinout-gpio-pins-features-how-to-program/)
- [BMP280 Sensor API](https://docs.circuitpython.org/projects/bmp280/en/latest/api.html)

### 4. Configure Environment Variables
Ensure you have the correct API keys and URLs for the OpenAI GPT-4 and the ESP32 communication. Create a `.env` file and add the following:

```bash
REACT_APP_OPENAI_API_KEY=your_openai_api_key
REACT_APP_ESP32_SENSOR_URL=http://your_esp32_sensor_url
```

### 5. Start the Development Server
```bash
npm run dev
```

Your app will be running at `http://localhost:xxxx`.

## Bibliography
- [ESP32 & IoT](https://randomnerdtutorials.com/program-upload-code-esp32-cam/)
- [ESP32-CAM Pinout and Features](https://microcontrollerslab.com/esp32-cam-ai-thinker-pinout-gpio-pins-features-how-to-program/)
- [BMP280 Sensor API](https://docs.circuitpython.org/projects/bmp280/en/latest/api.html)
- [Material UI](https://mui.com/material-ui/)
- [MUI X Charts Tutorial](https://www.youtube.com/watch?v=Mzk0x5687YM)
- [Creating a Modern React App](https://dev.to/manojspace/creating-a-modern-react-app-a-comprehensive-guide-1plk?utm_source=chatgpt.com)
- [OpenAI API Documentation](https://platform.openai.com/docs/overview)

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
