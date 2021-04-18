import { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Redirect } from 'react-router';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';

import Actions from '../../../redux/actions';
import { AppDispatch, AppStore } from '../../../redux/action-types';
import { isUserLoggedIn } from '../../../redux/selectors';

const urlParams = new URLSearchParams(window.location.search);

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
        isUserLoggedIn: isUserLoggedIn(store)
    }
}

function mapDispatchToProps(dispatch: AppDispatch) {
    return {
        resetPassword: (email: string, password: string, key: string) => {dispatch(Actions.resetPassword(email, password, key))},
        removeAuthErrorMsg: () => {dispatch(Actions.removeAuthErrorMsg())}
    }
}

const connectResetPasswordForm = connect(mapStoreToProps, mapDispatchToProps);

function ResetPasswordForm(props: ConnectedProps<typeof connectResetPasswordForm>) {
    const email = urlParams.get('email') ?? '';
    const key = urlParams.get('key') ?? '';
    const classes = useStyles();
    const [passwordValue, setPasswordValue] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [repeatPasswordValue, setRepeatPasswordValue] = useState("");
    const [repeatPasswordError, setRepeatPasswordError] = useState(false);

    if (props.isUserLoggedIn) return <Redirect to="/resetPasswordSuccess" />;

    function isFormComplete(): boolean {
        return passwordValue !== "" && repeatPasswordValue !== ""  && !passwordError && !repeatPasswordError;
    }

    function handlePasswordChange(s: string): void {
        setPasswordValue(s);
        setPasswordError(s.length < 8);
    }

    function handleRepeatPasswordChange(s: string, passwordValue: string): void {
        setRepeatPasswordValue(s);
        setRepeatPasswordError(s !== passwordValue);
    }

    return <form>
    <TextField 
        label="Email" 
        variant="outlined" 
        className={`form-input ${classes.textField}`}
        disabled
        margin="normal"
        value={email} />
    <br />
    <TextField 
        label="Mot de passe"
        variant="outlined"
        className={`form-input ${classes.textField}`}
        autoFocus
        margin="normal"
        type="password"
        error={passwordError}
        onChange={(e) => handlePasswordChange(e.target.value)} />
    {passwordError && <Typography variant="body1" style={{color: "red"}}>Votre mot de passe doit faire au moins 8 caractères</Typography>}
    <br />
    <TextField 
        label="Confirmer le mot de passe"
        variant="outlined"
        className={`form-input ${classes.textField}`} 
        margin="normal"
        type="password"
        error={repeatPasswordError}
        onChange={(e) => handleRepeatPasswordChange(e.target.value, passwordValue)} 
        onKeyDown={(e) => {if (e.key === "Enter" && isFormComplete()) props.resetPassword(email, passwordValue, key)}}/>
    {repeatPasswordError && <Typography variant="body1" style={{color: "red"}}>Les mots de passe ne correspondent pas</Typography>}
    <br />
    <Button 
        variant="contained" 
        color="primary" 
        className="form-input"
        style={{marginTop: 25}}
        disabled={!isFormComplete()}
        onClick={() => props.resetPassword(email, passwordValue, key)}>Réinitialiser le mot de passe</Button>

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

export default connectResetPasswordForm(ResetPasswordForm);