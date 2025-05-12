import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'; // Import Bottom Tab Navigator
import Login from './Components/Auth/Login';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet} from 'react-native';
import HomePage from './Components/Pages/HomePage';
import Profile from './Components/Pages/Profile';
import Offers from './Components/Pages/Offers';
import Coupon from './Components/Pages/Coupon';
import EditProfileScreen from './Components/Pages/EditProfileScreen';
import AddToCart from './Components/Pages/AddToCart';
import Checkout from './Components/Pages/Checkout';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator
const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'Offers') {
            return (
              <MaterialCommunityIcons
                name={focused ? 'ticket-percent' : 'ticket-percent-outline'}
                size={size}
                color={color}
              />
            );
          } else {
            // Use Ionicons for other tabs
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        },
        tabBarLabel: '', // Hide the label (text)
        tabBarActiveTintColor: '#2A9D8F', // Active icon color
      })}>
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Offers" component={Offers} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomePage"
          component={BottomTabs} // Navigate to BottomTabs after successful login
          options={{headerShown: false}} // Hide the header
        />
        <Stack.Screen
          name="Cart"
          component={AddToCart}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CouponsPage"
          component={Coupon} // Navigate to BottomTabs after successful login
          options={{headerShown: false}} // Hide the header
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={{headerShown: false}} // Hide the header
        />
        <Stack.Screen
          name="Checkout"
          component={Checkout}
          options={{headerShown: false}} // Hide the header
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  tabBar: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: 60,
    paddingTop: 10,
    backgroundColor: '#000',
  },
});
