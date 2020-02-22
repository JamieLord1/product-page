import React, { Component } from 'react'
import axios from 'axios';
import { Select } from 'antd';
import Product from './product'
import './index.css'


export class Index extends Component {
	constructor(props) {
		super(props)

		this.state = {
			products: [],
			coloursAvailable: [],
			allProducts: [],
			total: 0,
			quantities: {}
		}
	}

	componentDidMount() {
		axios.get('https://my-json-server.typicode.com/benirvingplt/products/products')
			.then((response) => {
				this.setState({ products: response.data, allProducts: response.data, coloursAvailable: [...new Set(response.data.map((product) => product.colour))] })
			})
			.catch((error) => {
				throw error
			});
	}

	handleColorFilterOnChange = (colours) => {
		const { allProducts } = this.state
		const filteredProducts = []
		colours.map((colour) => {
			allProducts.map((product) => {
				if (product.colour === colour) {
					filteredProducts.push(product)
				}
			})
		})

		if (filteredProducts.length >= 0) {
			this.setState({ products: filteredProducts }, () => {
				if (filteredProducts.length === 0) {
					this.setState({ products: allProducts })
				}
			})
		}
	}

	render() {
		const { products, coloursAvailable, total, quantities } = this.state
		const { Option } = Select
		return (
			<div>
				<Select mode="multiple" placeholder="Colour filter" onChange={this.handleColorFilterOnChange} className="product-page-colour-filter">
					{
						coloursAvailable.map((color) => (
							<Option key={color} value={color}>{color}</Option>
						))
					}
				</Select>
				<div className="product-page-list-container">
					{
						products.map((product) => (
							<Product
								key={product.id}
								id={product.id}
								img={product.img}
								name={product.name}
								price={product.price}
								quant={quantities[product.id]}
								total={(val, id, quantity) => {
									this.setState({ total: (total + val), quantities: { ...quantities, [id]: quantity } })
								}}
							/>
						))
					}
				</div>
				<hr />
				<h2 className="product-page-total">
					{`£ Total ${total.toFixed(2)}`}
				</h2>
			</div>
		)
	}
}

export default Index
