import { Ionicons } from '@expo/vector-icons';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import React from 'react';
import 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import colors from '../constants/colors';
import fonts from '../constants/fonts';
import isAndroid from '../constants/isAndroid';
import { PermissionEnum } from '../models/PermissionEnum';
import ItemDetails from '../screens/ItemDetails';
import ItemOverview from '../screens/ItemOverview';
import LocationDetails from '../screens/LocationDetails';
import LocationOverview from '../screens/LocationOverview';
import Move from '../screens/Move';
import Scanner from '../screens/Scanner';
import StockItemDetails from '../screens/StockItemDetails';
import Supply from '../screens/Supply';
import { RootState } from '../store';

const Navigation = () => {
  const getTabBarIcon =
    ({ name }: { name: any }) =>
    ({ color }: { color: string }) =>
      <Ionicons name={name} size={23} color={color} />;

  const currentPermission = useSelector(
    (state: RootState) => state.global.currentPermission
  );

  const isEventAdmin = () => currentPermission === PermissionEnum.EventAdmin;
  const isLocationUser = () =>
    currentPermission === PermissionEnum.LocationUser;

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
  const OverviewTabs: React.FC = () => {
    return (
      <OverviewTab.Navigator screenOptions={defaultScreenOptionsTab}>
        <OverviewTab.Screen
          name="By Item"
          component={ItemOverview}
          options={{
            lazy: true,
          }}
        />
        <OverviewTab.Screen
          name="By Location"
          component={LocationOverview}
          options={{
            lazy: true,
          }}
        />
      </OverviewTab.Navigator>
    );
  };

  const OverviewStack = createNativeStackNavigator();
  const OverviewStackNavigator = () => (
    <OverviewStack.Navigator
      screenOptions={defaultScreenOptionsStack}
      defaultScreenOptions={{}}
    >
      {isEventAdmin() ? (
        <OverviewStack.Screen name="Overview" component={OverviewTabs} />
      ) : null}
      <OverviewStack.Screen
        name="Stock Item Details"
        component={StockItemDetails}
      />
      <OverviewStack.Screen
        name="Location Overview"
        component={LocationDetails}
        options={(props) => ({
          // @ts-ignore
          title: props.route.params?.location?.name,
        })}
      />
      {isEventAdmin() ? (
        <OverviewStack.Screen
          name="Item Overview"
          component={ItemDetails}
          options={(props) => ({
            // @ts-ignorew
            title: props.route.params?.item?.name,
          })}
        />
      ) : null}
    </OverviewStack.Navigator>
  );

  const AppTabs = createBottomTabNavigator();
  const AppTabNavigator = () => (
    <AppTabs.Navigator
      screenOptions={defaultScreenOptions}
      initialRouteName="Overview"
    >
      {isEventAdmin() || isLocationUser() ? (
        <AppTabs.Screen
          name="Overview Stack"
          component={OverviewStackNavigator}
          options={{
            tabBarIcon: getTabBarIcon({ name: 'ios-list-outline' }),
            headerShown: false,
            headerTitle: 'Overview',
            tabBarLabel: 'Overview',
            lazy: true,
            unmountOnBlur: true,
          }}
        />
      ) : null}
      {isEventAdmin() ? (
        <AppTabs.Screen
          name="Move"
          component={Move}
          options={{
            tabBarIcon: getTabBarIcon({ name: 'ios-log-out-outline' }),
            lazy: true,
            unmountOnBlur: true,
          }}
        />
      ) : null}
      {isEventAdmin() ? (
        <AppTabs.Screen
          name="Supply"
          component={Supply}
          options={{
            tabBarIcon: getTabBarIcon({ name: 'ios-log-in-outline' }),
            lazy: true,
            unmountOnBlur: true,
          }}
        />
      ) : null}
      <AppTabs.Screen
        name="Scanner"
        component={Scanner}
        options={{
          tabBarIcon: getTabBarIcon({ name: 'ios-qr-code-outline' }),
          lazy: true,
          unmountOnBlur: true,
        }}
      />
    </AppTabs.Navigator>
  );

  return (
    <>
      <AppTabNavigator />
    </>
  );
};
export default Navigation;
