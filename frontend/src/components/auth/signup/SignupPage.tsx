import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { makeStyles } from '@material-ui/core/styles';

import SignupForm from "./SignupForm";


const useStyles = makeStyles(() => ({
    root: {
      flexGrow: 1,
      marginTop: 200,
    },
    paper: {
      padding: 25
    }
  }));

export default function SignupPage() {
    const history = useHistory();
    const classes = useStyles();

    return <Container className={classes.root} fixed>
        <Paper square className={classes.paper}>
            <Tabs
                value={1}
                indicatorColor="primary"
                textColor="primary">
                <Tab label="Connexion" onClick={() => history.push("/login")} />
                <Tab label="Inscription" />
            </Tabs>
            <SignupForm />
        </Paper>
    </Container>;
}