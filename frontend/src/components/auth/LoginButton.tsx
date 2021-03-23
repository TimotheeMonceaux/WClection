import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default function LoginButton() {
    return <Link to="/login"><Button variant="contained" color="primary">Login</Button></Link>;
}