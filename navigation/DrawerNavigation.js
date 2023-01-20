import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Notifications from "../screens/Notifications";
import { MainNavigationStack } from './MainNavigationStack';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator>
    <Drawer.Screen name="UWEC TICKET APP" component={MainNavigationStack} 
    options={{ drawerLabel: 'Home' }}
    />
    <Drawer.Screen name="History" component={Notifications} />
  </Drawer.Navigator>
  );
}

export default DrawerNavigation;