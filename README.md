# react-native navigation examples

> Compares different react-native navigators and drawers with common navigation patterns.

**UX focus:**

- When possible try to use a native look and feel.
- The project tests how to use the navigators NavBar elements as well as showing modal dialogs over it.

**DX focus:**

- This project will also use redux (later..) to (re)store the navigation stack when refreshing the app.

**Navigator components:**

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

## Prepare dev setup

This project requires [node](https://nodejs.org/) 4+ and
[react-native](https://facebook.github.io/react-native/) 0.14.

Use npm to install the local dependencies:

    npm install

## Run Android version

Requires that the Android SDK is installed and the env variable `ANDROID_HOME`
is defined correctly.

Start the server which allows the app to load the javascript bundle locally:

    npm start

Setup a tcp reverse proxy to allow devices and emulators to connect to the
local server:

    adb reverse tcp:8081 tcp:8081

Build the apk, deploy and start the application on a device or emulator:

    npm run start:android

## Run iOS version

Start the server which allows the app to load the javascript bundle locally:

    npm start

Start Xcode and run the application on a device or simulator:

    open ios/RNNavigationExamples.xcodeproj
    # cmd+r or project > run...
