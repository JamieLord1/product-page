import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import App from './App';

const root = document.getElementById('root')

const renderToDOM = () => {
	if (root) {
		ReactDOM.render(<App />, root)
	}
}

renderToDOM();

export { renderToDOM };
