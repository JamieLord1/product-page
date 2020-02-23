import React, { Component } from 'react'
import axios from 'axios';
import { Select, Spin } from 'antd';
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
			quantities: {},
			loading: true
		}
	}

	async componentDidMount() {
		const response = await axios.get('https://my-json-server.typicode.com/benirvingplt/products/products')
		let data = []
		if (response !== null && response !== undefined) {
			if (response.hasOwnProperty('data')) {
				data = response.data
			}
		}
		this.setState({ products: data, allProducts: data, coloursAvailable: [...new Set(data.map((product) => product.colour))], loading: false })
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
		const { products, coloursAvailable, total, quantities, loading } = this.state
		const { Option } = Select
		return (
			<div className="product-page-container">
				<Select mode="multiple" placeholder="Colour filter" onChange={this.handleColorFilterOnChange} className="product-page-colour-filter">
					{
						coloursAvailable.map((color) => (
							<Option key={color} value={color}>{color}</Option>
						))
					}
				</Select>
				<div className="product-page-list-container">
					{
						loading
							? <Spin />
							: products.map((product) => (
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
				<div className="product-page-total-container">
					<hr />
					<h2 className="product-page-total">
						{`£ Total ${total.toFixed(2)}`}
					</h2>
				</div>
			</div>
		)
	}
}

export default Index
