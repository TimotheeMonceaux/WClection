import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { makeStyles } from '@material-ui/core/styles';

import LoginForm from "./LoginForm";


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

export default function LoginPage() {
    const history = useHistory();
    const classes = useStyles();

    return <Container className={classes.root} fixed>
        <Paper square className={classes.paper}>
            <Tabs
                value={0}
                indicatorColor="primary"
                textColor="primary">
                <Tab label="Connexion" />
                <Tab label="Inscription" onClick={() => history.push("/signup")}/>
                <Tab label="Mot de Passe oublié" onClick={() => history.push("/forgotPassword")}/>
            </Tabs>
            <LoginForm />
        </Paper>
    </Container>;
}