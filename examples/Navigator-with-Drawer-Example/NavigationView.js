
import React, { Component, View, Animated, Text, Image, TouchableOpacity, Navigator } from 'react-native';

import HomeView from '../home/HomeView';
import SettingsController from '../settings/SettingsController';
import HelpView from '../content/HelpView';

import DrawerView from '../../shared/ui/DrawerView';

import images from '../../shared/images';

export default class NavigationView extends Component {
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
				{ this.renderDrawerContent() }
			</DrawerView>
		);
	}

	renderNavigator() {
		const { navigationStack } = this.props;

		console.log('NavigationView render navigationStack', navigationStack);

		return (
			<View style={{ flex: 1, backgroundColor: 'black' }}>
				<Animated.View style={{ flex: 1, transform: [ { scale: 1.0 } ], opacity: 1.0 }}>
					<Navigator ref='navigator'
							initialRouteStack={ navigationStack }
							navigationBar={
								<Navigator.NavigationBar
								navigationStyles={Navigator.NavigationBar.StylesIOS}
								routeMapper={ this.routeMapper() } style={{ backgroundColor: '#f43540' }}/>
							}
							renderScene={ this.renderScene.bind(this) }
							configureScene={ this.configureScene.bind(this) }
							onDidFocus={ this.saveNavigationStack.bind(this) } />
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
					drawerTab === 'home' && <Navigator ref='navigator'
							initialRouteStack={ navigationStacks['home'] }
							navigationBar={
								<Navigator.NavigationBar
								navigationStyles={Navigator.NavigationBar.StylesIOS}
								routeMapper={ this.routeMapper() } style={{ backgroundColor: 'white', opacity: 0.8 }}/>
							}
							renderScene={ this.renderScene.bind(this) }
							configureScene={ this.configureScene.bind(this) }
							onDidFocus={ this.saveNavigationStack.bind(this) } />
				}
				{
					drawerTab === 'settings' && <Navigator ref='navigator'
							initialRouteStack={ navigationStacks['settings'] }
							navigationBar={
								<Navigator.NavigationBar
								navigationStyles={Navigator.NavigationBar.StylesIOS}
								routeMapper={ this.routeMapper() } style={{ backgroundColor: '#f43540' }}/>
							}
							renderScene={ this.renderScene.bind(this) }
							configureScene={ this.configureScene.bind(this) }
							onDidFocus={ this.saveNavigationStack.bind(this) } />
				}
				{
					drawerTab === 'help' && <Navigator ref='navigator'
							initialRouteStack={ navigationStacks['help'] }
							navigationBar={
								<Navigator.NavigationBar
								navigationStyles={Navigator.NavigationBar.StylesIOS}
								routeMapper={ this.routeMapper() } style={{ backgroundColor: '#f43540' }}/>
							}
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

	routeMapper() {
		return {
			Title: this.getTitle.bind(this),
			LeftButton: this.getLeftButton.bind(this),
			RightButton: this.getRightButton.bind(this)
		};
	}

	getTitle(route, navigator, index, navState) {
		return <Image source={ images.taxi17_logo } style={{ width: 59, height: 44 }} />
		return (
			<Text style={{ fontSize: 16, fontWeight: 'bold', marginVertical: 10, color: 'white' }}>
				Taxi 17
			</Text>
		);
	}

	getLeftButton(route, navigator, index, navState) {
		const previousRoute = index > 0 ? navState.routeStack[index - 1] : null;

		if (!previousRoute) {
			return <MenuIcon onPress={ this.toggleDrawer.bind(this) } style={{ paddingLeft: 10 }} />;
		} else {
			return (
				<TouchableOpacity
					onPress={() => navigator.pop()}
					style={{ flexDirection: 'row' }}>
					<Image source={ images.menu_back_48_black } style={{ marginTop: -4, width: 30 }} />
					<Text style={{ fontSize: 16, margin: 10, color: 'white' }}>
						Taxi 17
					</Text>
				</TouchableOpacity>
			);
		}
	}

	getRightButton(route, navigator, index, navState) {
		return (
			<TouchableOpacity
				onPress={ () => navigator.push({}) }
				style={{ paddingRight: 10 }}>
				<Text style={{ fontSize: 16, marginVertical: 10, color: 'black' }}>
					Next
				</Text>
			</TouchableOpacity>
		);
	}
}
