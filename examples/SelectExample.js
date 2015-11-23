
import React, { Component, View, ListView, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';

import * as actions from './actions';
import routes from './routes';

const styles = StyleSheet.create({
	sectionTitle: {
		paddingHorizontal: 16,
		paddingVertical: 2,
		fontWeight: 'bold',
		backgroundColor: '#eeeeee'
	},
	row: {
		marginLeft: 16,
		paddingRight: 16,
		paddingVertical: 14,
		borderBottomWidth: 1,
		borderColor: '#eeeeee'
	}
});

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(actions, dispatch);
}

export class SelectExample extends Component {
	constructor(props) {
		super(props);
		const dataSourceDefinition = new ListView.DataSource({
			sectionHeaderHasChanged: (h1, h2) => h1 !== h2,
			rowHasChanged: (r1, r2) => r1 !== r2
		});
		this.state = {
			dataSource: dataSourceDefinition.cloneWithRowsAndSections({
				'NavigatorExamples': {
					title: 'Navigator examples',
					'NavigationView': {
						title: 'Navigation view without back button',
						example: 'NavigatorExamplesNavigationView'
					},
					'NavigationViewWithBackButton': {
						title: 'Navigation view with back button',
						example: 'NavigatorExamplesNavigationViewWithBackButton'
					},
					'NavigationViewWithDrawer': {
						title: 'Navigation view with drawer',
						example: 'NavigatorExamplesNavigationViewWithDrawer'
					}
				},
				'NavigatorIOSExamples': {
					title: 'NavigatorIOS examples',
					'NavigationView': {
						title: 'Navigation view',
						example: 'NavigatorIOSExamplesNavigationView'
					},
					'NavigationViewWithDrawer': {
						title: 'Navigation view with drawer',
						example: 'NavigatorIOSExamplesNavigationViewWithDrawer'
					}
				},
				'ExNavigatorExamples': {
					title: 'ExNavigator examples',
					'NavigationView': {
						title: 'Navigation view',
						example: 'ExNavigatorExamplesNavigationView'
					},
					'NavigationViewWithDrawer': {
						title: 'Navigation view with drawer',
						example: 'ExNavigatorExamplesNavigationViewWithDrawer'
					}
				}
			}, [
				'NavigatorExamples',
				'NavigatorIOSExamples',
				'ExNavigatorExamples'
			], [
				[
					'NavigationView',
					'NavigationViewWithBackButton',
					'NavigationViewWithDrawer'
				],
				[
					'NavigationView',
					'NavigationViewWithDrawer'
				],
				[
					'NavigationView',
					'NavigationViewWithDrawer'
				]
			])
		}
	}

	rowSelected(data, section, row) {
		if (data.example) {
//			this.props.selectExample(data.example);
			this.props.navigator.push(routes[data.example]);
		}
	}

	render() {
		return (
			<ListView
				dataSource={ this.state.dataSource }
				renderSectionHeader={ this.renderSectionHeader.bind(this) }
				renderRow={ this.renderRow.bind(this) }
				style={{ flex: 1 }}
			/>
		);
	}

	renderSectionHeader(data, section) {
		return (
			<View style={ styles.sectionTitle }>
				<Text>{ data.title }</Text>
			</View>
		);
	}

	renderRow(data, section, row) {
		return (
			<TouchableOpacity onPress={ this.rowSelected.bind(this, data, section, row) } style={ styles.row }>
				<Text>{ data.title }</Text>
			</TouchableOpacity>
		);
	}
}

export default connect(state => state, mapDispatchToProps)(SelectExample);
