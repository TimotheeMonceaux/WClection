import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

export default function LoginButton() {
    const history = useHistory();
    return <Button color="inherit" onClick={() => history.push("/login")}>Connexion</Button>;
}