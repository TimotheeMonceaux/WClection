import { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'; 
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import { AppStore, AppDispatch } from '../../redux/action-types';
import Actions from '../../redux/actions';
import { getProduct } from '../../redux/selectors';
import { Product } from '../../redux/store-types';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        top: '20vh',
        left: '10vw',
        width: '80vw',
        maxHeight: '60vh',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
      },
      imageSelector: {
        marginTop: theme.spacing(3)
      },
      productDescription: {
        fontStyle: 'italic',
        marginBottom: theme.spacing(1)
      },
      stockOk: {
          color: theme.palette.success.main,
          fontWeight: 'bold',
          paddingLeft: theme.spacing(1),
          paddingRight: theme.spacing(1),
          marginRight: theme.spacing(1)
      },
      stockOkIcon: {
          position: 'relative',
          top: 5
      },
      priceColumn: {
          border: 'solid 1px',
          borderColor: theme.palette.primary.main,
          height: 'fit-content'
      },
      priceTag: {
        textAlign: 'right',
        color: theme.palette.common.white,
        backgroundColor: theme.palette.primary.main,
        padding: theme.spacing(2)
      },
      priceShippingFees: {
        fontStyle: 'italic',
        textAlign: 'right',
        marginBottom: theme.spacing(1)
      },
      quantity: {
          marginTop: theme.spacing(3),
          marginBottom: theme.spacing(3)
      }
}));

function mapStoreToProps(store: AppStore) {
    return {
        getProduct: (key: number) => getProduct(store)(key)
    }
}

function mapDispatchToProps(dispatch: AppDispatch) {
    return {
        addToCart: (productId: number, quantity: number) => {dispatch(Actions.addToCart(productId, quantity))}
    }
}

const connectProductDetailsModal = connect(mapStoreToProps, mapDispatchToProps);

function ProductDetailsModal(props: ConnectedProps<typeof connectProductDetailsModal> & {productId: number}) {
    const [quantity, setQuantity] = useState(1);
    const [imageIndex, setImageIndex] = useState(1);
    const classes = useStyles();
    const product = props.getProduct(props.productId);

    function indexToImage(p: Product, i: number): string {
        if (i === 2) return p.image2;
        if (i === 3) return p.image3;
        return p.image1;
    }

    return <Grid container spacing={3} className={classes.paper}>
        <Grid item xs={3}>
            <CardMedia
                component="img"
                alt={product.name}
                height="400"
                image={indexToImage(product, imageIndex)}
                title={product.name} />
            <Grid container spacing={3} className={classes.imageSelector} justify="center">
                <Grid item xs={3}>
                    <CardActionArea onClick={() => setImageIndex(1)}>
                        <CardMedia
                            component="img"
                            alt={product.name}
                            height="50"
                            image={product.image1}
                            title={product.name} />
                    </CardActionArea>
                </Grid>
                <Grid item xs={3}>
                    <CardActionArea onClick={() => setImageIndex(2)}>
                        <CardMedia
                            component="img"
                            alt={product.name}
                            height="50"
                            image={product.image2}
                            title={product.name} />
                    </CardActionArea>
                </Grid>
                <Grid item xs={3}>
                    <CardActionArea onClick={() => setImageIndex(3)}>
                        <CardMedia
                            component="img"
                            alt={product.name}
                            height="50"
                            image={product.image3}
                            title={product.name} />
                    </CardActionArea>
                </Grid>
            </Grid>
        </Grid>
        <Grid item xs={5}>
            <Typography variant="h3">{product.name}</Typography>
            <Typography variant="body1" className={classes.productDescription}>"{product.description}"</Typography>
            <Typography variant="h6">Caractéristiques Techniques</Typography>
            <ul>
                <li><Typography variant="body1">Taille : 5 cm de large x 5 cm de haut</Typography></li>
                <li><Typography variant="body1">Autocollants en vinyle de haute qualité durable</Typography></li>
                <li><Typography variant="body1">Résistant à l’eau, aux rayures et aux produits ménagers</Typography></li>
                <li><Typography variant="body1">Quantité : 2 autocollants par lot</Typography></li>
            </ul>
            <Typography variant="body1"><span className={classes.stockOk}><CheckCircleIcon className={classes.stockOkIcon} /> En Stock :</span>Expédié demain &amp; Réception estimée 48/72H après expédition (hors dimanches et jours fériés)</Typography>
        </Grid>
        <Grid item xs={4} className={classes.priceColumn}>
            <Typography variant="h3" className={classes.priceTag}>19,99€</Typography>
            <Typography variant="body1" className={classes.priceShippingFees}>Frais de port offerts dès le premier article</Typography>
            <Grid container className={classes.quantity} spacing={3}>
                <Grid item xs={6}><Typography variant="body1" className={classes.quantity}>Quantité :</Typography></Grid>
                <Grid item xs={6} style={{paddingTop: 25}}><TextField type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))}/></Grid>
            </Grid>
            <Button size="small" color="primary" variant="contained">
                Acheter Maintenant
            </Button>
            <Button size="small" color="primary" onClick={() => props.addToCart(props.productId, quantity)}>
                Ajouter au panier
            </Button>
        </Grid>
    </Grid>;
}

export default connectProductDetailsModal(ProductDetailsModal);