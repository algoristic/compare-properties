import './PropertySelect.css'

const Property = ({ property, toggle }) => {
    return (
        <div className={`selectable-property ${property.selected ? ' property-selected' : ''}`} onClick={toggle}>{ property.name } ({ property.unit })</div>
    );
};

const PropertySelect = ({ properties, toggle }) => {
    return (
        <div className='property-select'>
            <div className='property-select-header'>
                <h1>Select Properties</h1>
            </div>
        {
            properties.filter(property => property.visible).map(property => <Property property={property} toggle={() => toggle(property)} />)
        }
        </div>
    );
};

export default PropertySelect;
