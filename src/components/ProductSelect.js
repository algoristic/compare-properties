import Product from './Product'
import SelectAllButton from './SelectAllButton'

const ProductSelect = ({ products, toggle, toggleAll }) => {
    return (
        <div className='product-select'>
            <div className='select-control'>
                <SelectAllButton toggle={toggleAll} />
            </div>
            <div className='select-list'>
            {
                products.map(product => <Product.Select key={product.id} product={product} onSelect={toggle} />)
            }
            </div>
        </div>
    );
};

export default ProductSelect;
