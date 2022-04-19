import './SelectItem.css'

const SelectItem = ({ selected, onClick, children }) => {
    return (
        <div className={`select-item ${selected ? 'selected' : ''}`} onClick={onClick}>
            { children }
        </div>
    );
};

export default SelectItem;
