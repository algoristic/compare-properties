const Image = ({ product }) => {
    return (
        <div className='product-image'>
            <img src={`https://via.placeholder.com/240x100?text=${product.name}`} />
        </div>
    );
};

export default Image;
