import Panel from './Panel.js'
import SelectItem from './SelectItem'

import './PropertySelect.css'

const PropertyOld = ({ property, toggle, changeWeight }) => {
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

const PropertyWeight = ({ property, handleChange }) => {
    return (
        <div className='property-weight'>
            <input type='number' min='1' max='10'  value={property.weight} onChange={handleChange} />
        </div>
    );
};

const PropertyName = ({ property }) => {
    return (
        <>{ property.name } ({ property.unit })</>
    );
};

const Property = ({ property, toggle, changeWeight }) => {
    const handleChange = (event) => {
        changeWeight(property, event.target.value)
        event.preventDefault();
    }
    return (
        <div className='property-wrapper'>
        <SelectItem selected={property.selected} onClick={toggle} style={{ flexGrow: '100' }}>
            <PropertyName property={property} />
        </SelectItem>
        <PropertyWeight property={property} handleChange={handleChange} />
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
