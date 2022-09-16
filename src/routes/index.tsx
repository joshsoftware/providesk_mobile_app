import React from 'react';
import 'react-native-gesture-handler';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {
  NavigationContainer,
  DefaultTheme,
  Theme,
} from '@react-navigation/native';
import * as Navigator from './root-navigator';
import {Platform, UIManager} from 'react-native';
import * as colors from '@res/colors';
import Splash from '../screens/splash';
import Home from '../screens/home';
import Create from '@screens/create';

export const PROVIDESK_THEME: Theme = {
  ...DefaultTheme,
  colors: {
    primary: colors.PRIMARY,
    background: colors.BG_LIGHT,
    text: colors.PRIMARY_TEXT,
    card: colors.BG_LIGHT,
    border: colors.PRIMARY,
    notification: colors.BG_LIGHT,
  },
  dark: false,
};

const Stack = createStackNavigator();

const defaultStackOptions: StackNavigationOptions = {
  headerTransparent: true,
  headerShown: false,
};

const ShowHeader: StackNavigationOptions = {
  headerTintColor: colors.PRIMARY,
  headerTitleStyle: {
    fontFamily: 'Montserrat',
    color: colors.BLACK,
    fontWeight: 'bold',
  },
};

const Routes = () => {
  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  return (
    <NavigationContainer ref={Navigator.navigationRef} theme={PROVIDESK_THEME}>
      <Stack.Navigator screenOptions={ShowHeader} initialRouteName="splash">
        <Stack.Screen
          name="splash"
          component={Splash}
          options={defaultStackOptions}
        />
        <Stack.Screen
          name="home"
          component={Home}
          options={{...ShowHeader, title: 'Providesk'}}
        />
        <Stack.Screen
          name="create"
          component={Create}
          options={{...ShowHeader, title: 'Raise Ticket'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const RootNavigator = Navigator;
export default Routes;
