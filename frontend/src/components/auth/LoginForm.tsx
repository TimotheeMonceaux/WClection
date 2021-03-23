import { TextField, Typography, Button } from '@material-ui/core';
import { useState } from 'react';

export default function LoginForm() {
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    function isEmail(s:string): boolean {
        const s2 = s.split("@")[1]; console.log(s2 !== undefined && s2.indexOf(".") > 0);
        return s2 !== undefined && s2.indexOf(".") > 0;
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
        onChange={(e) => setEmailError(!isEmail(e.target.value))}
        />
    {emailError && <Typography variant="body1" style={{color: "red"}}>Veuillez saisir une adresse email valide</Typography>}
    <br />
    <TextField 
        label="Password"
        variant="outlined"
        className="form-input"
        type="password"
        error={passwordError}
        onChange={(e) => setPasswordError(e.target.value.length < 8)} />
    {passwordError && <Typography variant="body1" style={{color: "red"}}>Votre mot de passe doit faire au moins 8 caractères</Typography>}
    <br />
    <Button variant="contained" color="primary" className="form-input">Login</Button>
  </form>;
}