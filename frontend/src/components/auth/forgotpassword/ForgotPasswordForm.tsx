import { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Redirect } from 'react-router';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Mail from '@material-ui/icons/Mail';
import MuiAlert from '@material-ui/lab/Alert';

import Actions from '../../../redux/actions';
import { AppDispatch, AppStore } from '../../../redux/action-types';
import { isUserLoggedIn } from '../../../redux/selectors';

const useStyles = makeStyles(() => ({
    textField: {
        '@media (orientation: landscape)': {
            minWidth: '30vw'
        },
        '@media (orientation: portrait)': {
            minWidth: '60vw'
        }
    }
  }));

function mapStoreToProps(store: AppStore) {
    return {
        authErrorMsg: store.authErrorMsg,
        isUserLoggedIn: isUserLoggedIn(store),
        forgotPasswordEmail: store.forgotPasswordEmail
    }
}

function mapDispatchToProps(dispatch: AppDispatch) {
    return {
        forgotPassword: (email: string) => {dispatch(Actions.forgotPassword(email))},
        removeAuthErrorMsg: () => {dispatch(Actions.removeAuthErrorMsg())}
    }
}

const connectForgotPasswordForm = connect(mapStoreToProps, mapDispatchToProps);

function ForgotPasswordForm(props: ConnectedProps<typeof connectForgotPasswordForm>) {
    const [emailValue, setEmailValue] = useState("");
    const [emailError, setEmailError] = useState(false);
    const classes = useStyles();
    
    if (props.isUserLoggedIn) return <Redirect to="/" />;
    if (props.forgotPasswordEmail !== '') return <Redirect to="/forgotPasswordSuccess" />;

    function isEmail(s:string): boolean {
        const s2 = s.split("@")[1];
        return s2 !== undefined && s2.indexOf(".") > 0;
    }

    function isFormComplete(): boolean {
        return emailValue !== "" && !emailError;
    }

    function handleEmailChange(s: string): void {
        setEmailValue(s);
        setEmailError(!isEmail(s));
    }

    return <form>
    <br />
    <Typography variant="body1">Saisissez l'adresse e-mail associée à votre compte et nous vous enverrons un lien pour réinitialiser votre mot de passe.</Typography>
    <TextField 
        label="Email" 
        variant="outlined" 
        className={`form-input ${classes.textField}`} 
        error={emailError}
        margin="normal"
        autoFocus={true}
        onChange={(e) => handleEmailChange(e.target.value)}
        onKeyDown={(e) => {if (e.key === "Enter" && isFormComplete()) props.forgotPassword(emailValue)}}
        />
    {emailError && <Typography variant="body1" style={{color: "red"}}>Veuillez saisir une adresse email valide</Typography>}
    <br />
    <Button 
        variant="contained" 
        color="primary" 
        className="form-input"
        style={{marginTop: 25}}
        disabled={!isFormComplete()}
        onClick={() => props.forgotPassword(emailValue)}><Mail style={{marginRight: '0.5rem'}} /> Continuer</Button>

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

export default connectForgotPasswordForm(ForgotPasswordForm);