import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import Profile from '../screens/Profile';
import HomeScreen from '../screens/HomeScreen';
import Settings from "../screens/Settings";
import VerifyTicket from '../screens/VerifyTicket';

const Stack = createNativeStackNavigator();
const MainNavigationStack = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name='HomeScreen' component={HomeScreen}/>
      <Stack.Screen name="VerifyTicket" component={VerifyTicket} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Test" component={Settings} />
    </Stack.Navigator>
  );
}

export default MainNavigationStack;