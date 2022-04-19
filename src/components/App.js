import { Component } from 'react'

import Divider from './Divider'
import ProductSelect from './ProductSelect'
import ProductCompare from './ProductCompare'
import PropertySelect from './PropertySelect'

import allProducts from '../assets/products.json'
import allProperties from '../assets/property.config.json'

import './App.css';

// main app logic
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: allProducts.products.map(product => {
                product.selected = false;
                product.matches = (_product) => product.id === _product.id;
                return product;
            }),
            properties: Object.keys(allProperties.properties).map(id => {
                const property = allProperties.properties[id];
                property.id = id;
                property.visible = false;
                property.selected = true;
                property.matches = (_property) => property.id === _property.id;
                return property;
            })
        };
        this.changeProductValue = this.changeProductValue.bind(this);
        this.changePropertyValue = this.changePropertyValue.bind(this);
        this.toggleProduct = this.toggleProduct.bind(this);
        this.toggleProperty = this.toggleProperty.bind(this);
        this.toggleAllProducts = this.toggleAllProducts.bind(this);
        this.updateProperties = this.updateProperties.bind(this);
        this.changePropertyWeight = this.changePropertyWeight.bind(this);
    }

    changeProductValue(fn) {
        let { products } = this.state;
        products = products.map(product => fn(product));
        this.setState({
            products: products,
            properties: this.updateProperties(products)
        });
    }

    changePropertyValue(fn) {
        let { properties } = this.state;
        properties = properties.map(property => fn(property));
        this.setState({ properties: properties });
    }

    toggleProduct(toggledProduct) {
        this.changeProductValue(product => {
            if(product.matches(toggledProduct)) {
                product.selected = (!product.selected);
            }
            return product;
        });
    }

    toggleAllProducts(state) {
        this.changeProductValue(product => {
            product.selected = state;
            return product;
        });
    }

    toggleProperty(toggledProperty) {
        this.changePropertyValue(property => {
            if(property.matches(toggledProperty)) {
                property.selected = (!property.selected);
            }
            return property;
        });
    }

    changePropertyWeight(toggledProperty, value) {
        this.changePropertyValue(property => {
            if(property.matches(toggledProperty)) {
                property.weight = value;
            }
            return property;
        });
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
                <Divider icon='⇓' />
                <div className='view-comparison'>
                    <ProductCompare products={products} properties={properties} />
                </div>
            </div>
        );
    }
}

export default App;
