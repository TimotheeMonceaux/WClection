import { GridList, GridListTile, Typography } from "@material-ui/core";

import Product from './Product';
import type { Product as TProduct} from "../../redux/store-types";


export default function Collection(props: {name: string, products: Array<TProduct>}) {
    return <GridList cellHeight={450} cols={3} style={{paddingLeft: "2vw"}}>
        <GridListTile key="Subheader" cols={3} style={{ height: 'auto', marginTop: 25, marginBottom: 25 }}>
          <Typography variant="h4">{props.name}</Typography>
        </GridListTile>
        {props.products.map((p, i) => <GridListTile key={i}><Product name={p.name} description={p.description} image={p.image} /></GridListTile>)}
    </GridList>;
}