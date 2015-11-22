
import React, { Component, View, Animated, Text, Image, TouchableOpacity, Navigator } from 'react-native';

import DemoView, { DemoView1, DemoView2, DemoView3, DemoView4 } from '../../components/DemoViews';
import MenuIcon from '../../components/MenuIcon';

export default class NavigationView extends Component {
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
		return (
			<Text style={{ fontSize: 16, fontWeight: 'bold', marginVertical: 10, color: 'white' }}>
				Simple Navigator Examples
			</Text>
		);
	}

	getLeftButton(route, navigator, index, navState) {
		const previousRoute = index > 0 ? navState.routeStack[index - 1] : null;

		if (previousRoute) {
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
