import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Carousel from 'react-material-ui-carousel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';

import { AppStore, AppDispatch } from '../../redux/action-types';
import { areCarouselSlidesLoaded } from '../../redux/selectors';
import Actions from '../../redux/actions';

const useStyles = makeStyles((theme) => ({
    paper: {
        paddingLeft: 100,
        paddingTop: 50,
        minHeight: '33vh',
        color: theme.palette.common.white
    }
}));

function Item(props: {name: string, description: string, picture: string}) {
    const classes = useStyles();

    return <Paper square className={classes.paper} style={{backgroundImage: `url(${props.picture})`}}>
        <Typography variant="h4">{props.name}</Typography>
        <Typography variant="body1">{props.description}</Typography>
    </Paper>;
}

function mapStoreToProps(store: AppStore) {
    return {
        areCarouselSlidesLoaded: areCarouselSlidesLoaded(store),
        carouselSlides: store.carouselSlides
    }
}

function mapDispatchToProps(dispatch: AppDispatch) {
    return {
        loadCarouselSlides: () => {dispatch(Actions.loadCarouselSlides())},
    }
}

const connectAppCarousel = connect(mapStoreToProps, mapDispatchToProps);

function AppCarousel(props: ConnectedProps<typeof connectAppCarousel>) {
    const load = props.loadCarouselSlides;
    useEffect(() => {load()}, [load]);

    if (!props.areCarouselSlidesLoaded) return <Skeleton variant="rect" height="33vh" />;
    
    return <Carousel navButtonsAlwaysVisible animation="slide">
        {props.carouselSlides.map((item, i)  => <Item key={i} name={item.name} description={item.description} picture={item.image} />)}
    </Carousel>;
}

export default connectAppCarousel(AppCarousel);