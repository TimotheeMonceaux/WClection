import { connect, ConnectedProps } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { AppStore, AppDispatch } from '../../redux/action-types';
import { getProduct } from '../../redux/selectors';
import Actions from '../../redux/actions';

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  },
});

function mapStoreToProps(store: AppStore) {
  return {
    getProduct: (key: number) => getProduct(store)(key)
  }
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return {
      addToCart: (productId: number) => {dispatch(Actions.addToCart(productId, 1))}
  }
}

const connectProduct = connect(mapStoreToProps, mapDispatchToProps);

function Product(props: ConnectedProps<typeof connectProduct> & {productId: number}) {
  const classes = useStyles();
  const product = props.getProduct(props.productId);

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={product.name}
          height="300"
          image={product.image}
          title={product.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {product.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {product.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={() => props.addToCart(props.productId)}>
          Ajouter au panier
        </Button>
        <Button size="small" color="primary">
          Détails
        </Button>
      </CardActions>
    </Card>
  );
}

export default connectProduct(Product);