import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import ListItemText from '@mui/material/ListItemText';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MenuIcon from '@mui/icons-material/Menu';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <Container maxWidth="xl">
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={toggleDrawer(true)} color="inherit">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">PersonalTrainer</Typography>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List>
          <ListItem component={Link} to="/customerlist" onClick={toggleDrawer(false)}>
            <ListItemText primary="Customers" />
          </ListItem>
          <ListItem component={Link} to="/training" onClick={toggleDrawer(false)}>
            <ListItemText primary="Training" />
          </ListItem>
        </List>
      </Drawer>
      <Outlet />
    </Container>
  );
}

export default App;