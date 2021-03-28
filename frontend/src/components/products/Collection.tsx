import { GridList, GridListTile, Typography } from "@material-ui/core";

import Product from './Product';


export default function Collection() {
    const products = [
        {
            name: "Toilettes 1",
            description: "Des toilettes de base",
            image: "https://i-mcr.unimedias.fr/sites/art-de-vivre/files/styles/large/public/mcr_journee-toilettes-laufen-rimless.jpg"
        },
        {
            name: "Toilettes 2",
            description: "Des toilettes un peu plus stylées",
            image: "https://www.lesvertsmoutons.com/wp-content/uploads/2019/06/iStock-1201645150-scaled-e1602687058851.jpg"
        },
        {
            name: "Toilettes 3",
            description: "Des toilettes avec un mec tout fier",
            image: "http://s1.lprs1.fr/images/2020/08/19/8370099_d18763c8-e1e8-11ea-beee-36bd04f4283c-1.jpg"
        },
        {
            name: "Toilettes 4",
            description: "Des toilettes en noir et blanc",
            image: "https://www.mesdepanneurs.fr/sites/mesdepanneurs.fr/files/field/image/11Fotolia_72270088_Subscription_Monthly_M.jpg"
        },
        {
            name: "Toilettes 5",
            description: "Des toilettes pour vieux",
            image: "https://www.careserve.fr/product-images/extralarge/cadre-de-toilettes-securise-1.jpg"
        },
        {
            name: "Toilettes 6",
            description: "Des toilettes de punk",
            image: "https://img.lemde.fr/2015/11/16/0/0/3500/2334/664/0/75/0/bf1793c_PXP33_HEALTH-TOILETS-WIDERIMAGE_1116_11.JPG"
        },
        {
            name: "Toilettes 7",
            description: "Des toilettes sponsorisées par La Poste",
            image: "https://www.artmajeur.com/medias/standard/h/e/henri-bergot/artwork/11462630_40940622-494225611051236-1298575828572962816-n.jpg"
        },
        {
            name: "Toilettes 8",
            description: "Des toilettes vivantes",
            image: "https://cdn.manomano.com/images/images_products/4743687/P/11693266_2.jpg"
        },
        {
            name: "Toilettes 9",
            description: "Des toilettes pour le Roi Eenok",
            image: "https://cdn-europe1.lanmedia.fr/var/europe1/storage/images/europe1/faits-divers/insolite-des-toilettes-en-or-massif-volees-dans-un-palais-anglais-3919919/53500081-1-fre-FR/Insolite-des-toilettes-en-or-massif-volees-dans-un-palais-anglais.jpg"
        },
        {
            name: "Toilettes 10",
            description: "Des toilettes pour Léo",
            image: "https://www.monamenagementjardin.fr/media/catalog/product/cache/1/image/1024x705/fa35923701cd72405544b9eb3bd386d2/t/o/toilettes-seches-ecologiques-abri-jardin-bois-1.jpg"
        },
        {
            name: "Toilettes 11",
            description: "Des toilettes pour exhibitionniste",
            image: "https://www.francetvinfo.fr/pictures/H6xOulXU4NB40m9haJOANjnZfXU/1200x675/2020/08/21/eltVideoWs-448673-5f3fd4cc46f39.jpg"
        },
        {
            name: "Toilettes 12",
            description: "Des toilettes rigolotes",
            image: "https://i1.wp.com/creapills.com/wp-content/uploads/2020/03/whitney-jakub-papier-toilette-personnages-8.jpg?fit=819%2C1024&ssl=1"
        }
    ];

    return <GridList cellHeight={450} cols={3} style={{paddingLeft: "2vw"}}>
        <GridListTile key="Subheader" cols={3} style={{ height: 'auto', marginTop: 25, marginBottom: 25 }}>
          <Typography variant="h4">Collection de toilettes 2021</Typography>
        </GridListTile>
        {products.map((p, i) => <GridListTile key={i}><Product name={p.name} description={p.description} image={p.image} /></GridListTile>)}
    </GridList>;
}