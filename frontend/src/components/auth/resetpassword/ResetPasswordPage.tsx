import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { makeStyles } from '@material-ui/core/styles';

import ResetPasswordForm from "./ResetPasswordForm";


const useStyles = makeStyles(() => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      justifyContent: 'center'
    },
    paper: {
      padding: 25
    }
  }));

export default function ResetPasswordPage() {
    const classes = useStyles();

    return <Container className={classes.root} fixed>
        <Paper square className={classes.paper}>
            <Tabs
                value={0}
                indicatorColor="primary"
                textColor="primary">
                <Tab label="Réinitialiser votre Mot de Passe" />
            </Tabs>
            <ResetPasswordForm />
        </Paper>
    </Container>;
}