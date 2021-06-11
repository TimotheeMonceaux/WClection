import { useState } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { connect, ConnectedProps } from 'react-redux';
import { Redirect } from 'react-router';

import { AppStore } from '../../redux/action-types';
import CartItemDetails from './CartItemDetails';
import { isUserLoggedIn, getCartItems, getCartValue, getVoucherValue } from '../../redux/selectors';
import DeliveryForm from './DeliveryForm';

const useStyles = makeStyles(() => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      justifyContent: 'center'
    },
    vlayout: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start'
    },
    priceCountLine: {
      paddingLeft: '2.5em',
      paddingRight: '2.5em',
      marginBottom: 5
    }
  }));

function mapStoreToProps(store: AppStore) {
  return {
    isUserLoggedIn: isUserLoggedIn(store),
    cart: store.cart,
    cartItems: getCartItems(store),
    cartValue: getCartValue(store),
    voucherValue: getVoucherValue(store)
  }
}

const connectCheckout = connect(mapStoreToProps);

function Checkout(props: ConnectedProps<typeof connectCheckout>) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState('reviewOrder');

    if (!props.isUserLoggedIn) {
      const sp = new URLSearchParams(window.location.search);
      if (sp.has('callback')) return <Redirect to={sp.get('callback') ?? '/'} />
      return <Redirect to="/login" />
    }

    const handleChange = (panel: string) => (_: React.ChangeEvent<{}>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : '');
    };

    return <Container className={classes.root} fixed>
      <Accordion expanded={expanded === 'reviewOrder'} onChange={handleChange('reviewOrder')}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h4">Mon Panier</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.vlayout}>
          {props.cartItems.map(productId => <CartItemDetails key={productId} productId={productId} quantity={props.cart[productId]} />)}
          {props.voucherValue > 0 && <Grid container spacing={3} className={classes.priceCountLine}>
              <Grid item xs={7}><Typography variant="body1">Promotion: -50% à partir du deuxième article</Typography></Grid>
              <Grid item xs={5}><Typography variant="body1">-{props.voucherValue} €</Typography></Grid>
            </Grid>}
          <Grid container spacing={3} className={classes.priceCountLine}>
            <Grid item xs={7}><Typography variant="body1">Frais de port</Typography></Grid>
            <Grid item xs={5}><Typography variant="body1"><i>offerts</i></Typography></Grid>
          </Grid>
          <Grid container spacing={3} className={classes.priceCountLine}>
            <Grid item xs={7}><Typography variant="h6">Total (T.T.C.)</Typography></Grid>
            <Grid item xs={5}><Typography variant="h6">{props.cartValue} €</Typography></Grid>
          </Grid>
          <Button onClick={() => setExpanded('address')} variant="contained" color="primary">Valider mon panier</Button>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'address'} onChange={handleChange('address')}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h4">Livraison</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DeliveryForm />
        </AccordionDetails>
      </Accordion>
    </Container>;
}

export default connectCheckout(Checkout);