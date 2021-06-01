import { useState } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { loadStripe } from '@stripe/stripe-js';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { connect, ConnectedProps } from 'react-redux';

import { AppStore } from '../../redux/action-types';
import CartItemDetails from './CartItemDetails';
import { getCartItems } from '../../redux/selectors';

const stripePublicApiKey = 'pk_test_51IegbjCuVUuZJYMXgGcsrUPKAkavaQ5eav7Ru2MoFoPa3CmTpxM7PISC8UbgTuNEhObZzG5aC8nwLX8Dp4Me9LhQ00jOq6go6v';
const stripePromise = loadStripe(stripePublicApiKey);

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
    }
  }));

async function handleClick() {
    const stripe = await stripePromise;
    const response = await fetch((window.location.hostname === "localhost" ? "http://localhost:8000" : "https://wclection.com") + "/api/checkout/", {method: 'POST'});
    const session = await response.json();
    const result = await stripe!.redirectToCheckout({
        sessionId: session.sessionId,
      });
      if (result.error) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
        console.log(result.error.message);
      }
}

function mapStoreToProps(store: AppStore) {
  return {
    cart: store.cart,
    cartItems: getCartItems(store)
  }
}

const connectCheckout = connect(mapStoreToProps);

function Checkout(props: ConnectedProps<typeof connectCheckout>) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState('reviewOrder');

    const handleChange = (panel: string) => (_: React.ChangeEvent<{}>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : '');
    };

    return <Container className={classes.root} fixed>
      <Accordion expanded={expanded === 'reviewOrder'} onChange={handleChange('reviewOrder')}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h3">Mon Panier</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.vlayout}>
          <Typography variant="body1">Voici le contenu de mon panier, que je peux revoir ici.</Typography>
          {props.cartItems.map(productId => <CartItemDetails productId={productId} quantity={props.cart[productId]} />)}
          <Button onClick={() => setExpanded('address')} variant="contained" color="primary">Valider le panier</Button>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'address'} onChange={handleChange('address')}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h3">Livraison</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Button onClick={handleClick} variant="contained" color="primary">Confirmer et Payer</Button>
        </AccordionDetails>
      </Accordion>
    </Container>;
}

export default connectCheckout(Checkout);