import { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import { loadStripe } from '@stripe/stripe-js';

import Actions from '../../redux/actions';
import { AppDispatch, AppStore } from '../../redux/action-types';

const useStyles = makeStyles(() => ({
    textField: {
        '@media (orientation: landscape)': {
            minWidth: '30vw'
        },
        '@media (orientation: portrait)': {
            minWidth: '60vw'
        }
    },
    lineItem: {
        paddingLeft: '2.5em',
        paddingRight: '2.5em',
    }
}));

const stripePublicApiKey = 'pk_test_51IegbjCuVUuZJYMXgGcsrUPKAkavaQ5eav7Ru2MoFoPa3CmTpxM7PISC8UbgTuNEhObZzG5aC8nwLX8Dp4Me9LhQ00jOq6go6v';
const stripePromise = loadStripe(stripePublicApiKey);

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
        authErrorMsg: store.authErrorMsg,
    }
}

function mapDispatchToProps(dispatch: AppDispatch) {
    return {
        login: (email: string, password: string) => {dispatch(Actions.userLogin(email, password))},
        removeAuthErrorMsg: () => {dispatch(Actions.removeAuthErrorMsg())}
    }
}

const connectDeliveryForm = connect(mapStoreToProps, mapDispatchToProps);

function DeliveryForm(props: ConnectedProps<typeof connectDeliveryForm>) {
    const classes = useStyles();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [dateOfBirthError, setDateOfBirthError] = useState(false);
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [address3, setAddress3] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [city, setCity] = useState("");

    function isFormComplete(): boolean {
        return firstName !== "" && lastName !== "" && dateOfBirth !== "" && address1 !== "" && zipCode !== "" && city !== "" && !dateOfBirthError;
    }

    return <form>
    <Grid container spacing={5} className={classes.lineItem}>
        <Grid item xs={6}>
            <TextField 
                label="Prénom" 
                variant="outlined" 
                className={`form-input ${classes.textField}`} 
                margin="normal"
                autoFocus={true}
                />
        </Grid>
        <Grid item xs={6}>
            <TextField 
                label="Nom de famille"
                variant="outlined"
                className={`form-input ${classes.textField}`} 
                type="password"
                margin="normal"
                />
        </Grid>
    </Grid>
    <br />
    <TextField 
        label="Date de Naissance"
        variant="outlined"
        className={`form-input ${classes.textField}`} 
        type="password"
        margin="normal"
        />
    {dateOfBirthError && <Typography variant="body1" style={{color: "red"}}>Veuillez renseigner une date valide</Typography>}
    <br />
    <TextField 
        label="Adresse 1"
        variant="outlined"
        className={`form-input ${classes.textField}`} 
        type="password"
        margin="normal"
        />
    <br />
    <TextField 
        label="Adresse 2"
        variant="outlined"
        className={`form-input ${classes.textField}`} 
        type="password"
        margin="normal"
        />
    <br />
    <TextField 
        label="Adresse 3"
        variant="outlined"
        className={`form-input ${classes.textField}`} 
        type="password"
        margin="normal"
        />
    <br />
    <TextField 
        label="Code Postal"
        variant="outlined"
        className={`form-input ${classes.textField}`} 
        type="password"
        margin="normal"
        />
    <br />
    <TextField 
        label="Ville"
        variant="outlined"
        className={`form-input ${classes.textField}`} 
        type="password"
        margin="normal"
        />
    <br />
    <Button 
        variant="contained" 
        color="primary" 
        className="form-input"
        style={{marginTop: 25}}
        disabled={!isFormComplete()}
        onClick={handleClick}>Confirmer et Payer</Button>

    {props.authErrorMsg && 
        <MuiAlert 
            elevation={6} 
            variant="filled" 
            severity="error"
            style={{marginTop: 25}}
            onClick={() => props.removeAuthErrorMsg()}
            >{props.authErrorMsg}</MuiAlert>}
  </form>;
}

export default connectDeliveryForm(DeliveryForm);