
import React, { Component, View, Text, Image, TouchableOpacity, Navigator, StyleSheet } from 'react-native';

import DrawerView from '../../components/DrawerView';

import DemoViews, { randomViewName } from '../../components/DemoViews';

import backIcon from '../../components/BackIcon/ic_chevron_left_black_48dp.png';

const styles = StyleSheet.create({
	navigationBar: {
		backgroundColor: '#B0BEC5'
	},
	navigationBarTitle: {
		fontSize: 16,
		fontWeight: 'bold',
		margin: 10
	},
	navigationBackButtonIcon: {
		marginTop: -4,
		left: 8,
		width: 20,
		tintColor: '#0277BD'
	},
	navigationBackButtonTitle: {
		fontSize: 16,
		margin: 10,
		color: '#0277BD'
	},
	navigationNextButtonTitle: {
		fontSize: 16,
		margin: 10,
		color: '#0277BD'
	},
	contentMissed: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'lightgray',
		borderWidth: 5,
		borderColor: 'red'
	}
});

export default class NavigationViewWithDrawer extends Component {
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

	toggleDrawer() {
		const { drawer } = this.refs;
		if (drawer) {
			drawer.toggle();
		}
	}

	popView() {
		this.refs.navigator.pop()
	}

	pushRandomView() {
		const sceneConfigs = Object.keys(Navigator.SceneConfigs);
		const sceneConfig = sceneConfigs[parseInt(Math.random() * sceneConfigs.length)];

		console.log('Navigator.SceneConfigs', )
		this.refs.navigator.push({
			...randomViewName(),
			sceneConfig
		});
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
				onOpen={ switchDrawerOpenState && switchDrawerOpenState.bind(null, true) }
				onClose={ switchDrawerOpenState && switchDrawerOpenState.bind(null, false) }>
				{ this.renderNavigator() }
			</DrawerView>
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

	renderNavigator() {
//		const { navigationStack } = this.props;
		const navigationStack = [ randomViewName() ];

		return (
			<Navigator ref='navigator'
				initialRouteStack={ navigationStack }
				navigationBar={
					<Navigator.NavigationBar
						navigationStyles={Navigator.NavigationBar.StylesIOS}
						routeMapper={ this.routeMapper() }
						style={ styles.navigationBar }
					/>
				}
				renderScene={ this.renderScene.bind(this) }
				configureScene={ this.configureScene.bind(this) }
				onDidFocus={ this.saveNavigationStack.bind(this) }
				sceneStyle={{ paddingTop: 64 }}
				style={{ backgroundColor: 'black' }}
			/>
		);
	}

	renderScene(route, navigator) {
		const demoView = route && DemoViews[route.type]
		if (demoView) {
			return React.createElement(demoView);
		}

		return (
			<View style={ styles.contentMissed }>
				<Text>Unknown route: { JSON.stringify(route) }</Text>
			</View>
		);
	}

	configureScene(route, navigator) {
		const defaultSceneConfig = Navigator.SceneConfigs.PushFromRight;

		if (route && typeof route.sceneConfig === 'string') {
			return Navigator.SceneConfigs[route.sceneConfig] || defaultSceneConfig;
		} else if (route && typeof route.sceneConfig === 'object') {
			return route.sceneConfig;
		} else {
			return defaultSceneConfig;
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
		console.log('route', route);
		const title = route && route.title;

		if (title) {
			return (
				<Text style={ styles.navigationBarTitle }>
					{ title }
				</Text>
			);
		}
	}

	getLeftButton(route, navigator, index, navState) {
		const previousRoute = index > 0 ? navState.routeStack[index - 1] : null;
		const backTitle = previousRoute && (previousRoute.title || 'Back');

		if (backTitle) {
			return (
				<TouchableOpacity onPress={ this.popView.bind(this) } style={{ flexDirection: 'row' }}>
					<Image source={ backIcon } style={ styles.navigationBackButtonIcon } />
					<Text style={ styles.navigationBackButtonTitle }>
						{ backTitle }
					</Text>
				</TouchableOpacity>
			);
		}
	}

	getRightButton(route, navigator, index, navState) {
		const nextTitle = 'Next';

		if (nextTitle) {
			return (
				<TouchableOpacity onPress={ this.pushRandomView.bind(this) }>
					<Text style={ styles.navigationNextButtonTitle }>
						{ nextTitle }
					</Text>
				</TouchableOpacity>
			);
		}
	}
}
