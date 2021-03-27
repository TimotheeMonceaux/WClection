import { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Redirect } from 'react-router';
import { Container, TextField, Typography, Button } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

import Actions from '../../redux/actions';
import { AppDispatch, AppStore } from '../../redux/action-types';
import { isUserLoggedIn } from '../../redux/selectors';

function mapStoreToProps(store: AppStore) {
    return {
        authErrorMsg: store.authErrorMsg,
        isUserLoggedIn: isUserLoggedIn(store)
    }
}

function mapDispatchToProps(dispatch: AppDispatch) {
    return {
        signup: (email: string, password: string) => {dispatch(Actions.userSignup(email, password))},
        removeAuthErrorMsg: () => {dispatch(Actions.removeAuthErrorMsg())}
    }
}

const connectSignupForm = connect(mapStoreToProps, mapDispatchToProps);

function SignupForm(props: ConnectedProps<typeof connectSignupForm>) {
    const [emailValue, setEmailValue] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordValue, setPasswordValue] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [repeatPasswordValue, setRepeatPasswordValue] = useState("");
    const [repeatPasswordError, setRepeatPasswordError] = useState(false);

    if (props.isUserLoggedIn) return <Redirect to="/" />


    function isEmail(s:string): boolean {
        const s2 = s.split("@")[1];
        return s2 !== undefined && s2.indexOf(".") > 0;
    }

    function handleEmailChange(s: string): void {
        setEmailValue(s);
        setEmailError(!isEmail(s));
    }

    function handlePasswordChange(s: string): void {
        setPasswordValue(s);
        setPasswordError(s.length < 8);
    }

    function handleRepeatPasswordChange(s: string, passwordValue: string): void {
        setRepeatPasswordValue(s);
        setRepeatPasswordError(s !== passwordValue);
    }

    return <Container><form>
    <Typography variant="h5" style={{ marginBottom: 8 }}>
      Signup
    </Typography>
    <TextField 
        label="Email" 
        variant="outlined"
        className="form-input" 
        error={emailError}
        onChange={(e) => handleEmailChange(e.target.value)}
        />
    {emailError && <Typography variant="body1" style={{color: "red"}}>Veuillez saisir une adresse email valide</Typography>}
    <br />
    <TextField 
        label="Mot de passe"
        variant="outlined"
        className="form-input"
        type="password"
        error={passwordError}
        onChange={(e) => handlePasswordChange(e.target.value)} />
    {passwordError && <Typography variant="body1" style={{color: "red"}}>Votre mot de passe doit faire au moins 8 caractères</Typography>}
    <br />
    <TextField 
        label="Confirmer le mot de passe"
        variant="outlined"
        className="form-input"
        type="password"
        error={repeatPasswordError}
        onChange={(e) => handleRepeatPasswordChange(e.target.value, passwordValue)} />
    {repeatPasswordError && <Typography variant="body1" style={{color: "red"}}>Les mots de passe ne correspondent pas</Typography>}
    <br />
    <Button 
        variant="contained" 
        color="primary" 
        className="form-input"
        disabled={emailValue === "" || passwordValue === ""|| repeatPasswordValue === "" || emailError || passwordError || repeatPasswordError}
        onClick={() => props.signup(emailValue, passwordValue)}>Signup</Button>

    {props.authErrorMsg && 
        <MuiAlert 
            elevation={6} 
            variant="filled" 
            severity="error"
            onClick={() => props.removeAuthErrorMsg()}
            >{props.authErrorMsg}</MuiAlert>}
  </form></Container>;
}

export default connectSignupForm(SignupForm);