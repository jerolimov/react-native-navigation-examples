
import React, { Component, View, Text, TouchableOpacity } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';

import ExNavigator from '@exponent/react-native-navigator';

import * as actions from './actions';
import routes from './routes';

const mapStateToProps = (state) => {
	return {
		example: state.example
	}
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(actions, dispatch);
}

export class NavigationView extends Component {
	render() {
		const { example } = this.props;

		console.log('NavigationView render', example);

		let navigationStack = [ routes.root ];
		if (example && routes[example]) {
			navigationStack.push(routes[example]);
		}

		return (
			<ExNavigator
				initialRouteStack={ navigationStack }
				sceneStyle={{ paddingTop: 64 }}
				style={{ flex: 1 }}
			/>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationView);
