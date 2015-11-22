
import React, { Component, View, Text, NavigatorIOS } from 'react-native';

import HomeView from '../home/HomeView';
import SettingsController from '../settings/SettingsController';
import HelpView from '../content/HelpView';

import DrawerView from '../../shared/ui/DrawerView';

import images from '../../shared/images';

export default class NavigationViewIOS extends Component {
	toggleDrawer() {
		const { drawer } = this.refs;
		if (drawer) {
			drawer.toggle();
		}
	}

	componentDidMount() {
		const { navigator } = this.refs;

		console.log('navigator mount', navigator);
			for (var i = 1; i <= 10; i++) {
				const nextRoute = {
					component: HelpView,
					title: '# ' + i,
					rightButtonTitle: 'Next',
					onRightButtonPress: () => {
						this.refs.navigator.push(nextRoute);
					},
					passProps: { pushMe: () => {} },
					wrapperStyle: { paddingTop: 64 }
				}

				setTimeout(() => {
					navigator.push(nextRoute);
				}, i * 1000 + 100);
			}
	}

	render() {
		const { drawerOpen, renderSidebar, switchDrawerOpenState } = this.props;
		const { navigator } = this.refs;

		console.log('NavigationView render', drawerOpen);

		return (
			<DrawerView ref='drawer' type='static'
				initializeOpen={ drawerOpen }
				disabled={ false }
				renderSidebar={ renderSidebar }
				onOpen={ switchDrawerOpenState.bind(null, true) }
				onClose={ switchDrawerOpenState.bind(null, false) }>
				{ this.renderNavigator() }
			</DrawerView>
		);
	}

	renderNavigator() {
		const { navigationStack } = this.props;

		console.log('NavigationView navigationStack', navigationStack);

		const passProps = {
			pushMe: () => {}
		};

		const initialRoute = {
			component: HelpView,
			title: 'Einstellungen',
			leftButtonIcon: images.menu_icon_24,
			onLeftButtonPress: () => {
				this.toggleDrawer();
			},
			rightButtonTitle: 'Next',
			onRightButtonPress: () => {
				this.refs.navigator.push(nextRoute);
			},
			passProps,
			wrapperStyle: { paddingTop: 64 }
		}

		const initialRoute2 = {
			component: () => {
				return <HelpView />;
			},
			title: 'Einstellungen',
			leftButtonIcon: images.menu_icon_24,
			onLeftButtonPress: () => {
				this.toggleDrawer();
			},
			rightButtonTitle: 'Next',
			onRightButtonPress: () => {
				this.refs.navigator.push(nextRoute);
			}
		}

		const nextRoute = {
			component: HelpView,
			title: 'Next',
			rightButtonTitle: 'Next',
			onRightButtonPress: () => {
				this.refs.navigator.push(nextRoute);
			},
			passProps,
			wrapperStyle: { paddingTop: 64 }
		}

		return <NavigatorIOS ref='navigator'
					initialRoute={ initialRoute }
					titleTextColor='white'
					tintColor='white'
					barTintColor='#1976D2'
					translucent={ true }
					style={{ flex: 1 }} />;
	}
}
