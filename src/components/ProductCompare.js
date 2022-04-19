import './ProductCompare.css'

// FIXME: Dieser Block müsste eigentlich im Sinne von Clean Code refactored werden...
// (1) Merke: Kommentare ersetzen keinen guten Code
// (2) Keine kontextuelle Trennung von Anwendungs- und Oberflächenlogik vorhanden :(
const buildCompareList = (products, properties) => {
    const productsWrapper = {};
    // bringe Produkte Form eines assioziativen Arrays, damit sowohl Produkt als auch Eigenschaft einfach über eine ID angesprochen werden können
    // (anstatt mehrfach über eine Liste iterieren zu müssen)
    products.filter(product => product.selected).forEach(product => {
        const props = {};
        product.properties.forEach(property => {
            props[property.id] = {
                value: property.value
            };
        });
        productsWrapper[product.id] = {
            id: product.id,
            name: product.name,
            props: props,
            sum: 0
        };
    });
    Object.values(properties).forEach(property => {
        const { id } = property;
        if(property.visible && property.selected) {
            let allValues = Object.values(productsWrapper).map(product => {
                // wenn das Produkt die aktuelle Property nicht hat, rechne mit Nutzwert 0
                let productProperty = product.props[id];
                return productProperty ? productProperty.value : 0;
            });
            // eliminiere doppelte Werte
            allValues = [...new Set(allValues)];
            // korrekte numerische Sortierung (nicht nach String-Länge)
            allValues.sort((a, b) => a - b);
            Object.values(productsWrapper).forEach(product => {
                const productProperty = product.props[id];
                let value = productProperty ? productProperty.value : 0;
                // Position im sortierten Arrays aller Vergleichswerte = Basis-Nutzwert
                let fullfillmentLevel = allValues.indexOf(value);
                // vergebe kontextuelle CSS-Klassen je Eigenschaft
                // (am besten oder am schlechtesten?)
                const isMin = (fullfillmentLevel === 0);
                const isMax = (fullfillmentLevel === (allValues.length - 1));
                let contextualClass = undefined;
                if(isMin) {
                    contextualClass = 'property-is-min';
                }
                if(isMax) {
                    contextualClass = 'property-is-max';
                }
                // Nutzwertanalyse ist nicht 0-basiert
                // => geringster Erüllungsgrad = 1, etc.
                if(!fullfillmentLevel) {
                    fullfillmentLevel = 1;
                } else {
                    fullfillmentLevel++;
                }
                // Ermittelter Nutzwert wird auf Basis der Nutzerauswahl gewichtet
                let calculatedValue = (fullfillmentLevel * property.weight);
                // Summe des Produktes ergibt sich aus der Summe aller Nutzwerte
                productsWrapper[product.id].sum += calculatedValue;
                // versehe die Produkt-Properties mit allen kontextuellen Informationen
                productsWrapper[product.id].props[id] = {
                    value: value,
                    fullfillment: calculatedValue,
                    visible: true,
                    name: property.name,
                    unit: property.unit,
                    contextualClass: contextualClass
                };
            });
        }
    });
    const resultList = [];
    // Bringe die Produkte wieder in Listenform, damit einfach iteriert werden kann
    Object.values(productsWrapper).forEach(product => resultList.push(product));
    // Sortiere nach Summe (absteigend)
    resultList.sort((a, b) => b.sum - a.sum);
    return resultList;
};

const Property = ({ value }) => {
    return (
        <tr className={`property ${value.contextualClass ? value.contextualClass : ''}`}>
            <td>{ value.name }</td>
            <td>{ value.value }{ value.unit }</td>
            <td className='t-align-right'>{ value.fullfillment }</td>
        </tr>
    );
};

const Benefit = ({ product }) => {
    return (
        <tfoot>
            <tr>
                <td colspan='2'></td>
                <th className='t-align-right'>{ product.sum }</th>
            </tr>
        </tfoot>
    );
};

const Properties = ({ list }) => {
    return (
        <tbody>
            { Object.values(list).filter(property => property.visible).map(property => <Property value={property} />) }
        </tbody>
    );
};

const ProductName = ({ product }) => {
    return (
        <thead>
            <tr>
                <th colspan='2' className='product-name'>{ product.name }</th>
                <th>Nutzwert</th>
            </tr>
        </thead>
    );
};

const Product = ({ value }) => {
    return (
        <table className='product'>
            <ProductName product={value} />
            <Properties list={value.props} />
            <Benefit product={value} />
        </table>
    );
};

// TODO: entferne NICHT zu vergleichende properties aus Übersicht
const ProductCompare = ({ products, properties }) => {
    const compareList = buildCompareList(products, properties);
    return (
        <div className='product-compare'>
        {
            compareList.map(product => {
                return (
                    <Product value={product} />
                );
            })
        }
        </div>
    );
};

export default ProductCompare;
