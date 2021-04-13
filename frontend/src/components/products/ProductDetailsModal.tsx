import { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'; 
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';

import { AppStore, AppDispatch } from '../../redux/action-types';
import Actions from '../../redux/actions';
import { getProduct } from '../../redux/selectors';
import { Product } from '../../redux/store-types';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '90vw',
        maxHeight: '80vh',
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
      priceTagContainer: {
        textAlign: 'right',
        color: theme.palette.common.white,
        backgroundColor: theme.palette.primary.main,
        padding: theme.spacing(2),
        flexDirection: 'row-reverse'
      },
      oldPriceTag: {
        textDecoration: 'line-through',
        marginTop: 10,
        marginRight: 10
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
    const product = props.getProduct(props.productId);
    const [quantity, setQuantity] = useState(1);
    const [imageIndex, setImageIndex] = useState(0);
    const [offsetIndex, setOffsetIndex] = useState(0);
    const classes = useStyles();
    const history = useHistory();
    const maxIndex = product.images.length + 2;

    function indexToImage(p: Product, i: number): string {
        if (i === 1) return p.secondaryImage;
        if (i >= 2 && i <= maxIndex) return p.images[i-2];
        return p.mainImage;
    }

    return <Grid container spacing={3} className={classes.paper}>
        <Grid item xs={3}>
            <CardMedia
                component="img"
                alt={product.name}
                height="400"
                image={indexToImage(product, imageIndex)}
                title={product.name} />
            <Grid container spacing={2} className={classes.imageSelector} justify="center">
                <Grid item xs={2}><IconButton disabled={offsetIndex <= 0} onClick={() => setOffsetIndex(offsetIndex - 1)} color="primary"><ArrowBackIos /></IconButton></Grid>
                <Grid container item xs={8} spacing={2}>
                    <Grid item xs={4}>
                        <CardActionArea onClick={() => setImageIndex(offsetIndex)}>
                            <CardMedia
                                component="img"
                                alt={product.name}
                                height="50"
                                image={indexToImage(product, offsetIndex)}
                                title={product.name} />
                        </CardActionArea>
                    </Grid>
                    <Grid item xs={4}>
                        <CardActionArea onClick={() => setImageIndex(offsetIndex + 1)}>
                            <CardMedia
                                component="img"
                                alt={product.name}
                                height="50"
                                image={indexToImage(product, offsetIndex + 1)}
                                title={product.name} />
                        </CardActionArea>
                    </Grid>
                    <Grid item xs={4}>
                        <CardActionArea onClick={() => setImageIndex(offsetIndex + 2)}>
                            <CardMedia
                                component="img"
                                alt={product.name}
                                height="50"
                                image={indexToImage(product, offsetIndex + 2)}
                                title={product.name} />
                        </CardActionArea>
                    </Grid>
                </Grid>
                <Grid item xs={2}><IconButton disabled={offsetIndex >= maxIndex - 3} onClick={() => setOffsetIndex(offsetIndex + 1)} color="primary"><ArrowForwardIos /></IconButton></Grid>
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
            <Grid container className={classes.priceTagContainer}>
                <Typography variant="h3">{product.price}€</Typography>
                {(product.basePrice > product.price) && <Typography variant="h4" className={classes.oldPriceTag}>{product.basePrice}€</Typography>}
            </Grid>
            <Typography variant="body1" className={classes.priceShippingFees}>Frais de port offerts dès le premier article</Typography>
            <Grid container className={classes.quantity} spacing={3}>
                <Grid item xs={6}><Typography variant="body1" className={classes.quantity}>Quantité :</Typography></Grid>
                <Grid item xs={6} style={{paddingTop: 25}}><TextField type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))}/></Grid>
            </Grid>
            <Button size="small" color="primary" variant="contained" onClick={() => {props.addToCart(props.productId, quantity); history.push('/checkout')}}>
                Acheter Maintenant
            </Button>
            <Button size="small" color="primary" onClick={() => props.addToCart(props.productId, quantity)}>
                Ajouter au panier
            </Button>
        </Grid>
    </Grid>;
}

export default connectProductDetailsModal(ProductDetailsModal);