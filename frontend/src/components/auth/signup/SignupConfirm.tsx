import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Home from '@material-ui/icons/Home';

import { AppStore, AppDispatch } from '../../../redux/action-types';
import Actions from '../../../redux/actions';

const urlParams = new URLSearchParams(window.location.search);

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 100
    }
}));

function mapStoreToProps(store: AppStore) {
    return {
        confirmEmailStatus: store.confirmEmailStatus,
        authErrorMsg: store.authErrorMsg
    }
}

function mapDispatchToProps(dispatch: AppDispatch) {
    return {
        confirmEmail: (email: string, key: string) => {dispatch(Actions.confirmEmail(email, key))},
        removeAuthErrorMsg: () => {dispatch(Actions.removeAuthErrorMsg)}
    }
}

const connectSignupConfirm = connect(mapStoreToProps, mapDispatchToProps);

function SignupConfirm(props: ConnectedProps<typeof connectSignupConfirm>) {
    const confirmEmail = props.confirmEmail;
    useEffect(() => {confirmEmail(urlParams.get('email') ?? '', urlParams.get('key') ?? '')}, [confirmEmail])
    const classes = useStyles();
    const history = useHistory();

    return <Container fixed className={classes.root}>
        {props.confirmEmailStatus === null && <Skeleton variant="rect" height="50vh" />}
        {props.confirmEmailStatus === false && <h1>Le lien est erronné ou expiré. Veuillez réessayer.{props.authErrorMsg}</h1>}
        {props.confirmEmailStatus === true && <h1>Votre compte est désormais confirmé</h1>}
        <Grid container alignContent="center">
            <Button onClick={() => {props.removeAuthErrorMsg(); history.push('/')}} color="primary" variant="contained"><Home /> Retour à l'accueil</Button>
        </Grid>
    </Container>;
}

export default connectSignupConfirm(SignupConfirm);