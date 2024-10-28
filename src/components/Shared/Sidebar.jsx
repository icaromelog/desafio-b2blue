import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import RecyclingIcon from '@mui/icons-material/Recycling';

const drawerWidth = 240;

const transitionMixin = (theme, properties, duration) => ({
  transition: theme.transitions.create(properties, {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration[duration],
  }),
});

const openedMixin = (theme) => ({
  width: drawerWidth,
  ...transitionMixin(theme, 'width', 'enteringScreen'),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  ...transitionMixin(theme, 'width', 'leavingScreen'),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  backgroundColor: 'transparent',
  zIndex: theme.zIndex.drawer + 1,
  ...transitionMixin(theme, ['width', 'margin'], 'leavingScreen'),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    ...transitionMixin(theme, ['width', 'margin'], 'enteringScreen'),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Sidebar({ children }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ margin: '15px', boxShadow: 'none', userSelect: 'none' }} open={open}>
        <Toolbar sx={{ ml: '28px' }}>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ marginRight: 5, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h2" noWrap component="div" sx={{ display: 'block', fontWeight: '700', color: 'var(--blue-500)', letterSpacing: '-1px', fontSize: '2.5em' }}>
            B<span style={{ fontSize: '1.3em', color: 'var(--blue-300)' }}>2</span>Blue
          </Typography>
        </Toolbar>

      </AppBar>
      <Drawer variant="permanent" open={open} sx={{
        "& .MuiPaper-root": {
          borderRadius: '5px', border: 'none', height: 'calc(-2rem + 100vh)', margin: '13px', userSelect: 'none'
        }
      }}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} sx={{ ...(!open && { display: 'none' }) }}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <List>
          <ListItem key="coletaResiduos" disablePadding sx={{ display: 'block', padding: '.5em' }}>
            <ListItemButton
              selected
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                borderRadius: '5px',
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 'auto',
                  justifyContent: 'center',
                }}>
                <RecyclingIcon />
              </ListItemIcon>
              <ListItemText
                primary="Coleta Resíduos"
                sx={{
                  position: 'relative',
                  left: '15px',
                  opacity: open ? 1 : 0,
                  ...transitionMixin(theme, 'opacity', 'enteringScreen'),
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ p: 3 }}>
            <Link
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center' }}
              color="inherit"
              href="/"
            >
              Desafio Front-End B2Blue
            </Link>
            <Typography
              sx={{ color: 'text.primary', display: 'flex', alignItems: 'center' }}
            >
              <RecyclingIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Coleta de Resíduos
            </Typography>
          </Breadcrumbs>
        {children}
      </Box>
    </Box>
  );
}
