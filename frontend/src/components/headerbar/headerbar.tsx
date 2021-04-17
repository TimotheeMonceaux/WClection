import { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Badge from '@material-ui/core/Badge';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';

import { AppStore, AppDispatch } from '../../redux/action-types';
import Actions from '../../redux/actions';
import { getCartSize, getCartItems, getCartValue, getUserName, isUserLoggedIn } from '../../redux/selectors';
import CartMenuItem from './CartMenuItem';
import LoginButton from '../auth/login/LoginButton';
import SignupButton from '../auth/signup/SignupButton';


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
    cartValue: getCartValue(store),
    cart: store.cart,
    isUserLoggedIn: isUserLoggedIn(store),
    getUserName: getUserName(store)
  }
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return {
      logout: () => {dispatch(Actions.userLogout())}
  }
}

const connectHeaderBar = connect(mapStoreToProps, mapDispatchToProps);

function HeaderBar(props: ConnectedProps<typeof connectHeaderBar>) {
  const classes = useStyles();
  const history = useHistory();

  const [cartAnchor, setCartAnchor] = useState<null | HTMLElement>(null);
  const [usercardAnchor, setUsercardAnchor] = useState<null | HTMLElement>(null);
    
  const handleCartMenu = (event: React.MouseEvent<HTMLElement>) => {setCartAnchor(event.currentTarget);};
  const handleCartClose = () => {setCartAnchor(null);};
  const handleUsercardMenu = (event: React.MouseEvent<HTMLElement>) => {setUsercardAnchor(event.currentTarget);};
  const handleUsercardClose = () => {setUsercardAnchor(null);};

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title} onClick={() => history.push('/')}>
            WClection
          </Typography>
          <IconButton color="inherit" onClick={handleCartMenu} style={{fontSize: "120%"}}>
            <Badge badgeContent={props.cartSize} color="secondary" style={{marginRight: 25}}>
                <ShoppingCart />
            </Badge>
          </IconButton>
          <Menu
            anchorEl={cartAnchor}
            keepMounted
            open={Boolean(cartAnchor)}
            getContentAnchorEl={null}
            anchorOrigin={{vertical: "bottom", horizontal: "center"}}
            transformOrigin={{vertical: "top", horizontal: "center"}}
            onClose={handleCartClose}>
              <div> {/* This div serves as Menu popover anchor. The anchor cannot be a connected component such as CartMenuItem due to ref forwarding issues. Read more : https://stackoverflow.com/questions/56307332/how-to-use-custom-functional-components-within-material-ui-menu */}
                {props.cartSize === 0 ? 
                  <MenuItem><i>Votre panier est vide</i></MenuItem> : 
                  <div>
                    {props.cartItems.map(productId => <CartMenuItem productId={productId} quantity={props.cart[productId]} key={productId} />)}
                    <MenuItem>Total: {props.cartValue.toLocaleString("fr")}€ <Button variant="contained" color="primary" style={{marginLeft: 10}} onClick={() => history.push('/checkout')}>Acheter Maintenant</Button></MenuItem>
                  </div>}
              </div>
          </Menu>
          {/* The following Fragment represents the user card. It CANNOT be separated into an individual component due to Menu Popover limitations. */}
         <Fragment>
            {!props.isUserLoggedIn && <Fragment><LoginButton /><SignupButton /></Fragment>}
            {props.isUserLoggedIn && <IconButton color="inherit" onClick={handleUsercardMenu} style={{fontSize: "120%"}}>
                 <AccountCircle style={{marginRight: 10}} /> {props.getUserName}
            </IconButton>}
            {/* The menu popover needs to be mounted at the very first render, otherwise it will popup anywhere at first mount, hence the weird conditional logic here*/}
            <Menu
                anchorEl={usercardAnchor}
                keepMounted
                open={Boolean(usercardAnchor)}
                getContentAnchorEl={null}
                anchorOrigin={{vertical: "bottom", horizontal: "center"}}
                transformOrigin={{vertical: "top", horizontal: "center"}}
                onClose={handleUsercardClose}>
                {props.isUserLoggedIn && <MenuItem onClick={() => {handleUsercardClose(); props.logout();}}><PowerSettingsNew style={{marginRight: 10}} /> Déconnexion</MenuItem>}
            </Menu>
        </Fragment>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default connectHeaderBar(HeaderBar);