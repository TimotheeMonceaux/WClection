import { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Redirect } from 'react-router';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MuiAlert from '@material-ui/lab/Alert';
import styled from 'styled-components';

import Actions from '../../../redux/actions';
import { AppDispatch, AppStore } from '../../../redux/action-types';
import { isUserLoggedIn } from '../../../redux/selectors';

const STextField = styled(TextField)`
    @media (orientation: landscape) {
        min-width: 30vw;
    }
    @media (orientation: portrait) {
        min-width: 60vw;
    }
`;

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

    if (props.isUserLoggedIn) return <Redirect to="/signupconfirm" />


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

    return <form>
    <STextField 
        label="Email" 
        variant="outlined"
        className="form-input"
        margin="normal"
        error={emailError}
        onChange={(e) => handleEmailChange(e.target.value)}
        />
    {emailError && <Typography variant="body1" style={{color: "red"}}>Veuillez saisir une adresse email valide</Typography>}
    <br />
    <STextField 
        label="Mot de passe"
        variant="outlined"
        className="form-input"
        margin="normal"
        type="password"
        error={passwordError}
        onChange={(e) => handlePasswordChange(e.target.value)} />
    {passwordError && <Typography variant="body1" style={{color: "red"}}>Votre mot de passe doit faire au moins 8 caractères</Typography>}
    <br />
    <STextField 
        label="Confirmer le mot de passe"
        variant="outlined"
        className="form-input"
        margin="normal"
        type="password"
        error={repeatPasswordError}
        onChange={(e) => handleRepeatPasswordChange(e.target.value, passwordValue)} />
    {repeatPasswordError && <Typography variant="body1" style={{color: "red"}}>Les mots de passe ne correspondent pas</Typography>}
    <br />
    <Button 
        variant="contained" 
        color="primary" 
        className="form-input"
        style={{marginTop: 25}}
        disabled={emailValue === "" || passwordValue === ""|| repeatPasswordValue === "" || emailError || passwordError || repeatPasswordError}
        onClick={() => props.signup(emailValue, passwordValue)}>S'Inscrire</Button>

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

export default connectSignupForm(SignupForm);