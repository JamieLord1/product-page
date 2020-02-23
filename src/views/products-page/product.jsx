import React, { useState } from 'react'
import { Button } from 'antd';
import PropTypes from 'prop-types'
import { usePrevious } from '../../helpers/utils';
import './product.css'

function Product({ id, img, name, price, total, quant }) {
	const [quantity, setQuantity] = useState(quant)

	const prevQuantity = usePrevious(quantity)
	React.useEffect(() => {
		if (prevQuantity !== quantity) {
			if (prevQuantity === undefined) {
				total(quantity * price, id, quantity)
			} else {
				total((quantity - prevQuantity) * price, id, quantity)
			}
		}
	}, [quantity])

	return (
		<div className="product-container">
			<img className="product-img" width="100%" src={img} alt={name} />
			<div className="product-text-container">
				<h1 className="product-name">{name}</h1>
				<label className="product-price">
					{`£${price.toFixed(2)}`}
				</label>
			</div>
			<div className="product-qty-container">
				<Button onClick={() => setQuantity(quantity > 0 ? quantity - 1 : 0)}>
					<span className="product-qty-change-button">
						-
					</span>
				</Button>
				<div className="product-qty-text-container">
					<h2 className="product-qty-text">{`Qty ${quantity === 0 ? '' : quantity}`}</h2>
					<button type="button" onClick={() => setQuantity(0)} className="product-qty-remove-button">Remove</button>
				</div>
				<Button onClick={() => setQuantity(quantity + 1)}>
					<span className="product-qty-change-button">
						+
					</span>
				</Button>
			</div>
		</div>
	)
}

Product.defaultProps = {
	quant: 0,
	total: () => {}
}

Product.propTypes = {
	id: PropTypes.number.isRequired,
	img: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	quant: PropTypes.number,
	total: PropTypes.func
}

export default Product
