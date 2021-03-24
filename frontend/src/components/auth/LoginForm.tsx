import { TextField, Typography, Button } from '@material-ui/core';
import { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import Actions from '../../redux/actions';
import { AppDispatch, AppStore } from '../../redux/action-types';
import { Redirect } from 'react-router';

function mapStoreToProps(store: AppStore) {
    return {
        userToken: store.userToken
    }
}

function mapDispatchToProps(dispatch: AppDispatch) {
    return {
        login: (email: string, password: string) => {dispatch(Actions.userLogin(email, password))}
    }
}

const connectLoginForm = connect(mapStoreToProps, mapDispatchToProps);

function LoginForm(props: ConnectedProps<typeof connectLoginForm>) {
    const [emailValue, setEmailValue] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordValue, setPasswordValue] = useState("");
    const [passwordError, setPasswordError] = useState(false);

    if (props.userToken !== "") return <Redirect to="/" />


    function isEmail(s:string): boolean {
        const s2 = s.split("@")[1]; console.log(s2 !== undefined && s2.indexOf(".") > 0);
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
    <Typography variant="h5" style={{ marginBottom: 8 }}>
      Login
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
        label="Password"
        variant="outlined"
        className="form-input"
        type="password"
        error={passwordError}
        onChange={(e) => handlePasswordChange(e.target.value)} />
    {passwordError && <Typography variant="body1" style={{color: "red"}}>Votre mot de passe doit faire au moins 8 caractères</Typography>}
    <br />
    <Button 
        variant="contained" 
        color="primary" 
        className="form-input"
        disabled={emailValue + passwordValue === "" || emailError || passwordError}
        onClick={() => props.login(emailValue, passwordValue)}>Login</Button>
  </form>;
}

export default connectLoginForm(LoginForm);