
import React, { Component, View, ListView, Text, TouchableOpacity } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';

import * as actions from './actions';

const mapStateToProps = (state) => {
	return {
		example: state.example
	}
};

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
			dataSource: dataSourceDefinition.cloneWithRows(props.examples),
		}
	}

	render() {
		const { example, exampleMapping } = this.props;
		if (example && example.type && exampleMapping[example.type]) {
			return exampleMapping[example.type];
		} else {
			return (
				<View style={{ flex: 1 }}>
					<Text style={{
						marginTop: 20,
						padding: 14,
						textAlign: 'center',
						fontWeight: 'bold',
						backgroundColor: 'white'
					}}>Select an example</Text>
					<ListView dataSource={ this.state.dataSource }
							renderRow={ this.renderRow.bind(this) }
							style={{ flex: 1 }}>
					</ListView>
				</View>
			);
		}
	}

	renderRow(data, section, row) {
		const { selectExample } = this.props;
		return (
			<TouchableOpacity onPress={ selectExample.bind(null, data) } style={{
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectExample);
