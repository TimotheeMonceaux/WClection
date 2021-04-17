import { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Home from '@material-ui/icons/Home';
import Mail from '@material-ui/icons/Mail';
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';
import MuiAlert from '@material-ui/lab/Alert';

import { AppStore, AppDispatch } from '../../../redux/action-types';
import Actions from '../../../redux/actions';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'center'
    },
    paper: {
        padding: theme.spacing(5)
    },
    body: {
        flexDirection: 'column'
    },
    center: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    line: {
        marginBottom: theme.spacing(3)
    },
    primary: {
        color: theme.palette.primary.main
    },
    icon: {
        marginRight: theme.spacing(1)
    }
}));

function mapStoreToProps(store: AppStore) {
    return {
        email: store.userProfile.email,
        authErrorMsg: store.authErrorMsg
    }
}

function mapDispatchToProps(dispatch: AppDispatch) {
    return {
        resendSignupEmail : (email: string) => {dispatch(Actions.resendSignupEmail(email))},
        confirmEmail: (email: string, key: string) => {dispatch(Actions.confirmEmail(email, key))},
        removeAuthErrorMsg: () => {dispatch(Actions.removeAuthErrorMsg)}
    }
}

const connectSignupSuccess = connect(mapStoreToProps, mapDispatchToProps);

function SignupSuccess(props: ConnectedProps<typeof connectSignupSuccess>) {
    const classes = useStyles();
    const history = useHistory();
    const [resendButtonClicked, setResendButtonClicked] = useState(false);

    function handleResendButtonClicked() {
        setResendButtonClicked(true);
        setTimeout(() => setResendButtonClicked(false), 60000);
    }

    return <Container fixed className={classes.root}>
        <Paper square className={classes.paper}>
            <Grid container className={classes.body}>
                <Grid className={`${classes.center} ${classes.primary} ${classes.line}`}>
                    <Typography variant="h4">
                        <CheckCircleOutline fontSize="inherit" style={{position: 'relative', top: '5px'}} className={classes.icon} />
                            Votre inscription est confirmée !
                    </Typography>
                </Grid>
                <Typography variant="body1" className={classes.line}>Nous vous remercions de votre confiance. Avant de pouvoir continuer, nous vous remercions de bien vouloir confirmer votre compte en cliquant sur le lien qui vous a été envoyé par email. Attention, le lien n'est valable que 15 minutes.</Typography>
                <Typography variant="body2" className={classes.line}>Si vous n'avez pas reçu d'email de notre part d'ici 5 minutes, pensez à vérifier votre dossier de courrier indésirable ou de publicités.</Typography>
                {props.authErrorMsg && <MuiAlert elevation={6} 
                                         variant="filled" 
                                         severity="error"
                                         style={{paddingBottom: 7, paddingTop: 7}}
                                         className={classes.line}
                                         >{props.authErrorMsg}</MuiAlert>}
            </Grid>
            <Grid container className={classes.center}>
                 <Button color="primary" 
                         variant={(resendButtonClicked ? undefined : "contained")} 
                         disabled={resendButtonClicked} 
                         style={{marginRight: '2rem'}} 
                         onClick={() => {handleResendButtonClicked(); props.resendSignupEmail(props.email);}}>
                    <Mail className={classes.icon}/> Renvoyer un email
                </Button>
                <Button onClick={() => {props.removeAuthErrorMsg(); history.push('/')}} color="primary" variant="contained">
                    <Home className={classes.icon}/> Retour à l'accueil
                </Button>
            </Grid>
        </Paper>
    </Container>;
}

export default connectSignupSuccess(SignupSuccess);