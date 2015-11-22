
import React, { Component, View, ListView, Text, TouchableOpacity } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';

import * as actions from './actions';
import routes from './routes';

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(actions, dispatch);
}

export class SelectExample extends Component {
	constructor(props) {
		super(props);
		const dataSourceDefinition = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});
		this.state = {
			dataSource: dataSourceDefinition.cloneWithRows([
				{ title: 'Simple Navigator example without back button', example: 'NavigatorExamplesNavigationView' },
				{ title: 'Simple Navigator example with back button', example: 'NavigatorExamplesNavigationViewWithBackButton' },
				{ title: 'Simple Navigator example with drawer', example: 'NavigatorExamplesNavigationViewWithDrawer' }
			]),
		}
	}

	selectExample(example) {
//		this.props.selectExample(example);
		this.props.navigator.push(routes[example]);
	}

	render() {
		return (
			<ListView
				dataSource={ this.state.dataSource }
				renderRow={ this.renderRow.bind(this) }
				style={{ flex: 1 }}
			/>
		);
	}

	renderRow(data, section, row) {
		return (
			<TouchableOpacity onPress={ this.selectExample.bind(this, data.example) } style={{
				padding: 14,
				backgroundColor: row % 2 === 0 ? '#f0ffff' : 'white',
				borderTopWidth: row === 0 || row === '0',
				borderBottomWidth: 1,
				borderColor: '#eeeeee'
			}}>
				<Text>{ data.title }</Text>
			</TouchableOpacity>
		);
	}
}

export default connect(state => state, mapDispatchToProps)(SelectExample);
