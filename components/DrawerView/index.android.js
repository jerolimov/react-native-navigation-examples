
import React, { Component, DrawerLayoutAndroid } from 'react-native';

export default class DrawerView extends Component {
	open() {
		const { drawer } = this.refs;
		drawer.openDrawer();
	}

	close() {
		const { drawer } = this.refs;
		drawer.closeDrawer();
	}

	toggle() {
		const { drawer } = this.refs;
		if (this.isOpen) {
			drawer.closeDrawer();
		} else {
			drawer.openDrawer();
		}
	}

	onOpen() {
		const { onOpen } = this.props;
		this.isOpen = true;
		if (onOpen) {
			onOpen();
		}
	}

	onClose() {
		const { onClose } = this.props;
		this.isOpen = false;
		if (onClose) {
			onClose();
		}
	}

	render() {
		const { renderSidebar, onOpen, onClose } = this.props;

		return (
			<DrawerLayoutAndroid ref='drawer' style={{ flex: 1 }}
				drawerWidth={300}
				renderNavigationView={ renderSidebar }
				onDrawerOpen={ this.onOpen.bind(this) }
				onDrawerClose={ this.onClose.bind(this) }>

				{ this.props.children }

			</DrawerLayoutAndroid>
		);
	}
}
