import Product from './Product'
import SelectAllButton from './SelectAllButton'

import './ProductSelect.css'

const ProductSelect = ({ products, toggle, toggleAll }) => {
    return (
        <div className='product-select'>
            <div className='product-select-header'>
                <h1>Select Products</h1>
            </div>
            <div className='select-list'>
            {
                products.map(product => <Product.Select key={product.id} product={product} onSelect={toggle} />)
            }
            </div>
            <div className='select-control'>
                <SelectAllButton toggle={toggleAll} />
            </div>
        </div>
    );
};

export default ProductSelect;
