
import React, { Component, View, Animated, Text, Image, TouchableOpacity } from 'react-native';

import HomeView from '../home/HomeView';
import SettingsController from '../settings/SettingsController';
import HelpView from '../content/HelpView';

import DrawerView from '../../shared/ui/DrawerView';

import ExNavigator from '@exponent/react-native-navigator';

import images from '../../shared/images';

const navigationBarStyles = {
	barRightButton: [ ExNavigator.Styles.barRightButton ],
	barRightButtonText: [ ExNavigator.Styles.barRightButtonText, { color: 'white' } ]
}

const routes = {
	getHomeRoute() {
		return {
			getTitle() {
				return 'Home';
			},
			getSceneClass() {
				return HomeView;
			},
			onDidFocus() {
				console.log('Home Scene received focus.');
			},
			onDidBlur(event) {
				console.log('Home Scene lost focus.');
			}
		}
	},
	getSettingsRoute() {
		return {
			getTitle() {
				return 'Settings';
			},
			getSceneClass() {
				return SettingsController;
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

export default class NavigationViewEx extends Component {
	toggleDrawer() {
		const { drawer } = this.refs;
		if (drawer) {
			drawer.toggle();
		}
	}

	saveNavigationStack() {
		const { saveNavigationStack } = this.props;
		const { navigator } = this.refs;

		if (navigator) {
			// TODO: Use another "nextTick" variant here which ensures that the route stack is correct after the pop() call.
			setTimeout(() => {
				saveNavigationStack(navigator.getCurrentRoutes());
			}, 0);
		}
	}

	render() {
		const { drawerOpen, renderSidebar, switchDrawerOpenState } = this.props;
		const { navigator } = this.refs;

		console.log('NavigationView render', drawerOpen);

		return (
			<DrawerView ref='drawer' type='static'
				initializeOpen={ drawerOpen }
				disabled={ navigator && navigator.getCurrentRoutes().length > 1 }
				renderSidebar={ renderSidebar }
				onOpen={ switchDrawerOpenState.bind(null, true) }
				onClose={ switchDrawerOpenState.bind(null, false) }>
				{ this.renderNavigator() }
			</DrawerView>
		);
	}

	renderNavigator() {
		const { navigationStack } = this.props;

		console.log('NavigationView render navigationStack', navigationStack);

		return (
			<View style={{ flex: 1, backgroundColor: 'black' }}>
				<Animated.View style={{ flex: 1, transform: [ { scale: 1.0 } ], opacity: 1.0 }}>
					<ExNavigator ref='navigator'
							initialRoute={ routes.getSettingsRoute() }
							renderScene={ this.renderScene.bind(this) }
							configureScene={ this.configureScene.bind(this) }
							onDidFocus={ this.saveNavigationStack.bind(this) }

							navigationBarStyle={{ backgroundColor: '#1976D2' }}
							titleStyle={{ color: 'white' }}
							barButtonTextStyle={{ color: 'white' }}
							barButtonIconStyle={{ tintColor: 'white' }}

							style={{ flex: 1 }}
							sceneStyle={{ paddingTop: 64 }} />
				</Animated.View>
			</View>
		);
	}

	renderDrawerContent() {
		const { drawerTab, navigationStacks } = this.props;

		console.log('NavigationView render drawerTab / navigationStacks', drawerTab, navigationStacks);

		return (
			<View style={{ flex: 1, backgroundColor: 'black' }}>
				<Animated.View style={{ flex: 1, transform: [ { scale: 1.0 } ], opacity: 1.0 }}>
				{
					drawerTab === 'home' && <ExNavigator ref='navigator'
							initialRouteStack={ navigationStacks['home'] }
							renderScene={ this.renderScene.bind(this) }
							configureScene={ this.configureScene.bind(this) }
							onDidFocus={ this.saveNavigationStack.bind(this) } />
				}
				{
					drawerTab === 'settings' && <ExNavigator ref='navigator'
							initialRouteStack={ navigationStacks['settings'] }
							renderScene={ this.renderScene.bind(this) }
							configureScene={ this.configureScene.bind(this) }
							onDidFocus={ this.saveNavigationStack.bind(this) } />
				}
				{
					drawerTab === 'help' && <ExNavigator ref='navigator'
							initialRouteStack={ navigationStacks['help'] }
							renderScene={ this.renderScene.bind(this) }
							configureScene={ this.configureScene.bind(this) }
							onDidFocus={ this.saveNavigationStack.bind(this) } />
				}
				</Animated.View>
			</View>
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
