
import SelectExample from './SelectExample';

import NavigatorExamplesNavigationView from './Navigator-Examples/NavigationView';
import NavigatorExamplesNavigationViewWithBackButton from './Navigator-Examples/NavigationViewWithBackButton';
import NavigatorExamplesNavigationViewWithDrawer from './Navigator-Examples/NavigationViewWithDrawer';

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
	}
}
