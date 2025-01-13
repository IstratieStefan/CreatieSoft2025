import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Sun,
  Moon,
  Home as HomeIcon,
  MessageSquare,
  LayoutDashboard,
  Settings as SettingsIcon,
} from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme as useCustomTheme } from '../contexts/ThemeContext';

const navigation = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'ChatBot', href: '/chatbot', icon: MessageSquare },
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Settings', href: '/settings', icon: SettingsIcon },
];

export default function Navbar() {
  const theme = useTheme();
  const { isDarkMode, toggleTheme } = useCustomTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const location = useLocation();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            color: 'primary.main',
            textDecoration: 'none',
            fontWeight: 'bold',
            flexGrow: isMobile ? 0 : 1,
          }}
        >
          SmartGarden
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ ml: 'auto', mr: 1 }}
              onClick={handleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <MenuItem
                    key={item.name}
                    component={Link}
                    to={item.href}
                    onClick={handleClose}
                    selected={location.pathname === item.href}
                  >
                    <Icon size={18} style={{ marginRight: 8 }} />
                    {item.name}
                  </MenuItem>
                );
              })}
            </Menu>
          </>
        ) : (
          <Box sx={{ display: 'flex', gap: 2 }}>
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.name}
                  component={Link}
                  to={item.href}
                  color={location.pathname === item.href ? 'primary' : 'inherit'}
                  startIcon={<Icon size={18} />}
                >
                  {item.name}
                </Button>
              );
            })}
          </Box>
        )}

        <IconButton onClick={toggleTheme} color="inherit" sx={{ ml: 2 }}>
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}