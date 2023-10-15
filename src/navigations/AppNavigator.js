import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import ProductInfoScreen from '../screens/ProductInfoScreen';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import AddAddressScreen from '../screens/AddAddressScreen';
import AddressScreen from '../screens/AddressScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const AppNavigator = () => {
  function BottomTabs(){
    return(
      <Tab.Navigator>
        <Tab.Screen
          name='Home'
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarLabelStyle: {color: '#008E97'},
            headerShown: false,
            tabBarIcon: ({focused}) =>
            focused ? (
              <Entypo name="home" size={24} color="#008E97" />
            ):(
              <AntDesign name="home" size={24} color="black" />
            )
          }}  
        />
        <Tab.Screen
          name='Profile'
          component={HomeScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarLabelStyle: {color: '#008E97'},
            headerShown: false,
            tabBarIcon: ({focused}) =>
            focused ? (
              <Ionicons name="person" size={24} color="#008E97" />
            ):(
              <Ionicons name="person-outline" size={24} color="black" />
            )
          }}  
        />
        <Tab.Screen
          name='Cart'
          component={HomeScreen}
          options={{
            tabBarLabel: 'Cart',
            tabBarLabelStyle: {color: '#008E97'},
            headerShown: false,
            tabBarIcon: ({focused}) =>
            focused ? (
              <FontAwesome name="shopping-cart" size={24} color="#008E97" />
            ):(
              <AntDesign name="shoppingcart" size={24} color="black" />
            )
          }}  
        />
      </Tab.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Main" component={BottomTabs} options={{headerShown: false}}/>
        <Stack.Screen name="Info" component={ProductInfoScreen} options={{headerShown: false}}/>
        <Stack.Screen name="AddAddress" component={AddAddressScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Address" component={AddressScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator

const styles = StyleSheet.create({})