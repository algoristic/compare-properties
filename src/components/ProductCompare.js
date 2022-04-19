import './ProductCompare.css'

const buildCompareList = (products, properties) => {
    const propertiesWrapper = {};
    const productsWrapper = {};
    properties.filter(property => (property.visible && property.selected)).forEach(property => {
        propertiesWrapper[property.id] = {
            id: property.id,
            weight: property.weight,
            name: property.name,
            unit: property.unit
        }
    });
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
    Object.values(propertiesWrapper).forEach(property => {
        let allValues = Object.values(productsWrapper).map(product => {
            let productProperty = product.props[property.id];
            return productProperty ? productProperty.value : 0;
        });
        allValues = [...new Set(allValues)];
        allValues.sort();
        Object.values(productsWrapper).forEach(product => {
            const productProperty = product.props[property.id];
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
            let contextualClass = 'property';
            if(isMin) {
                contextualClass += ' property-is-min';
            }
            if(isMax) {
                contextualClass += ' property-is-max';
            }
            productsWrapper[product.id].props[property.id] = {
                value: value,
                name: property.name,
                unit: property.unit,
                contextualClass: contextualClass
            };
        });
    });
    const resultList = [];
    Object.values(productsWrapper).forEach(product => resultList.push(product));
    resultList.sort((a, b) => b.sum - a.sum);
    return resultList;
};

const Property = ({ value }) => {
    return (
        <li className={value.contextualClass}>
            <span>{ value.name }</span>: <span>{ value.value }</span>
            <span>{ value.unit }</span>
        </li>
    );
};

const Properties = ({ list }) => {
    return (
        <ul>
            { Object.values(list).filter(property => property.name).map(property => <Property value={property} />) }
        </ul>
    );
};

const ProductName = ({ product }) => {
    return (
        <h4>{ product.name }</h4>
    );
};

const Product = ({ value }) => {
    return (
        <div style={{
            display: 'flex'
        }}>
            <ProductName product={value} />
            <Properties list={value.props} />
        </div>
    );
};

const ProductCompare = ({ products, properties }) => {
    const compareList = buildCompareList(products, properties);
    return (
        <div className='product-compare'>
        {
            compareList.map(product => {
                return (
                    <div>
                        <Product value={product} />
                    </div>
                );
            })
        }
        </div>
    );
};

export default ProductCompare;
