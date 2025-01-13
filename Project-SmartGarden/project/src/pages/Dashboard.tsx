import { useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Thermometer,
  Droplets,
  Wind,
  Sun,
  Camera,
  Power,
  AlertTriangle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme as useCustomTheme } from '../contexts/ThemeContext';

const initialSensorData = [
  { time: '00:00', temperature: 22, humidity: 67, soilMoisture: 45 },
  { time: '04:00', temperature: 20, humidity: 70, soilMoisture: 48 },
  { time: '08:00', temperature: 23, humidity: 68, soilMoisture: 42 },
  { time: '12:00', temperature: 26, humidity: 62, soilMoisture: 40 },
  { time: '16:00', temperature: 25, humidity: 63, soilMoisture: 43 },
  { time: '20:00', temperature: 21, humidity: 67, soilMoisture: 46 },
];

export default function Dashboard() {
  const [relayStatus, setRelayStatus] = useState(false);
  const [lightStatus, setLightStatus] = useState(false);
  const [ventilationStatus, setVentilationStatus] = useState(false);

  // States for sensor values
  const [temperature, setTemperature] = useState(24);
  const [humidity, setHumidity] = useState(65);
  const [soilMoisture, setSoilMoisture] = useState(45);
  const [lightLevel, setLightLevel] = useState(850);

  const theme = useTheme();
  const { isDarkMode } = useCustomTheme();

  const [prevTemperature, setPrevTemperature] = useState(24);
  const [prevHumidity, setPrevHumidity] = useState(65);
  const [prevSoilMoisture, setPrevSoilMoisture] = useState(45);
  const [prevLightLevel, setPrevLightLevel] = useState(850);

  // Update values every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly update values (can replace with real sensor data)
      const newTemp = prevTemperature + (Math.random() > 0.5 ? 1 : -1);
      const newHumidity = prevHumidity + (Math.random() > 0.5 ? 2 : -2);
      const newSoilMoisture = prevSoilMoisture + (Math.random() > 0.5 ? 2 : -2);
      const newLightLevel = prevLightLevel + (Math.random() > 0.5 ? 10 : -10);

      // Update the state with the new values
      setTemperature(newTemp);
      setHumidity(newHumidity);
      setSoilMoisture(newSoilMoisture);
      setLightLevel(newLightLevel);

      // Update the previous values to the current ones for next comparison
      setPrevTemperature(newTemp);
      setPrevHumidity(newHumidity);
      setPrevSoilMoisture(newSoilMoisture);
      setPrevLightLevel(newLightLevel);
    }, 5000); // 5000ms = 5 seconds

    // Clean up the interval when component unmounts
    return () => clearInterval(interval);
  }, [prevTemperature, prevHumidity, prevSoilMoisture, prevLightLevel]);

  const getTrend = (currentValue: number, prevValue: number): string => {
    if (currentValue > prevValue) {
      return '↑';
    } else if (currentValue < prevValue) {
      return '↓';
    } else
      return '→'; // Stable
  };

  const statusCards = [
    { title: 'Temperature', value: `${temperature}°C`, icon: Thermometer, trend: getTrend(temperature, prevTemperature), color: theme.palette.error.main },
    { title: 'Humidity', value: `${humidity}%`, icon: Droplets, trend: getTrend(humidity, prevHumidity), color: theme.palette.primary.main },
    { title: 'Soil Moisture', value: `${soilMoisture}%`, icon: Wind, trend: getTrend(soilMoisture, prevSoilMoisture), color: theme.palette.success.main },
    { title: 'Light Level', value: `${lightLevel} lux`, icon: Sun, trend: getTrend(lightLevel, prevLightLevel), color: theme.palette.warning.main },
  ];

  return (
      <Box sx={{ height: '100%' }}>
        {/* Status Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {statusCards.map((card, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                    sx={{
                      height: '100%',
                      background: isDarkMode
                          ? `linear-gradient(135deg, ${alpha(card.color, 0.15)}, transparent)`
                          : undefined,
                    }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <card.icon size={24} style={{ color: card.color }} />
                      <Typography variant="h6" sx={{ ml: 1 }}>
                        {card.title}
                      </Typography>
                    </Box>
                    <Typography variant="h4" sx={{ mt: 2, color: card.color }}>
                      {card.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {card.trend}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
          ))}
        </Grid>

        {/* Charts Section */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Sensor Readings
            </Typography>
            <Box sx={{ height: 400 }}>
              <ResponsiveContainer>
                <LineChart data={initialSensorData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? alpha('#fff', 0.1) : alpha('#000', 0.1)} />
                  <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
                  <YAxis stroke={theme.palette.text.secondary} />
                  <Tooltip
                      contentStyle={{
                        backgroundColor: theme.palette.background.paper,
                        border: `1px solid ${theme.palette.divider}`,
                      }}
                  />
                  <Line type="monotone" dataKey="temperature" stroke={theme.palette.error.main} strokeWidth={2} />
                  <Line type="monotone" dataKey="humidity" stroke={theme.palette.primary.main} strokeWidth={2} />
                  <Line type="monotone" dataKey="soilMoisture" stroke={theme.palette.success.main} strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>

        {/* Controls Section */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Camera size={24} />
                  <Typography variant="h6" sx={{ ml: 1 }}>
                    Live Camera Feed
                  </Typography>
                </Box>
                <Box
                    sx={{
                      aspectRatio: '16/9',
                      backgroundColor: isDarkMode ? alpha('#fff', 0.05) : alpha('#000', 0.05),
                      borderRadius: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                >
                  <Box sx={{ textAlign: 'center' }}>
                    <Webcam
                        audio={false}
                        height="480"
                        width="640"
                        videoConstraints={{
                          facingMode: "user"
                        }}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Power size={24} />
                  <Typography variant="h6" sx={{ ml: 1 }}>
                    System Controls
                  </Typography>
                </Box>
                <Button
                    variant={relayStatus ? 'contained' : 'outlined'}
                    onClick={() => setRelayStatus(!relayStatus)}
                    fullWidth
                    sx={{ mb: 2, height: 56 }}
                >
                  Carbon Sensor Relay: {relayStatus ? 'ON' : 'OFF'}
                </Button>
                <Button
                    variant={lightStatus ? 'contained' : 'outlined'}
                    onClick={() => setLightStatus(!lightStatus)}
                    fullWidth
                    sx={{ mb: 2, height: 56 }}
                >
                  Green House Lights: {lightStatus ? 'ON' : 'OFF'}
                </Button>
                <Button
                    variant={ventilationStatus ? 'contained' : 'outlined'}
                    onClick={() => setVentilationStatus(!ventilationStatus)}
                    fullWidth
                    sx={{ mb: 2, height: 56 }}
                >
                  Ventilation: {ventilationStatus ? 'ON' : 'OFF'}
                </Button>
                <Card
                    sx={{
                      backgroundColor: isDarkMode
                          ? alpha(theme.palette.warning.main, 0.15)
                          : alpha(theme.palette.warning.light, 0.1),
                      boxShadow: 'none',
                    }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <AlertTriangle color={theme.palette.warning.main} />
                      <Box>
                        <Typography variant="subtitle2" color="warning.main">
                          Energy Usage Alert
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Current power consumption is above average. Consider optimizing system settings.
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
  );
}