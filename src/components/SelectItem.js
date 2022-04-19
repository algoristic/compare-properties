import './SelectItem.css'

const SelectItem = ({ selected, onClick, style, children }) => {
    return (
        <div style={style} className={`select-item ${selected ? 'selected' : ''}`} onClick={onClick}>
            { children }
        </div>
    );
};

export default SelectItem;
