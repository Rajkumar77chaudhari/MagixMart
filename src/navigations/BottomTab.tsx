import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as React from 'react';
import Home from '../screens/Home';
import Cart from '../screens/Cart';
import Profile from '../screens/Profile';
import Icon from 'react-native-vector-icons/AntDesign';
import {colors} from '../utils/defaultStyles';

interface BottomTabProps {}

const tab = createBottomTabNavigator();

const BottomTab: React.FunctionComponent<BottomTabProps> = props => {
  return (
    <tab.Navigator>
      <tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="home"
              color={focused ? colors.yellow : colors.black}
              size={size}
            />
          ),
          tabBarActiveTintColor: colors.yellow,
        }}
      />
      <tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="shoppingcart"
              color={focused ? colors.yellow : colors.black}
              size={size}
            />
          ),
          tabBarActiveTintColor: colors.yellow,
        }}
      />
      <tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarActiveTintColor: colors.yellow,
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="user"
              color={focused ? colors.yellow : colors.black}
              size={size}
            />
          ),
        }}
      />
    </tab.Navigator>
  );
};

export default BottomTab;
