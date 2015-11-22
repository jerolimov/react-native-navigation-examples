
import React, { Component, View, Animated, Text, TouchableOpacity } from 'react-native';

import Drawer from 'react-native-drawer';

export default class DrawerView extends Component {
	open() {
		const { drawer } = this.refs;
		if (drawer) {
			drawer.open();
		}
	}

	close() {
		const { drawer } = this.refs;
		if (drawer) {
			drawer.close();
		}
	}

	toggle() {
		const { drawer } = this.refs;
		if (drawer) {
			drawer.toggle();
		}
	}

	render() {
		let { type } = this.props;

		if (type === 'material') {
			return this.renderMaterialDesignDrawer();
		} else if (type === 'static') {
			return this.renderStaticDrawer();
		} else if (type === 'parallax') {
			return this.renderParallaxEffectDrawer();
		} else {
			return this.renderDefaultDrawer();
		}
	}

	renderDefaultDrawer() {
		const { initializeOpen, disabled, renderSidebar, useOverlay, onOpen, onClose } = this.props;

		const drawerStyles = {
			overlay: {
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				backgroundColor: 'black',
				opacity: 0
			}
		}

		const tweenOverlayOpacity = (ratio) => {
			const { overlay } = this.refs;
			overlay && overlay.setNativeProps({
				style: {
					opacity: 1 - (10 - ratio) / 10, // set 0 to 10% opacity
				}
			});
		};

		return (
			<Drawer ref='drawer' type='displace'
				initializeOpen={ initializeOpen }
				disabled={ disabled }
				openDrawerThreshold={ 0.05 }
				openDrawerOffset={ 80 }
				tweenDuration={ 250 }
				tweenEasing='easeInOutQuart'
				tweenHandler={(ratio) => {
					tweenOverlayOpacity(ratio);
					return {};
				}}
				content={ renderSidebar() }
				onOpen={ onOpen }
				onClose={ onClose }
				styles={ drawerStyles }>
				{ this.props.children }
				{ useOverlay && <View ref='overlay' style={ drawerStyles.overlay } /> }
			</Drawer>
		);
	}

	renderMaterialDesignDrawer() {
		const { initializeOpen, disabled, renderSidebar, useOverlay, onOpen, onClose } = this.props;

		const drawerStyles = {
			drawer: {
				shadowColor: "#000000",
				shadowOpacity: 0.8,
				shadowRadius: 0
			},
			overlay: {
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				backgroundColor: 'black',
				opacity: 0
			}
		}

		const tweenOverlayOpacity = (ratio) => {
			const { overlay } = this.refs;
			overlay && overlay.setNativeProps({
				style: {
					opacity: 1 - (1.6 - ratio) / 1.6, // set 0 to 60% opacity
				}
			});
		};

		return (
			<Drawer ref='drawer' type='overlay'
				initializeOpen={ initializeOpen }
				disabled={ disabled }
				openDrawerThreshold={ 0.05 }
				openDrawerOffset={ 80 }
				panCloseMask={ 1 }
				tweenDuration={ 250 }
				tweenEasing='easeInOutQuart'
				tweenHandler={(ratio) => {
					tweenOverlayOpacity(ratio);
					return {
						drawer: { shadowRadius: ratio < .2 ? ratio * 25 : 5 }
					}
				}}
				content={ renderSidebar() }
				onOpen={ onOpen }
				onClose={ onClose }
				styles={ drawerStyles }>
				{ this.props.children }
				{ useOverlay && <View ref='overlay' style={ drawerStyles.overlay } /> }
			</Drawer>
		);
	}

	renderStaticDrawer() {
		const { initializeOpen, disabled, renderSidebar, useOverlay, onOpen, onClose } = this.props;

		const drawerStyles = {
			main: {
				shadowColor: "#000000",
				shadowOpacity: 0.4
			},
			overlay: {
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				backgroundColor: 'black',
				opacity: 0
			}
		}

		const tweenOverlayOpacity = (ratio) => {
			const { overlay } = this.refs;
			overlay && overlay.setNativeProps({
				style: {
					opacity: 1 - (10 - ratio) / 10, // set 0 to 10% opacity
				}
			});
		};

		return (
			<Drawer ref='drawer' type='static'
				initializeOpen={ initializeOpen }
				disabled={ disabled }
				openDrawerThreshold={ 0.05 }
				openDrawerOffset={ 80 }
				tweenDuration={ 250 }
				tweenEasing='easeInOutQuart'
				tweenHandler={(ratio) => {
					tweenOverlayOpacity(ratio);
					return {
						main: { shadowRadius: ratio < .2 ? ratio * 25 : 5 }
					}
				}}
				content={ renderSidebar() }
				onOpen={ onOpen }
				onClose={ onClose }
				styles={ drawerStyles }>
				{ this.props.children }
				{ useOverlay && <View ref='overlay' style={ drawerStyles.overlay } /> }
			</Drawer>
		);
	}

	renderParallaxEffectDrawer() {
		const { initializeOpen, disabled, renderSidebar, useOverlay, onOpen, onClose } = this.props;

		const drawerStyles = {
			main: {
				shadowColor: "#000000",
				shadowOpacity: 0.4
			},
			overlay: {
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				backgroundColor: 'black',
				opacity: 0
			}
		}

		const tweenOverlayOpacity = (ratio) => {
			const { overlay } = this.refs;
			overlay && overlay.setNativeProps({
				style: {
					opacity: 1 - (10 - ratio) / 10, // set 0 to 10% opacity
				}
			});
		};

		return (
			<Drawer ref='drawer' type='static'
				initializeOpen={ initializeOpen }
				disabled={ disabled }
				openDrawerThreshold={ 0.05 }
				openDrawerOffset={ 80 }
				tweenDuration={ 250 }
				tweenEasing='easeInOutQuart'
				tweenHandler={(ratio) => {
					tweenOverlayOpacity(ratio);
					return {
						main: { shadowRadius: ratio < .2 ? ratio * 25 : 5 },
						drawer: { left: -150 * (1 - ratio) }
					}
				}}
				content={ renderSidebar() }
				onOpen={ onOpen }
				onClose={ onClose }
				styles={ drawerStyles }>
				{ this.props.children }
				{ useOverlay && <View ref='overlay' style={ drawerStyles.overlay } /> }
			</Drawer>
		);
	}
}
