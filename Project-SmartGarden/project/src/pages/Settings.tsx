import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Alert,
} from '@mui/material';
import { useState } from 'react';
import { Wifi, Server } from 'lucide-react';

export default function Settings() {
  const [espIp, setEspIp] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [autoConnect, setAutoConnect] = useState(true);

  const handleConnect = () => {
    // Implement ESP connection logic here
    setIsConnected(true);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Wifi className="mr-2" /> ESP Device Connection
          </Typography>
          
          <TextField
            fullWidth
            label="ESP Device IP Address"
            variant="outlined"
            value={espIp}
            onChange={(e) => setEspIp(e.target.value)}
            sx={{ mb: 2 }}
          />
          
          <FormControlLabel
            control={
              <Switch
                checked={autoConnect}
                onChange={(e) => setAutoConnect(e.target.checked)}
              />
            }
            label="Auto-connect on startup"
          />

          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              onClick={handleConnect}
              startIcon={<Server />}
            >
              Connect to ESP Device
            </Button>
          </Box>

          {isConnected && (
            <Alert severity="success" sx={{ mt: 2 }}>
              Successfully connected to ESP device
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            System Information
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Version: 1.0.0
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Last Updated: {new Date().toLocaleDateString()}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}