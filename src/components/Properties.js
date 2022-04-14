import Property from './Property'

import './Properties.css'

const ListProperty = ({ property }) => {
    return (
        <li className='list-property'>
            <Property.Name property={property} />: <Property.Value property={property} />
        </li>
    );
};

const List = ({ properties }) => {
    return (
        <ul className='properties-list'>
        {
            properties.map(property => <ListProperty property={property} />)
        }
        </ul>
    );
};

const Properties = {
    List: List
};

export default Properties;
