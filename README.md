> **Compares different react-native navigation UI / UX / DX options!**
>
> This example app compares different options to create a UI screen stack
> as we now from Android (multiple Activities, Fragment concept later?,
> the Drawer and the Toolbar) and/or iOS (NavigationController and Tabbar).
>
> The idea is to compare these UI elements in "real world scenarios" where we
> want share the screen content between Android and iOS, but use a native look
> and feel on each platform.
>
> Another common issue with the RN Navigators is that we need an option to
> display modal dialogs without the NavigationBar (for example for a login)
> and want to persist the screen state to have a great developer experience. ;)

**UX focus:**

- Use a native look and feel when possible.
- Test options to show modal dialogs.

**DX focus:**

- Persist the navigation stack.

**Navigation components:**

* [Navigator](https://facebook.github.io/react-native/docs/navigator.html)
* [NavigatorIOS](https://facebook.github.io/react-native/docs/navigatorios.html)
* [ToolbarAndroid](https://facebook.github.io/react-native/docs/toolbarandroid.html)
* [DrawerLayoutAndroid](https://facebook.github.io/react-native/docs/drawerlayoutandroid.html)
* 3rd party [ex-navigator / ExNavigator](https://github.com/exponentjs/ex-navigator)
* 3rd party [react-native-side-menu / SideMenu](https://github.com/Kureev/react-native-side-menu)
* 3rd party [react-native-drawer / Drawer](https://github.com/rt2zz/react-native-drawer)

**Other used libraries:**

* [redux](https://github.com/rackt/redux)
* [react-redux](https://github.com/rackt/react-redux/tree/v3.1.0), 3.x branch
* [redux-persist](https://github.com/rt2zz/redux-persist)

### Prepare dev setup

This project requires [node](https://nodejs.org/) 4+ and
[react-native](https://facebook.github.io/react-native/) 0.14.

Use npm to install the local dependencies:

    npm install

### Run Android version

Requires that the Android SDK is installed and the env variable `ANDROID_HOME`
is defined correctly.

Start the server which allows the app to load the javascript bundle locally:

    npm start

Setup a tcp reverse proxy to allow devices and emulators to connect to the
local server:

    adb reverse tcp:8081 tcp:8081

Build the apk, deploy and start the application on a device or emulator:

    npm run start:android

### Run iOS version

Start the server which allows the app to load the javascript bundle locally:

    npm start

Start Xcode and run the application on a device or simulator:

    open ios/RNNavigationExamples.xcodeproj
    # cmd+r or project > run...
