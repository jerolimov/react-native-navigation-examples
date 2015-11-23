
import React, { Component, View, Text, StyleSheet } from 'react-native';

const colors = {
	'#EF9A9A': 'Red',
	'#F48FB1': 'Pink',
	'#CE93D8': 'Purple',
	'#B39DDB': 'Deep Purple',
	'#9FA8DA': 'Indigo',
	'#90CAF9': 'Blue',
	'#81D4FA': 'Light Blue',
	'#80DEEA': 'Cyan',
	'#80CBC4': 'Teal',
	'#A5D6A7': 'Green',
	'#C5E1A5': 'Light Green',
	'#E6EE9C': 'Lime',
	'#FFF59D': 'Yellow',
	'#FFE082': 'Amber',
	'#FFCC80': 'Orange',
	'#FFAB91': 'Deep Orange',
	'#BCAAA4': 'Brown'
};

const defaultStyle = StyleSheet.create({
	view: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'lightgray',
		borderWidth: 5,
		borderColor: 'black'
	}
});

class DemoView extends Component {
	render() {
		return (
			<View style={[ defaultStyle.view, this.props.style ]}>
				{ this.props.children }
			</View>
		);
	}
}

function createDemoView(backgroundColor, text) {
	return class extends Component {
		render() {
			return (
				<DemoView style={{ backgroundColor }}>
					<Text>{{ text }}</Text>
				</DemoView>
			);
		}
	}
}

const demoViews = {};

const colorKeys = Object.keys(colors);
const colorLength = colorKeys.length;

colorKeys.forEach((color, index) => {
	demoViews['DemoView' + index] = createDemoView(color, colors[color])
});

export default {
	...demoViews,
	randomView: () => {
		const index = parseInt(Math.random() * colorLength);
		return {
			scene: demoViews['DemoView' + index],
			title: colors[colorKeys[index]]
		};
	},
	randomViewName: () => {
//		const index = parseInt(Math.random() * colorLength);
//		return 'DemoView' + index;
//	},
//	randomViewOption: () => {
		const index = parseInt(Math.random() * colorLength);
		return {
			type: 'DemoView' + index,
			title: colors[colorKeys[index]]
		};
	}
}
