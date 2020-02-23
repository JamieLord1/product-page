import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react'
import axios from 'axios';
import Index from '../index'

jest.mock('axios')

it('renders correctly', () => {
	const tree = renderer.create(<Index />).toJSON();
	expect(tree).toMatchSnapshot();
});

it('Mock async componentDidMount and confirm data', async () => {
	const response = { data: [{ id: 1, colour: 'Black', price: 10, img: '', name: 'Dress' }] };

	await axios.get.mockResolvedValue(response);

	const { findByText } = render(<Index />)
	expect(await findByText('Dress'))
})
