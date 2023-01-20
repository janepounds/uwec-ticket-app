import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import DrawerNavigation from './navigation/DrawerNavigation';
import {Provider} from 'react-redux';
import {store} from './redux/store';


 function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <DrawerNavigation />
    </NavigationContainer>
    </Provider>
  );
}


export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
