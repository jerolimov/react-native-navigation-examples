
import React, { Component, TouchableOpacity, Image } from 'react-native';

export default class MenuIcon extends Component {
	render() {
		return (
			<TouchableOpacity onPress={ this.props.onPress } style={ this.props.style }>
				<Image source={ require('./ic_menu_black_24dp.png') } style={{ marginVertical: 8 }} />
			</TouchableOpacity>
		);
	}
}
