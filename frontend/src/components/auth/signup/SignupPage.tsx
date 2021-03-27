import { useHistory } from 'react-router-dom';
import { Container, Paper, Tab, Tabs } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import SignupForm from "./SignupForm";


const useStyles = makeStyles(() => ({
    root: {
      flexGrow: 1,
      marginTop: 50,
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