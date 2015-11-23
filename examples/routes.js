
import SelectExample from './SelectExample';

import NavigatorExamplesNavigationView from './Navigator-Examples/NavigationView';
import NavigatorExamplesNavigationViewWithBackButton from './Navigator-Examples/NavigationViewWithBackButton';
import NavigatorExamplesNavigationViewWithDrawer from './Navigator-Examples/NavigationViewWithDrawer';
import NavigatorIOSExamplesNavigationView from './NavigatorIOS-Examples/NavigationView';
import NavigatorIOSExamplesNavigationViewWithDrawer from './NavigatorIOS-Examples/NavigationViewWithDrawer';
import ExNavigatorExamplesNavigationView from './ExNavigator-Examples/NavigationView';
import ExNavigatorExamplesNavigationViewWithDrawer from './ExNavigator-Examples/NavigationViewWithDrawer';

export default {
	root: {
		getTitle: () => 'Select example',
		getSceneClass: () => SelectExample
	},
	NavigatorExamplesNavigationView: {
		getSceneClass: () => NavigatorExamplesNavigationView
	},
	NavigatorExamplesNavigationViewWithBackButton: {
		getSceneClass: () => NavigatorExamplesNavigationViewWithBackButton
	},
	NavigatorExamplesNavigationViewWithDrawer: {
		getSceneClass: () => NavigatorExamplesNavigationViewWithDrawer
	},
	NavigatorIOSExamplesNavigationView: {
		getSceneClass: () => NavigatorIOSExamplesNavigationView
	},
	NavigatorIOSExamplesNavigationViewWithDrawer: {
		getSceneClass: () => NavigatorIOSExamplesNavigationViewWithDrawer
	},
	ExNavigatorExamplesNavigationView: {
		getSceneClass: () => ExNavigatorExamplesNavigationView
	},
	ExNavigatorExamplesNavigationViewWithDrawer: {
		getSceneClass: () => ExNavigatorExamplesNavigationViewWithDrawer
	}
}
