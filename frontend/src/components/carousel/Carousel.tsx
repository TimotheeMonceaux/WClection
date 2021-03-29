import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import styled from 'styled-components';

import { AppStore, AppDispatch } from '../../redux/action-types';
import { areCarouselSlidesLoaded } from '../../redux/selectors';
import Actions from '../../redux/actions';

const SPaper = styled(Paper)`
    padding-left: 100px;
    min-height: 33vh;
    color: white;
`;

function Item(props: {name: string, description: string, picture: string}) {
    return <SPaper square style={{backgroundImage: `url(${props.picture})`}}>
        <h2>{props.name}</h2>
        <p>{props.description}</p>

        <Button className="CheckButton" style={{color: "white"}}>
            Check it out!
        </Button>
    </SPaper>;
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

    if (!props.areCarouselSlidesLoaded) return <Skeleton variant="rect" height="33vh" />;;
    
    return <Carousel navButtonsAlwaysVisible animation="slide">
        {props.carouselSlides.map((item, i)  => <Item key={i} name={item.name} description={item.description} picture={item.image} />)}
    </Carousel>;
}

export default connectAppCarousel(AppCarousel);