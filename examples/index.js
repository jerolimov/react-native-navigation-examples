
import React, { Component, View } from 'react-native';
import { Provider } from 'react-redux/native';

import store from './store';
import SelectExample from './SelectExample';

const examples = [
	{ title: 'Simple Navigator Example', type: 'Simple-Navigator-Example' },
	{ title: 'Simple NavigatorIOS Example', type: 'Simple-NavigatorIOS-Example' },
	{ title: 'Simple ExNavigator Example', type: 'Simple-ExNavigator-Example' }
];

const exampleMapping = {
	'Simple-Navigator-Example': require('./Simple-Navigator-Example/NavigationView'),
}

export default class App extends Component {
	render() {
		return (
			<Provider store={store}>
				{() => <SelectExample examples={ examples } exampleMapping={ exampleMapping } />}
			</Provider>
		);
	}
}
