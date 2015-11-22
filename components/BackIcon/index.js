
import React, { Component, TouchableOpacity, Image } from 'react-native';

export default class BackIcon extends Component {
	render() {
		return (
			<TouchableOpacity onPress={ this.props.onPress } style={ this.props.style }>
				<Image source={ require('./ic_chevron_left_black_48dp.png') } style={{ marginVertical: 8 }} />
			</TouchableOpacity>
		);
	}
}
