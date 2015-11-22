
import React, { Component, View, Text } from 'react-native';

export default class DemoView extends Component {
	render() {
		return (
			<View style={[ { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'gray' }, this.props.style ]}>
				<Text>Content:</Text>
				{ this.props.children }
			</View>
		);
	}
}

export class Demo1 extends Component {
	render() {
		return <DemoView style={{ backgroundColor: 'red' }} />
	}
}

export class Demo2 extends Component {
	render() {
		return <DemoView style={{ backgroundColor: 'blue' }} />
	}
}

export class Demo3 extends Component {
	render() {
		return <DemoView style={{ backgroundColor: 'green' }} />
	}
}

export class Demo4 extends Component {
	render() {
		return <DemoView style={{ backgroundColor: 'yellow' }} />
	}
}
