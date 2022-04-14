import Image from './Image'
import Name from './Name'
import Properties from './Properties'

import './Product.css'

const Select = ({ product, onSelect }) => {
    return (
        <div className={`selectable-product ${product.selected ? ' selected' : ''}`} onClick={() => onSelect(product)}>
            <Image product={product} />
            <Name product={product} />
            <Properties.List properties={product.properties} />
        </div>
    );
};

const Product = {
    Select: Select
};

export default Product;
