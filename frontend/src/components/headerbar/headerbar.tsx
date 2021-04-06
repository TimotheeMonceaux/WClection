import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Badge from '@material-ui/core/Badge';
import ShoppingCart from '@material-ui/icons/ShoppingCart';

import { AppStore } from '../../redux/action-types';
import { getCartSize, getCartItems } from '../../redux/selectors';
import UserCard from '../auth/UserCard';
import CartMenuItem from './CartMenuItem';


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

function mapStoreToProps(store: AppStore) {
  return {
    cartSize: getCartSize(store),
    cartItems: getCartItems(store),
    cart: store.cart
  }
}

const connectHeaderBar = connect(mapStoreToProps);

function HeaderBar(props: ConnectedProps<typeof connectHeaderBar>) {
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
            <Badge badgeContent={props.cartSize} color="secondary" style={{marginRight: 25}}>
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
              <div> {/* This div serves as Menu popover anchor. The anchor cannot be a connected component such as CartMenuItem due to ref forwarding issues. Read more : https://stackoverflow.com/questions/56307332/how-to-use-custom-functional-components-within-material-ui-menu */}
                {props.cartSize === 0 ? 
                  <MenuItem><i>Votre panier est vide</i></MenuItem> : 
                  props.cartItems.map(productId => <CartMenuItem productId={productId} quantity={props.cart[productId]} key={productId} />)}
              </div>
          </Menu>
          <UserCard />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default connectHeaderBar(HeaderBar);