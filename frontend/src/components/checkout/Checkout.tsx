import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { loadStripe } from '@stripe/stripe-js';

const stripePublicApiKey = 'pk_test_51IegbjCuVUuZJYMXgGcsrUPKAkavaQ5eav7Ru2MoFoPa3CmTpxM7PISC8UbgTuNEhObZzG5aC8nwLX8Dp4Me9LhQ00jOq6go6v';
const stripePromise = loadStripe(stripePublicApiKey);

const useStyles = makeStyles(() => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      justifyContent: 'center'
    },
    paper: {
      padding: 25
    }
  }));

async function handleClick() {
    const stripe = await stripePromise;
    const response = await fetch((window.location.hostname === "localhost" ? "http://localhost:8000" : "http://wclection.com") + "/api/checkout/", {method: 'POST'});
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

export default function Checkout() {
    const classes = useStyles();

    return <Container className={classes.root} fixed>
        <Paper square className={classes.paper}>
            <h1>Hello, World!</h1>
            <button onClick={handleClick}>Checkout</button>
        </Paper>
    </Container>;
}