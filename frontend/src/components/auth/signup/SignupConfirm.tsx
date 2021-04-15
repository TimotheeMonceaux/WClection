import { useEffect } from 'react';
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
import CancelOutlined from '@material-ui/icons/CancelOutlined';
import Skeleton from '@material-ui/lab/Skeleton';
import MuiAlert from '@material-ui/lab/Alert';

import { AppStore, AppDispatch } from '../../../redux/action-types';
import Actions from '../../../redux/actions';

const urlParams = new URLSearchParams(window.location.search);

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 100,
        display: 'flex',
        flexDirection: 'column'
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

    const errorBody = <Grid container className={classes.body}>
        <Grid className={`${classes.center} ${classes.primary} ${classes.line}`}>
            <Typography variant="h4">
                <CancelOutlined fontSize="inherit" style={{position: 'relative', top: '5px'}} className={classes.icon} />
                Impossible de confirmer votre adresse email
            </Typography>
        </Grid>
        <Typography variant="body1" className={classes.line}>Nous sommes désolés, mais nous n'avons pas pu valider votre adresse email. Nous vous remercions de bien vouloir réessayer. Si le problème persiste, vous pouvez utiliser le formulaire de contact afin de nous remonter le problème.</Typography>
        {props.authErrorMsg && <MuiAlert elevation={6} 
                                         variant="filled" 
                                         severity="error"
                                         style={{paddingBottom: 7, paddingTop: 7}}
                                         className={classes.line}
                                         >{props.authErrorMsg}</MuiAlert>}
           
    </Grid>;
    const successBody = <Grid container className={classes.body}>
        <Grid className={`${classes.center} ${classes.primary} ${classes.line}`}>
            <Typography variant="h4">
                <CheckCircleOutline fontSize="inherit" style={{position: 'relative', top: '5px'}} className={classes.icon} />
                    Votre compte est désormais confirmé !
            </Typography>
        </Grid>
        <Typography variant="body1" className={classes.line}>Nous avons bien pu valider votre adresse email, merci de votre confiance. Vous pouvez désormais retourner à l'accueil ou fermer cet onglet.</Typography>
        
    </Grid>;

    return <Container fixed className={classes.root}>
        <Paper square className={classes.paper}>
            {props.confirmEmailStatus === null && <Skeleton variant="rect" height="50vh" />}
            {props.confirmEmailStatus === false && errorBody}
            {props.confirmEmailStatus === true && successBody}
            <Grid container className={classes.center}> 
                {props.confirmEmailStatus === false && <Button color="primary" variant="contained" style={{marginRight: '2rem'}}>
                    <Mail className={classes.icon}/> Renvoyer un email
                </Button>}
                <Button onClick={() => {props.removeAuthErrorMsg(); history.push('/')}} color="primary" variant="contained">
                    <Home className={classes.icon}/> Retour à l'accueil
                </Button>
            </Grid>
        </Paper>
    </Container>;
}

export default connectSignupConfirm(SignupConfirm);