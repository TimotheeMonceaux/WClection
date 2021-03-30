import { Fragment, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { GridList, GridListTile, Typography } from "@material-ui/core";
import { Skeleton } from '@material-ui/lab';

import { AppStore, AppDispatch } from '../../redux/action-types';
import { areCollectionsLoaded } from '../../redux/selectors';
import Actions from '../../redux/actions';
import Collection from './Collection';

const collectionSkeleton = <GridList cols={3}>
        <GridListTile key="Subheader" cols={3} style={{ height: 'auto', marginTop: 25, marginBottom: 10 }}>
            <Typography variant="h3"><Skeleton /></Typography>
        </GridListTile>
        <GridListTile><Skeleton variant="rect" height={450} /></GridListTile>
        <GridListTile><Skeleton variant="rect" height={450} /></GridListTile>
        <GridListTile><Skeleton variant="rect" height={450} /></GridListTile>
    </GridList>;

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

    if (!props.areCollectionsLoaded) return collectionSkeleton;

    return <Fragment>
        {props.collections.map((c, i) => <Collection key={i} name={c.name} productIds={c.products}/>)}
    </Fragment>
}

export default connectCollections(Collections);