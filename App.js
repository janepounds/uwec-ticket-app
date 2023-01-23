import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import MainNavigationStack from './navigation/MainNavigationStack';
import {Provider} from 'react-redux';
import {store} from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainNavigationStack />
      </NavigationContainer>
    </Provider>
  );
}


export default App;