import { connect, ConnectedProps } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Clear from '@material-ui/icons/Clear';

import { AppStore, AppDispatch } from '../../redux/action-types';
import Actions from '../../redux/actions';
import { getProduct } from '../../redux/selectors';

const useStyles = makeStyles((theme) => ({
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
        removeFromCart: (productId: number) => {dispatch(Actions.removeFromCart(productId))}
    }
}
  
const connectCartMenuItem = connect(mapStoreToProps, mapDispatchToProps);

function CartMenuItem(props: ConnectedProps<typeof connectCartMenuItem> & {productId: number, quantity: number}) {
    const classes = useStyles();
    const product = props.getProduct(props.productId);

    return <MenuItem>
        <Avatar alt={product.name} src={product.mainImage} className={classes.avatar} /> 
        <Typography variant="subtitle1">{product.name} ({props.quantity})</Typography>
        <IconButton onClick={() => props.removeFromCart(props.productId)} className={classes.iconButton}><Clear color="inherit" /></IconButton>
    </MenuItem>;
}

export default connectCartMenuItem(CartMenuItem);