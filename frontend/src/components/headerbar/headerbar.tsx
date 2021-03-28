import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { IconButton, Menu, MenuItem } from "@material-ui/core";

import UserCard from '../auth/UserCard';
import { Badge } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    cursor: "pointer"
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {setAnchorEl(event.currentTarget);};
  const handleClose = () => {setAnchorEl(null);};

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title} onClick={() => history.push('/')}>
            WClection
          </Typography>
          <IconButton color="inherit" onClick={handleMenu} style={{fontSize: "120%"}}>
            <Badge badgeContent={0} color="secondary" style={{marginRight: 25}}>
                <ShoppingCart />
            </Badge>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            getContentAnchorEl={null}
            anchorOrigin={{vertical: "bottom", horizontal: "center"}}
            transformOrigin={{vertical: "top", horizontal: "center"}}
            onClose={handleClose}>
            <MenuItem><i>Votre panier est vide</i></MenuItem>
          </Menu>
          <UserCard />
        </Toolbar>
      </AppBar>
    </div>
  );
}
