import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screen/HomeScreen';
import {App} from './RootParaList';
import CalenderScreen from '../Screen/CalenderScreen';
import UploadScreen from '../Screen/UploadScreen';
import {Image, StyleSheet} from 'react-native';
import {Images} from '../assets/Index';

const Tab = createBottomTabNavigator<App>();

export default function AppStack() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({focused}) => {
          let iconSource;

          if (route.name === 'Home') {
            iconSource = focused ? Images.HOMEACTIVE : Images.HOMEINACTIVE;
          } else if (route.name === 'Calender') {
            iconSource = focused
              ? Images.CALENDERACTIVE
              : Images.CALENDERINACTIVE;
          } else if (route.name === 'Document') {
            iconSource = focused
              ? Images.DOCUMENTACTIVE
              : Images.DOCUMENTINACTIVE;
          } else if (route.name === 'Upload') {
            iconSource = focused ? Images.UPLOADACTIVE : Images.UPLOADINACTIVE;
          }

          return (
            <Image
              source={iconSource}
              style={[
                styles.icon,
                {tintColor: focused ? '#47C2C4' : '#3B3B3B'},
              ]}
              resizeMode="contain"
            />
          );
        },
        tabBarStyle: {
          backgroundColor: '#D9D9D9',
          borderTopWidth: 1,
          height: 45,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Calender" component={CalenderScreen} />
      <Tab.Screen name="Document" component={CalenderScreen} />
      <Tab.Screen name="Upload" component={UploadScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
  },
});
