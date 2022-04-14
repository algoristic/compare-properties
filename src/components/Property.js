import all from '../assets/property.config.json';

const { properties } = all;

const Name = ({ property }) => {
    return properties[property.id].name;
};
const Value = ({ property }) => {
    return property.value + properties[property.id].unit;
}

const Property = {
    Name: Name,
    Value: Value
};

export default Property;
