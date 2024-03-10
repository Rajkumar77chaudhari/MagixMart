import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {SafeAreaView} from 'react-native';
import Login from './src/screens/Login';
import BottomTab from './src/navigations/BottomTab';
import {Provider} from 'react-redux';
import {store} from './src/store/store';

interface AppProps {}

const stack = createNativeStackNavigator();

const App: React.FunctionComponent<AppProps> = props => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <stack.Navigator>
          <stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <stack.Screen
            name="Tab"
            component={BottomTab}
            options={{headerShown: false}}
          />
        </stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
