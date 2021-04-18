import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Home from '@material-ui/icons/Home';
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';

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

export default function ResetPasswordSuccess() {
    const classes = useStyles();
    const history = useHistory();

    return <Container fixed className={classes.root}>
        <Paper square className={classes.paper}>
            <Grid container className={classes.body}>
                <Grid className={`${classes.center} ${classes.primary} ${classes.line}`}>
                    <Typography variant="h4">
                        <CheckCircleOutline fontSize="inherit" style={{position: 'relative', top: '5px'}} className={classes.icon} />
                            Votre mot de passe a bien été modifié !
                    </Typography>
                </Grid>
                <Typography variant="body1" className={classes.line}>Votre demande de changement de mot de passe a bien été prise en compte. Vous pouvez désormais fermer cet onglet ou revenir à l'accueil.</Typography>
            </Grid>
            <Grid container className={classes.center}>
                <Button onClick={() => {history.push('/')}} color="primary" variant="contained">
                    <Home className={classes.icon}/> Retour à l'accueil
                </Button>
            </Grid>
        </Paper>
    </Container>;
}