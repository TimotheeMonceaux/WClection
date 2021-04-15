import { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Redirect } from 'react-router';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckBox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles} from '@material-ui/core/styles';

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
        signup: (email: string, password: string, newsletter: boolean) => {dispatch(Actions.userSignup(email, password, newsletter))},
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
    const [cgvChecked, setCgvChecked] = useState(false);
    const [newsletterChecked, setNewsletterChecked] = useState(false);
    const classes = useStyles();

    if (props.isUserLoggedIn) return <Redirect to="/signupSuccess" />


    function isEmail(s:string): boolean {
        const s2 = s.split("@")[1];
        return s2 !== undefined && s2.indexOf(".") > 0;
    }

    function isFormComplete(omitCgv = false): boolean {
        return emailValue !== "" && passwordValue !== "" && repeatPasswordValue !== "" 
            && !emailError && !passwordError && !repeatPasswordError && (cgvChecked || omitCgv);
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
    <TextField 
        label="Email" 
        variant="outlined"
        className={`form-input ${classes.textField}`} 
        margin="normal"
        error={emailError}
        autoFocus={true}
        onBlur={(e) => handleEmailChange(e.target.value)}
        />
    {emailError && <Typography variant="body1" style={{color: "red"}}>Veuillez saisir une adresse email valide</Typography>}
    <br />
    <TextField 
        label="Mot de passe"
        variant="outlined"
        className={`form-input ${classes.textField}`} 
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
        onKeyDown={(e) => {if (e.key === "Enter" && isFormComplete()) props.signup(emailValue, passwordValue, newsletterChecked)}}/>
    {repeatPasswordError && <Typography variant="body1" style={{color: "red"}}>Les mots de passe ne correspondent pas</Typography>}
    <br />
    <FormControlLabel
        control={<CheckBox checked={cgvChecked} onChange={() => setCgvChecked(!cgvChecked)} name="cgv" color="primary"/>}
        label={<Typography variant="body1">J'accepte les termes et conditions ainsi que la politique de confidentialité.</Typography>}
        />
        {isFormComplete(true) && !cgvChecked && <FormHelperText error={true}>Il est nécessaire d'accepter les CGV pour continuer</FormHelperText>}
    <br />
    <FormControlLabel
        control={<CheckBox checked={newsletterChecked} onChange={() => setNewsletterChecked(!newsletterChecked)} name="newsletter" color="primary" />}
        label={<Typography variant="body1">S'inscrire à la newsletter.</Typography>}
        />
    <br />
    <Button 
        variant="contained" 
        color="primary" 
        className="form-input"
        style={{marginTop: 25}}
        disabled={!isFormComplete()}
        onClick={() => props.signup(emailValue, passwordValue, newsletterChecked)}>S'Inscrire</Button>

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