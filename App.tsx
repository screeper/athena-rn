import { ApolloProvider } from '@apollo/client';
import {
  OpenSans_400Regular,
  OpenSans_700Bold,
} from '@expo-google-fonts/open-sans';
import { Ionicons } from '@expo/vector-icons';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import React from 'react';
import { LogBox, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import client from './apollo';
import colors from './constants/colors';
import fonts from './constants/fonts';
import isAndroid from './constants/isAndroid';
import LocationDetailsManageStock from './screens/LocationDetailsManageStock';
import LocationDetailsOverview from './screens/LocationDetailsOverview';
import Move from './screens/Move';
import OverviewByItem from './screens/OverviewByItem';
import OverviewByLocation from './screens/OverviewByLocation';
import OverviewDetails from './screens/OverviewDetails';
import Scanner from './screens/Scanner';
import Supply from './screens/Supply';
import store from './store';

if (__DEV__) {
  LogBox.ignoreLogs(['Overwriting fontFamily style attribute preprocessor']);
}

const getTabBarIcon =
  ({ name }: { name: any }) =>
  ({ color }: { color: string }) =>
    <Ionicons name={name} size={23} color={color} />;

const App = () => {
  const [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_700Bold,
    'Avenir-Black': require('./assets/fonts/Avenir-Black.otf'),
    'Avenir-Book': require('./assets/fonts/Avenir-Book.otf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const defaultScreenOptions: BottomTabNavigationOptions = {
    headerStyle: {
      backgroundColor: isAndroid ? colors.primary : '',
    },
    headerTintColor: isAndroid ? 'white' : colors.primary,
    headerShadowVisible: true,
    headerTitleStyle: {
      fontFamily: fonts.defaultFontFamilyBold,
    },
    tabBarActiveTintColor: colors.primary,
  };
  const defaultScreenOptionsTab: MaterialTopTabNavigationOptions = {
    tabBarStyle: {
      backgroundColor: isAndroid ? colors.primary : 'white',
    },
    tabBarInactiveTintColor: isAndroid ? colors.primaryLight : colors.primary,
    tabBarLabelStyle: {
      fontFamily: fonts.defaultFontFamilyBold,
    },
    tabBarIndicatorStyle: { backgroundColor: colors.primary },
    tabBarActiveTintColor: isAndroid ? 'white' : colors.primary,
  };
  const defaultScreenOptionsStack: NativeStackNavigationOptions = {
    headerStyle: {
      backgroundColor: isAndroid ? colors.primary : '',
    },
    headerTintColor: isAndroid ? 'white' : colors.primary,
    headerShadowVisible: true,
    headerTitleStyle: {
      fontFamily: fonts.defaultFontFamilyBold,
    },
  };

  const OverviewTab = createMaterialTopTabNavigator();
  const OverviewTabs = () => {
    return (
      <OverviewTab.Navigator screenOptions={defaultScreenOptionsTab}>
        <OverviewTab.Screen name="By Stuff" component={OverviewByItem} />
        <OverviewTab.Screen name="By Location" component={OverviewByLocation} />
      </OverviewTab.Navigator>
    );
  };

  const LocationTab = createMaterialTopTabNavigator();
  const LocationTabs = (props: any) => {
    return (
      <LocationTab.Navigator screenOptions={defaultScreenOptionsTab}>
        <LocationTab.Screen
          initialParams={props.route.params}
          name="Location Details Overview"
          component={LocationDetailsOverview}
          options={{
            title: 'Overview',
          }}
        />
        <LocationTab.Screen
          initialParams={props.route.params}
          name="Location Manage Stock"
          component={LocationDetailsManageStock}
          options={{
            title: 'Manage Stock',
          }}
        />
      </LocationTab.Navigator>
    );
  };

  const OverviewStack = createNativeStackNavigator();
  const OverviewStackNavigator = () => (
    <OverviewStack.Navigator screenOptions={defaultScreenOptionsStack}>
      <OverviewStack.Screen name="Overview" component={OverviewTabs} />
      <OverviewStack.Screen
        name="Overview Details"
        component={OverviewDetails}
      />
      <OverviewStack.Screen name="Location Tabs" component={LocationTabs} />
    </OverviewStack.Navigator>
  );

  const AppTabs = createBottomTabNavigator();
  const AppTabNavigator = () => (
    <AppTabs.Navigator
      screenOptions={defaultScreenOptions}
      initialRouteName="Overview"
    >
      <AppTabs.Screen
        name="Overview Stack"
        component={OverviewStackNavigator}
        options={{
          tabBarIcon: getTabBarIcon({ name: 'ios-list-outline' }),
          headerShown: false,
          headerTitle: 'Overview',
        }}
      />
      <AppTabs.Screen
        name="Move"
        component={Move}
        options={{
          tabBarIcon: getTabBarIcon({ name: 'ios-log-out-outline' }),
        }}
      />
      <AppTabs.Screen
        name="Supply"
        component={Supply}
        options={{
          tabBarIcon: getTabBarIcon({ name: 'ios-log-in-outline' }),
        }}
      />
      <AppTabs.Screen
        name="Scanner"
        component={Scanner}
        options={{
          tabBarIcon: getTabBarIcon({ name: 'ios-qr-code-outline' }),
        }}
      />
    </AppTabs.Navigator>
  );

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <AppTabNavigator />
        </NavigationContainer>
      </ApolloProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
