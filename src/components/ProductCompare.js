import './ProductCompare.css'

const CompareItem = () => {
    return (
        <>platzhalter</>
    );
};

const buildCompareList = (products, properties) => {
    // hier das Vorgehen einer NWA nachbauen:
    // => (1) alle Produkte property für property durchgehen
    //    (2) den Erfüllungsgrad einer property je Produkt ermitteln
    //    (3) jedes Produkt mit einer Summe versehen und der Summe nach Ordnen
    //    (4) (optional) farbliche Marker für die properties einstellen, je nach Erfüllungsgrad
}

const ProductCompare = ({ products, properties }) => {
    const compareList = buildCompareList(products, properties);
    return (
        <div className='product-compare'>
        {
            products.filter(product => product.selected).map(product => <h3>{ product.name }</h3>)
        }
        {
            properties.filter(property => (property.visible && property.selected)).map(property => <h3>{ property.name }</h3>)
        }
        </div>
    );
};

export default ProductCompare;
