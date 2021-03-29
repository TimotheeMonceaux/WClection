import { Fragment, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { AppStore, AppDispatch } from '../../redux/action-types';
import { areCollectionsLoaded } from '../../redux/selectors';
import Actions from '../../redux/actions';
import Collection from './Collection';

function mapStoreToProps(store: AppStore) {
    return {
        areCollectionsLoaded: areCollectionsLoaded(store),
        collections: store.collections
    }
}

function mapDispatchToProps(dispatch: AppDispatch) {
    return {
        loadCollections: () => {dispatch(Actions.loadCollections())},
    }
}

const connectCollections = connect(mapStoreToProps, mapDispatchToProps);

function Collections(props: ConnectedProps<typeof connectCollections>) {
    const load = props.loadCollections;
    useEffect(() => {load()}, [load]);

    if (!props.areCollectionsLoaded) return <h1>LOADING</h1>

    return <Fragment>
        {props.collections.map(c => <Collection name={c.name} products={c.products}/>)}
    </Fragment>
}

export default connectCollections(Collections);