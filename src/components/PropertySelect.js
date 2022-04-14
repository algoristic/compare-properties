import './PropertySelect.css'

const Property = ({ property, toggle }) => {
    return (
        <div className={`selectable-property ${property.selected ? ' property-selected' : ''}`} onClick={toggle}>{ property.name } ({ property.unit })</div>
    );
};

const PropertySelect = ({ properties, toggle }) => {
    return (
        <div className='property-select'>
        {
            properties.filter(property => property.visible).map(property => <Property property={property} toggle={() => toggle(property)} />)
        }
        </div>
    );
};

export default PropertySelect;
