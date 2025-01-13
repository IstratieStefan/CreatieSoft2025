import { Box, Container, Typography, Link } from '@mui/material';

export default function Footer() {
  return (
    <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="https://github.com/yourusername/smart-garden">
            SmartGarden
          </Link>{' '}
          {new Date().getFullYear()}
          {'. Released under the '}
          <Link color="inherit" href="https://opensource.org/licenses/MIT">
            MIT License
          </Link>
          {'.'}
        </Typography>
      </Container>
    </Box>
  );
}