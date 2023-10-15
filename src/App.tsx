import * as React from 'react';
import { View, Text } from 'react-native';
import AppNavigator from './navigations/AppNavigator';
import {Provider} from 'react-redux'
import Store from './redux/Store';
import {ModalPortal} from 'react-native-modals';
import {UserContext} from './UserContext';

function App() {
  return (
    <View style={{flex: 1}}>
      <Provider store={Store}>
        <UserContext>
          <AppNavigator/>
          <ModalPortal/>
        </UserContext>
      </Provider>
    </View>
  );
}

export default App;