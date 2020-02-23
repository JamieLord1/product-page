import React from 'react';
import renderer from 'react-test-renderer';
import Views from '../views'

it('renders correctly', () => {
	const tree = renderer.create(<Views />).toJSON();
	expect(tree).toMatchSnapshot();
});
