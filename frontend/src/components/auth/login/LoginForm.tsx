import { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Redirect, useHistory } from 'react-router';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
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
    const history = useHistory();
    const [emailValue, setEmailValue] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordValue, setPasswordValue] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const classes = useStyles();

    if (props.isUserLoggedIn) {
        const sp = new URLSearchParams(window.location.search);
        if (sp.has('callback')) return <Redirect to={sp.get('callback') ?? '/'} />
        return <Redirect to="/" />
    }


    function isEmail(s:string): boolean {
        const s2 = s.split("@")[1];
        return s2 !== undefined && s2.indexOf(".") > 0;
    }

    function isFormComplete(): boolean {
        return emailValue !== "" && passwordValue !== "" && !emailError && !passwordError;
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
    <TextField 
        label="Email" 
        variant="outlined" 
        className={`form-input ${classes.textField}`} 
        error={emailError}
        margin="normal"
        autoFocus={true}
        onBlur={(e) => handleEmailChange(e.target.value)}
        />
    {emailError && <Typography variant="body1" style={{color: "red"}}>Veuillez saisir une adresse email valide</Typography>}
    <br />
    <TextField 
        label="Mot de passe"
        variant="outlined"
        className={`form-input ${classes.textField}`} 
        type="password"
        error={passwordError}
        margin="normal"
        onChange={(e) => handlePasswordChange(e.target.value)} 
        onKeyDown={(e) => {if (e.key === "Enter" && isFormComplete()) props.login(emailValue, passwordValue)}}/>
    {passwordError && <Typography variant="body1" style={{color: "red"}}>Votre mot de passe doit faire au moins 8 caract??res</Typography>}
    <br />
    <Link href="/forgotPassword" variant="body1" color="primary" onMouseDown={() => history.push('/forgotPassword')}>Mot de Passe oubli?? ?</Link>
    <br />
    <Button 
        variant="contained" 
        color="primary" 
        className="form-input"
        style={{marginTop: 25}}
        disabled={!isFormComplete()}
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