import './ProductCompare.css'

const CompareItem = () => {
    return (
        <>platzhalter</>
    );
};

const buildCompareList = (products, properties) => {
    const propertiesWrapper = {};
    const productsWrapper = {};
    properties.filter(property => (property.visible && property.selected)).forEach(property => {
        propertiesWrapper[property.id] = {
            id: property.id,
            weight: property.weight,
            name: property.name
        }
    });
    products.filter(product => product.selected).forEach(product => {
        const props = {};
        product.properties.forEach(property => {
            props[property.id] = property.value;
        });
        productsWrapper[product.id] = {
            id: product.id,
            name: product.name,
            props: props,
            sum: 0
        };
    });
    Object.values(propertiesWrapper).forEach(property => {
        let allValues = Object.values(productsWrapper).map(product => {
            let value = product.props[property.id];
            return value ? value : 0;
        });
        allValues = [...new Set(allValues)];
        allValues.sort();
        Object.values(productsWrapper).forEach(product => {
            let value = product.props[property.id];
            let fullfillmentLevel = allValues.indexOf(value);
            if(!fullfillmentLevel) {
                fullfillmentLevel = 1;
            } else {
                fullfillmentLevel++;
            }
            // TODO: hier kann ich den properties eines Produktes noch CSS-Klassen auf Basis ihrer Position in der Wertung geben :)
            //       alternativ könnte ich auch die erste grün und die letzte rot machen
            let calculatedValue = (fullfillmentLevel * property.weight);
            productsWrapper[product.id].sum += calculatedValue;
        });
    });
    const resultList = [];
    Object.values(productsWrapper).forEach(product => resultList.push(product));
    resultList.sort((a, b) => b.sum - a.sum);
    return resultList;
}

const ProductCompare = ({ products, properties }) => {
    const compareList = buildCompareList(products, properties);
    return (
        <div className='product-compare'>
        {
            compareList.map(product => {
                return (
                    <div>
                        <span>{ product.name }</span> ⇒ <span>{ product.sum }</span>
                    </div>
                );
            })
        }
        </div>
    );
};

export default ProductCompare;
