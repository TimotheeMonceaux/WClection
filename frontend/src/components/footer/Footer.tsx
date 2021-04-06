import { makeStyles, Container, Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    footer: {
        backgroundColor: theme.palette.primary.main, 
        color: theme.palette.common.white,
        height: 100,
        marginTop: theme.spacing(5),
        paddingBottom: theme.spacing(7.5),
        display: "flex",
        alignItems: "flex-end"
    },
    item: {
        display: "flex",
        justifyContent: "center",
        textAlign: "center"
    }
}));

export default function Footer() {
    const classes = useStyles();

    return <div className={classes.footer}>
        <Container fixed>
            <Grid container>
                <Grid item xs={4} className={classes.item}>Contactez-nous<br />Foire aux questions</Grid>
                <Grid item xs={4} className={classes.item}>Plan du site<br />Copyright © 2021 WClection</Grid>
                <Grid item xs={4} className={classes.item}>Mentions légales<br />CGV</Grid>
            </Grid>
        </Container>
    </div>;
}