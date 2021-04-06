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
        login: (email: string, password: string) => {dispatch(Actions.userLogin(email, password))},
        removeAuthErrorMsg: () => {dispatch(Actions.removeAuthErrorMsg())}
    }
}

const connectLoginForm = connect(mapStoreToProps, mapDispatchToProps);

function LoginForm(props: ConnectedProps<typeof connectLoginForm>) {
    const [emailValue, setEmailValue] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordValue, setPasswordValue] = useState("");
    const [passwordError, setPasswordError] = useState(false);

    if (props.isUserLoggedIn) {
        const sp = new URLSearchParams(window.location.search);
        if (sp.has('callback')) return <Redirect to={sp.get('callback') ?? '/'} />
        return <Redirect to="/" />
    }


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

    return <form>
    <STextField 
        label="Email" 
        variant="outlined" 
        className="form-input" 
        error={emailError}
        margin="normal"
        onChange={(e) => handleEmailChange(e.target.value)}
        />
    {emailError && <Typography variant="body1" style={{color: "red"}}>Veuillez saisir une adresse email valide</Typography>}
    <br />
    <STextField 
        label="Mot de passe"
        variant="outlined"
        className="form-input"
        type="password"
        error={passwordError}
        margin="normal"
        onChange={(e) => handlePasswordChange(e.target.value)} />
    {passwordError && <Typography variant="body1" style={{color: "red"}}>Votre mot de passe doit faire au moins 8 caractères</Typography>}
    <br />
    <Button 
        variant="contained" 
        color="primary" 
        className="form-input"
        style={{marginTop: 25}}
        disabled={emailValue + passwordValue === "" || emailError || passwordError}
        onClick={() => props.login(emailValue, passwordValue)}>Connexion</Button>

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

export default connectLoginForm(LoginForm);