
import React, { Component, View, Text, NavigatorIOS } from 'react-native';

import DemoViews, { randomViewName } from '../../components/DemoViews';

import menuIcon from '../../components/MenuIcon/ic_menu_black_24dp.png';

export default class NavigationViewIOS extends Component {
	componentDidMount() {
		const { navigator } = this.refs;

		console.log('navigator mount', navigator);
		/*for (var i = 1; i <= 10; i++) {
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
		}*/
	}

	render() {
		const { navigationStack } = this.props;

		console.log('NavigationView navigationStack', navigationStack);

		const passProps = {
			pushMe: () => {}
		};

		const demoView = DemoViews[randomViewName()];

		const initialRoute = {
			component: () => {
				return React.createElement(demoView);
			},
			title: 'Einstellungen',
			leftButtonIcon: menuIcon,
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
				return React.createElement(demoView);
			},
			title: 'Einstellungen',
			leftButtonIcon: menuIcon,
			onLeftButtonPress: () => {
				this.toggleDrawer();
			},
			rightButtonTitle: 'Next',
			onRightButtonPress: () => {
				this.refs.navigator.push(nextRoute);
			}
		}

		const nextRoute = {
			component: React.createElement(demoView),
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
