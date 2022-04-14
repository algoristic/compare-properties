import { Component } from 'react'
import ProductSelect from './ProductSelect'
import ProductCompare from './ProductCompare'
import PropertySelect from './PropertySelect'

import allProducts from '../assets/products.json'
import allProperties from '../assets/property.config.json'

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: allProducts.products.map(product => {
                product.selected = false;
                return product;
            }),
            properties: Object.keys(allProperties.properties).map(id => {
                const property = allProperties.properties[id];
                property.id = id;
                property.visible = false;
                property.selected = true;
                return property;
            })
        };
        this.toggleProduct = this.toggleProduct.bind(this);
        this.toggleProperty = this.toggleProperty.bind(this);
        this.toggleAllProducts = this.toggleAllProducts.bind(this);
        this.updateProperties = this.updateProperties.bind(this);
        this.changePropertyWeight = this.changePropertyWeight.bind(this);
    }

    toggleProduct(toggledProduct) {
        let { products } = this.state;
        products = products.map(product => {
            if(product.id === toggledProduct.id) {
                product.selected = (!product.selected);
            }
            return product;
        });
        this.setState({
            products: products,
            properties: this.updateProperties(products)
        });
    }

    toggleAllProducts(state) {
        let { products } = this.state;
        products = products.map(product => {
            product.selected = state;
            return product;
        });
        this.setState({
            products: products,
            properties: this.updateProperties(products)
        });
    }

    toggleProperty(toggledProperty) {
        let { properties } = this.state;
        properties = properties.map(property => {
            if(property.id === toggledProperty.id) {
                property.selected = (!property.selected);
            }
            return property;
        });
        this.setState({ properties: properties });
    }

    changePropertyWeight(toggledProperty, value) {
        let { properties } = this.state;
        properties = properties.map(property => {
            if(property.id === toggledProperty.id) {
                property.weight = value;
            }
            return property;
        });
        this.setState({ properties: properties });
    }

    updateProperties(products) {
        const { properties } = this.state;
        const collection = [];

        products.filter(product => product.selected).forEach(product => {
            product.properties.forEach(property => {
                if(!collection.includes(property.id)) {
                    collection.push(property.id);
                }
            });
        });

        for(let i = 0; i < properties.length; i++) {
            const state = collection.includes(properties[i].id);
            properties[i].visible = state;
        }

        return properties;
    }

    render() {
        const { products, properties } = this.state;
        return (
            <div className="app">
                <div className='select-comparables'>
                    <ProductSelect products={products} toggle={this.toggleProduct} toggleAll={this.toggleAllProducts} />
                    <PropertySelect properties={properties} toggle={this.toggleProperty} changeWeight={this.changePropertyWeight} />
                </div>
                <div className='divider' onClick={() => window.scrollTo(0, document.body.scrollHeight)}>⇓</div>
                <ProductCompare products={products} properties={properties} />
            </div>
        );
    }
}

export default App;
