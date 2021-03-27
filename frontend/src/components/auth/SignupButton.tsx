import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default function SignupButton() {
    return <Link to="/signup"><Button variant="contained" color="primary">Signup</Button></Link>;
}