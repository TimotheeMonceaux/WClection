import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

export default function SignupButton() {
    const history = useHistory();
    return <Button color="inherit" onClick={() => history.push("/signup")}>Inscription</Button>;
}