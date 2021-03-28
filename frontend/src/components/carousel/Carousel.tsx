import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@material-ui/core';
import styled from 'styled-components';

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

export default function AppCarousel() {
    const items = [
        {
            name: "Item 1",
            description: "C'est le premier item",
            picture: "https://tra.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fbin.2F2020.2F06.2F17.2F1347bf37-771b-4dc1-bb04-121e9cd6a3bb.2Ejpeg/1200x630/quality/80/la-chasse-deau-des-toilettes-pourrait-creer-un-vortex-de-particules-de-coronavirus-en-suspension-dans-lair.jpg"
        },
        {
            name: "Item 2",
            description: "C'est le second item",
            picture: "https://www.deco.fr/sites/default/files/styles/article_970x500/public/migration-images/1194356.jpg"
        },
        {
            name: "Item 3",
            description: "C'est le troisième item",
            picture: "https://www.espace-aubade.fr/uploads/rubrique/885x550/rubrique-125.jpg"
        }
    ]; 

    return <Carousel navButtonsAlwaysVisible animation="slide">
        {items.map((item, i)  => <Item key={i} name={item.name} description={item.description} picture={item.picture} />)}
    </Carousel>;
}