import { Box, Container, Typography, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { Sprout, Droplets, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: Sprout,
    title: 'Smart Monitoring',
    description: 'Real-time monitoring of soil conditions, temperature, and plant health using advanced IoT sensors',
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
  },
  {
    icon: Droplets,
    title: 'Water Management',
    description: 'Optimize water usage with intelligent irrigation control and scheduling based on real-time data',
    image: 'https://images.unsplash.com/photo-1463693396721-8ca0cfa2b3b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
  },
  {
    icon: Zap,
    title: 'Energy Efficiency',
    description: 'Monitor and optimize energy consumption for all garden systems and equipment',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
  }
];

export default function Home() {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: '70vh',
          display: 'flex',
          alignItems: 'center',
          backgroundImage: 'url(https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
            borderRadius: '16px',
          overflow: 'hidden',
            '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1,paddingRight:'200px' }}>
          <Typography
            variant="h2"
            component="h1"
            color="white"
            gutterBottom
            sx={{ fontWeight: 'bold' }}
          >
            Welcome to SmartGarden
          </Typography>
          <Typography
            variant="h5"
            color="white"
            sx={{ mb: 4, maxWidth: 600 }}
          >
            Transform your garden into an intelligent ecosystem with IoT-powered monitoring and management
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                  component={Link}
                  to="/dashboard"
                  variant="contained"
                  size="large"
                  sx={{
                      backgroundColor: 'primary.main',
                      borderRadius: '16px', // Adjust the value as needed
                      '&:hover': {
                          backgroundColor: 'primary.dark',
                      },
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                  }}
              >
                  View Dashboard
              </Button>
            <Button
              component={Link}
              to="/chatbot"
              variant="outlined"
              size="large"
              sx={{ color: 'white', borderColor: 'white' }}
              endIcon={<ArrowRight />}
            >
              Try our AI Assistant
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{ mb: 6 }}
        >
          Smart Features
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={feature.image}
                  alt={feature.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <feature.icon size={24} style={{ marginRight: 8, color: 'var(--mui-palette-primary-main)' }} />
                    <Typography variant="h6" component="h3">
                      {feature.title}
                    </Typography>
                  </Box>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Additional Image Section */}
      <Box
        sx={{
          position: 'relative',
          height: '50vh',
          backgroundImage: 'url(https://images.unsplash.com/photo-1624397640148-949b1732bb0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
            borderRadius: '16px',
          backgroundAttachment: 'fixed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          }
        }}
      >
        <Typography
          variant="h3"
          color="white"
          align="center"
          sx={{
            position: 'relative',
            zIndex: 1,
            maxWidth: 800,
            px: 3,
          }}
        >
          Experience the Future of Gardening
        </Typography>
      </Box>
    </Box>
  );
}