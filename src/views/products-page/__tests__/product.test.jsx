import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react'
import Product from '../product'

it('renders correctly', () => {
	const tree = renderer.create(<Product price={7.99} id={1} img="" name="" />).toJSON();
	expect(tree).toMatchSnapshot();
});

it('Buttons return correct data', () => {
	const { getByText } = render(<Product price={7.99} id={1} img="" name="" />)
	getByText('Remove').click()
	getByText('Qty')

	getByText('+').click()
	getByText('Qty 1')

	getByText('-').click()
	getByText('Qty')
});
