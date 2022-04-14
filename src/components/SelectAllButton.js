import { Component } from 'react'

import './SelectAllButton.css'

class SelectAllButton extends Component {
    constructor(props) {
        super(props);
        this.state = { toggleAll: true };
        this.toggleAll = this.toggleAll.bind(this);
    }

    toggleAll() {
        const state = this.state.toggleAll;
        this.setState({
            toggleAll: (!state)
        });
        this.props.toggle(state);
    }

    render() {
        const { toggleAll } = this.state;
        return (
            <button className='button-select-all' onClick={this.toggleAll}>
            { toggleAll ? '✓ Alle auswählen' : ' ✗ Alle abwählen' }
            </button>
        );
    }
}

export default SelectAllButton;
