import Panel from './Panel'

import './PropertySelect.css'

const Property = ({ property, toggle, changeWeight }) => {
    const handleChange = (event) => {
        changeWeight(property, event.target.value)
        event.preventDefault();
    }
    return (
        <div className='property-wrapper'>
            <div className={`selectable-property ${property.selected ? ' property-selected' : ''}`} onClick={toggle}>
                { property.name } ({ property.unit })
            </div>
            <div className='property-weight'>
                <input type='number' min='1' max='10'  value={property.weight} onChange={handleChange} />
            </div>
        </div>
    );
};

const PropertySelect = ({ properties, toggle, changeWeight }) => {
    return (
        <Panel header='Eigenschaften auswählen'>
            <div className='header-wrapper'>
                <h4 className='selectable-property-header'>Eigenschaft</h4>
                <h4 className='property-weight-header'>Gewichtung</h4>
            </div>
            {
                properties.filter(property => property.visible).map(property => <Property property={property} toggle={() => toggle(property)} changeWeight={changeWeight} />)
            }
        </Panel>
    );
};

export default PropertySelect;
