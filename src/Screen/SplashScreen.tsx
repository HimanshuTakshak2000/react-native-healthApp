import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {useNavigation} from '@react-navigation/native';
import {RootParaList} from '../Navigation/RootParaList';
import {StackNavigationProp} from '@react-navigation/stack';
import {Images} from '../assets/Index';

const SplashScreen = () => {
  const {isUserLogined} = useSelector(
    (state: RootState) => state.userLoginReducer,
  );
  const navigation = useNavigation<StackNavigationProp<RootParaList>>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      isUserLogined
        ? navigation.replace('App', {screen: 'Home'})
        : navigation.replace('Auth', {screen: 'Login'});
    }, 3000);

    return () => clearTimeout(timeout);
  }, [isUserLogined]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.splashImageStyle}
        resizeMode="center"
        source={Images.SPLASHIMAGE}
      />
      <Text style={styles.appTitle}>Healthcare</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  appTitle: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: '500',
    position: 'absolute',
  },
  splashImageStyle: {
    height: 270,
    width: 270,
  },
});
