import './Panel.css'

const Panel = ({ header, children }) => {
    return (
        <div className='panel'>
            <div className='panel-header'>
                <h1>{ header }</h1>
            </div>
            <div className='panel-body'>
                { children }
            </div>
        </div>
    );
}

export default Panel;
