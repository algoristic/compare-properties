import './ProductCompare.css'

const buildCompareList = (products, properties) => {
    const productsWrapper = {};
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
                let productProperty = product.props[id];
                return productProperty ? productProperty.value : 0;
            });
            allValues = [...new Set(allValues)];
            allValues.sort();
            Object.values(productsWrapper).forEach(product => {
                const productProperty = product.props[id];
                let value = productProperty ? productProperty.value : 0;
                let fullfillmentLevel = allValues.indexOf(value);
                const isMin = (fullfillmentLevel === 0);
                const isMax = (fullfillmentLevel === (allValues.length - 1));
                if(!fullfillmentLevel) {
                    fullfillmentLevel = 1;
                } else {
                    fullfillmentLevel++;
                }
                let calculatedValue = (fullfillmentLevel * property.weight);
                productsWrapper[product.id].sum += calculatedValue;
                let contextualClass = undefined;
                if(isMin) {
                    contextualClass = 'property-is-min';
                }
                if(isMax) {
                    contextualClass = ' property-is-max';
                }
                productsWrapper[product.id].props[id] = {
                    value: value,
                    fullfillment: fullfillmentLevel,
                    visible: true,
                    name: property.name,
                    unit: property.unit,
                    contextualClass: contextualClass
                };
            });
        }
    });
    const resultList = [];
    Object.values(productsWrapper).forEach(product => resultList.push(product));
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
