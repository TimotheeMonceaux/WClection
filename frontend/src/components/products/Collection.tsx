import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Typography from '@material-ui/core/Typography'; 

import Product from './Product';


export default function Collection(props: {name: string, productIds: Array<number>}) {
    return <GridList cellHeight={450} cols={3} style={{paddingLeft: "2vw"}}>
        <GridListTile key="Subheader" cols={3} style={{ height: 'auto', marginTop: 25, marginBottom: 25 }}>
          <Typography variant="h4">{props.name}</Typography>
        </GridListTile>
        {props.productIds.map(id => <GridListTile key={id}><Product productId={id} /></GridListTile>)}
    </GridList>;
}