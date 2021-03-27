import { useHistory } from 'react-router-dom';
import { Container, Paper, Tab, Tabs } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import LoginForm from "./LoginForm";


const useStyles = makeStyles(() => ({
    root: {
      flexGrow: 1,
      marginTop: 50,
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
            </Tabs>
            <LoginForm />
        </Paper>
    </Container>;
}