import { connect, ConnectedProps } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Clear from '@material-ui/icons/Clear';

import { AppStore, AppDispatch } from '../../redux/action-types';
import Actions from '../../redux/actions';
import { getProduct } from '../../redux/selectors';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: '2.5em',
        paddingRight: '2.5em',
        marginBottom: 5
    },
    item: {
        display: 'inline-flex',
        alignSelf: 'center',
        marginBottom: '0.5em'
    },
    vlayout: {
        display: 'inline-flex',
        flexDirection: 'column'
    },
    avatar: {
        marginRight: theme.spacing(2),
    },
    iconButton: {
        marginLeft: theme.spacing(1)
    }
  }));


function mapStoreToProps(store: AppStore) {
    return {
      getProduct: (key: number) => getProduct(store)(key)
    }
}
  
function mapDispatchToProps(dispatch: AppDispatch) {
    return {
        setToCart: (productId: number, quantity: number) => {dispatch(Actions.setToCart(productId, quantity))},
        removeFromCart: (productId: number) => {dispatch(Actions.removeFromCart(productId))}
    }
}
  
const connectCartItemDetails = connect(mapStoreToProps, mapDispatchToProps);

function CartItemDetails(props: ConnectedProps<typeof connectCartItemDetails> & {productId: number, quantity: number}) {
    const classes = useStyles();
    const product = props.getProduct(props.productId);

    return <Grid container spacing={3} className={classes.root}>
        <Grid item xs={1} className={classes.item}>
            <Avatar alt={product.name} src={product.mainImage} className={classes.avatar} />
        </Grid>
        <Grid item xs={4} className={`${classes.item} ${classes.vlayout}`}>
            <Typography variant="body1">{product.name}</Typography>
            <Typography variant="body2"><i>Lot de 2 stickers en vinyle</i></Typography>
        </Grid>
        <Grid item xs={2} className={classes.item}>
            <Typography variant="body1">Prix unitaire (T.T.C.)</Typography>
        </Grid>
        <Grid item xs={2} className={classes.item}>
            <Typography variant="body1">{product.price} €</Typography>
        </Grid>
        <Grid item xs={2} className={classes.item} container>
            <Grid item xs={6} className={classes.item}><Typography variant="body1">Quantité :</Typography></Grid>
            <Grid item xs={6} className={classes.item}><TextField type="number" value={props.quantity} onChange={(e) => props.setToCart(props.productId, parseInt(e.target.value))}/></Grid>
        </Grid>
        <Grid item xs={1} className={classes.item}>
            <IconButton onClick={() => props.removeFromCart(props.productId)} className={classes.iconButton}><Clear color="inherit" /></IconButton>
        </Grid>
    </Grid>;
}

export default connectCartItemDetails(CartItemDetails);