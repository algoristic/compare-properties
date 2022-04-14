import { Component } from 'react'
import ProductSelect from './ProductSelect'
import ProductCompare from './ProductCompare'

import all from '../assets/products.json'

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: all.products.map(product => {
                product.selected = false;
                return product;
            }),
            compare: false
        };
        this.toggle = this.toggle.bind(this);
        this.toggleAll = this.toggleAll.bind(this);
    }

    toggle(toggledProduct) {
        let { products } = this.state;
        products = products.map(product => {
            if(product.id === toggledProduct.id) {
                product.selected = (!product.selected);
            }
            return product;
        });
        this.setState({ products: products });
    }

    toggleAll(state) {
        let { products } = this.state;
        products = products.map(product => {
            product.selected = state;
            return product;
        });
        this.setState({ products: products });
    }

    render() {
        const { products, compare } = this.state;
        return (
            <div className="app">
                <ProductSelect products={products} toggle={this.toggle} toggleAll={this.toggleAll} />
            </div>
        );
    }
}

export default App;
