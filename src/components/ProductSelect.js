import Panel from './Panel.js'
import SelectItem from './SelectItem'
import SelectAllProductsButton from './SelectAllProductsButton'

import all from '../assets/property.config.json';

import './ProductSelect.css'

const ProductImage = ({ product }) => {
    return (
        <div className='product-image'>
            <img src={`https://via.placeholder.com/100x100?text=${product.name}`} />
        </div>
    );
};

const ProductName = ({ product }) => {
    return (
        <h3 className='product-name'>{ product.name }</h3>
    );
};

const PropertyName = ({ property }) => {
    return all.properties[property.id].name;
};

const PropertyValue = ({ property }) => {
    return property.value + all.properties[property.id].unit;
};

const Property = ({ value }) => {
    return (
        <li className='list-property'>
            <PropertyName property={value} />: <PropertyValue property={value} />
        </li>
    );
};

const Properties = ({ list }) => {
    return (
        <ul className='properties-list'>
        {
            list.map(property => <Property value={property} />)
        }
        </ul>
    );
};

const Product = ({ product, onSelect }) => {
    return (
        <SelectItem selected={product.selected} onClick={() => onSelect(product)}>
            <ProductImage product={product} />
            <ProductName product={product} />
            <Properties list={product.properties} />
        </SelectItem>
    );
};

const Products = ({ list, toggle }) => {
    return (
        <div className='select-list'>
            { list.map(product => <Product key={product.id} product={product} onSelect={toggle} />) }
        </div>
    );
};

const ProductSelect = ({ products, toggle, toggleAll }) => {
    return (
        <Panel header='Produkte auswählen'>
            <Products list={products} toggle={toggle} />
            <div className='select-control'>
                <SelectAllProductsButton toggle={toggleAll} />
            </div>
        </Panel>
    );
};

export default ProductSelect;
