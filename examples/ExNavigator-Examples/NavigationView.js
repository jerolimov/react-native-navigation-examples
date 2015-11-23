
import React, { Component, View, Animated, Text, Image, TouchableOpacity } from 'react-native';

import DemoViews, { randomView } from '../../components/DemoViews';

import ExNavigator from '@exponent/react-native-navigator';

const navigationBarStyles = {
	barRightButton: [ ExNavigator.Styles.barRightButton ],
	barRightButtonText: [ ExNavigator.Styles.barRightButtonText, { color: 'white' } ]
}

const routes = {
	getRoot() {
		const view = randomView();
		return {
			getTitle() {
				return view.title;
			},
			getSceneClass() {
				return view.scene;
			},
			renderRightButton(navigator, index, state) {
				const onPress = () => { navigator.push(routes.getRoot()); }
				return (
					<TouchableOpacity onPress={ onPress } style={ navigationBarStyles.barRightButton }>
						<Text style={ navigationBarStyles.barRightButtonText }>Next</Text>
					</TouchableOpacity>
				);
			}
		}
	},
	getNextRoute() {
		return {
			getTitle() {
				return 'Settings';
			},
			getSceneClass() {
				return randomView()
			},
			renderLeftButton(navigator, index, state) {
				if (index == 0) {
					const onPress = () => {}
					return (
						<TouchableOpacity onPress={ onPress } style={ navigationBarStyles.barLeftButton }>
							<Image source={ images.menu_icon_24 } style={{ margin: 10 }} />
						</TouchableOpacity>
					);
				} else {
					const routeMapper = navigator._routeRenderer.navigationBarRouteMapper;
					const renderBackButton = routeMapper._renderBackButton.bind(routeMapper);
					const previousIndex = index - 1;
					const previousRoute = state.routeStack[previousIndex];
					return renderBackButton(previousRoute, navigator, previousIndex, state);
				}
			},
			renderRightButton(navigator, index, state) {
				const onPress = () => { navigator.push(routes.getSettingsRoute()); }
				return (
					<TouchableOpacity onPress={ onPress } style={ navigationBarStyles.barRightButton }>
						<Text style={ navigationBarStyles.barRightButtonText }>Next</Text>
					</TouchableOpacity>
				);
			},
			onDidFocus() {
				console.log('Settings Scene received focus.');
			},
			onDidBlur(event) {
				console.log('Settings Scene lost focus.');
			}
		}
	}
};

export default class NavigationView extends Component {
	saveNavigationStack() {
		const { saveNavigationStack } = this.props;
		const { navigator } = this.refs;

		if (navigator) {
			// TODO: Use another "nextTick" variant here which ensures that the route stack is correct after the pop() call.
			setTimeout(() => {
//				saveNavigationStack(navigator.getCurrentRoutes());
			}, 0);
		}
	}

	render() {
//		const { navigationStack } = this.props;
		const navigationStack = [ routes.getRoot() ];

		return (
			<ExNavigator ref='navigator'
				initialRouteStack={ navigationStack }
				renderScene={ this.renderScene.bind(this) }
				configureScene={ this.configureScene.bind(this) }
				onDidFocus={ this.saveNavigationStack.bind(this) }

				navigationBarStyle={{ backgroundColor: '#1976D2' }}
				titleStyle={{ color: 'white' }}
				barButtonTextStyle={{ color: 'white' }}
				barButtonIconStyle={{ tintColor: 'white' }}

				sceneStyle={{ paddingTop: 64 }}
				style={{ flex: 1, backgroundColor: 'red' }}
			/>
		);
	}

	renderScene(route, navigator) {
		console.log('renderScene route:', route);

		let content;

		if (!route || !route.type) {
			content = (
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'lightgray' }}>
					<Text>No route or route type defined: { route }</Text>
				</View>
			);
		} else if (route.type === 'home') {
			content = <HomeView style={{ flex: 1 }} />;
		} else if (route.type === 'settings') {
			content = <SettingsController style={{ flex: 1, backgroundColor: route.backgroundColor }} />;
		} else if (route.type === 'help') {
			content = <HelpView
							pushMe={ () => { navigator.push({ type: 'help', backgroundColor: 'lightgray' }); } }
							style={{ flex: 1, backgroundColor: route.backgroundColor }} />;
		} else {
			content = (
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'lightgray' }}>
					<Text>Unknown route type: { route.type }</Text>
				</View>
			);
		}

		return content;
	}

	configureScene(route, navigator) {
		if (route && route.sceneConfig) {
			return route.sceneConfig;
		} else {
			return Navigator.SceneConfigs.PushFromRight;
		}
	}
}
