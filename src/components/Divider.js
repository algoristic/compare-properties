import './Divider.css'

const Divider = ({ icon }) => {
    return (
        <div className='divider' onClick={() => window.scrollTo(0, document.body.scrollHeight)}>{ icon }</div>
    );
}

export default Divider;
