import {
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParaList} from '../Navigation/RootParaList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseUrl} from '../utils/baseUrl';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import IconLock from 'react-native-vector-icons/Entypo';
import Loader from '../component/Loader';

const LoginScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootParaList>>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isEmailError, setIsEmailError] = useState<boolean>(false);
  const [isPasswordError, setIsPasswordError] = useState<boolean>(false);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValidateEmail = (email: string) => {
    return emailRegex.test(email);
  };

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const isValidatePassword = (password: string) => {
    return passwordRegex.test(password);
  };

  const handleLoginPress = () => {
    if (email.length === 0 && password.length === 0) {
      setIsEmailError(true);
      setIsPasswordError(true);
    } else if (!isValidateEmail(email)) {
      setIsEmailError(true);
    } else if (!isValidatePassword(password)) {
      setIsPasswordError(true);
    } else {
      setIsEmailError(false);
      setIsPasswordError(false);
      setIsloading(true);
      loginApi();
    }
  };

  const loginApi = async () => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const body = {email, password};
    const res = await fetch(`${baseUrl}api/auth/login`, {
      headers,
      method: 'POST',
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (data.status == false) {
      ToastAndroid.show(data.message, ToastAndroid.SHORT);
      setIsloading(false);
    } else {
      await AsyncStorage.setItem('User', JSON.stringify(data));
      navigation.replace('App', {screen: 'Home'});
      setIsloading(false);
    }
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (!isValidateEmail(text)) {
      setIsEmailError(true);
    } else {
      setIsEmailError(false);
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (!isValidatePassword(text)) {
      setIsPasswordError(true);
    } else {
      setIsPasswordError(false);
    }
  };

  const handleCreatePress = () => {
    navigation.navigate('Auth', {screen: 'Sign'});
  };

  const handleForgotPasswordPress = () => {
    ToastAndroid.show('Forget Password is Pressed', ToastAndroid.SHORT);
  };

  if (isLoading) {
    return <Loader visible={isLoading} />;
  } else {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>LOGIN</Text>
        </View>

        <View style={styles.textContainerStyle}>
          <Text style={styles.title}>Healthcare</Text>

          <View style={styles.inputMainContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.placeHolder}>Email</Text>
              <View style={styles.inputContainerText}>
                <Icon name="mail" size={20} color="#000" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={text => handleEmailChange(text)}
                />
              </View>
            </View>
            {isEmailError &&
              (email.length == 0 ? (
                <Text style={styles.errorStyle}>Enter Email</Text>
              ) : (
                <Text style={styles.errorStyle}>Enter valid Email</Text>
              ))}
          </View>

          <View style={[styles.inputMainContainer, {marginBottom: 15}]}>
            <View style={styles.inputContainer}>
              <Text style={styles.placeHolder}>Password</Text>
              <View style={styles.inputContainerText}>
                <IconLock
                  name="lock"
                  size={20}
                  color="#000"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={text => handlePasswordChange(text)}
                  secureTextEntry={!isPasswordVisible}
                />
                <TouchableOpacity
                  style={{alignSelf: 'center'}}
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                  {isPasswordVisible ? (
                    <Icon
                      name="eye"
                      size={20}
                      color="#000"
                      style={[
                        styles.icon,
                        {marginHorizontal: 5, marginRight: 0},
                      ]}
                    />
                  ) : (
                    <Icon
                      name="eye-off"
                      size={20}
                      color="#000"
                      style={[
                        styles.icon,
                        {marginHorizontal: 5, marginRight: 0},
                      ]}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            {isPasswordError &&
              (password.length == 0 ? (
                <Text style={styles.errorStyle}>Enter Password</Text>
              ) : (
                <Text
                  style={
                    styles.errorStyle
                  }>{`Minimum 8 character, 1 UpperCase, 1 LowerCase, 1 Number, 1 Special Character`}</Text>
              ))}
          </View>

          <TouchableOpacity
            onPress={handleForgotPasswordPress}
            style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>Forgot Password !</Text>
          </TouchableOpacity>

          <Text style={styles.registerText}>
            Don’t Have an Account :{' '}
            <Text style={styles.registerLink} onPress={handleCreatePress}>
              Click here to register
            </Text>
          </Text>
        </View>

        <View style={styles.loginButtonContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLoginPress}
            activeOpacity={0.8}>
            <Text style={styles.loginButtonText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerContainer: {
    flex: 1,
    marginTop: 10,
  },
  headerText: {
    fontWeight: '500',
    fontSize: 20,
  },
  textContainerStyle: {
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 50,
    fontWeight: '500',
    marginBottom: 80,
  },
  inputContainer: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    width: '100%',
    paddingHorizontal: 2,
    backgroundColor: '#fff',
    paddingVertical: 5,
  },
  inputMainContainer: {
    marginBottom: 45,
  },
  errorStyle: {
    marginTop: 3,
    color: 'red',
  },
  inputContainerText: {
    flexDirection: 'row',
    padding: 10,
  },
  placeHolder: {
    position: 'absolute',
    top: -10,
    left: 10,
    fontSize: 15,
    fontWeight: '500',
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },
  icon: {
    marginRight: 10,
    alignSelf: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  forgotPasswordText: {
    marginBottom: 35,
    color: '#04238E',
    fontWeight: '500',
    fontSize: 16,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
  },
  registerText: {
    marginTop: 15,
    marginBottom: 30,
    color: '#000',
    fontWeight: '500',
    fontSize: 14,
  },
  registerLink: {
    color: '#04238E',
  },
  loginButton: {
    backgroundColor: '#5391B4',
    paddingVertical: 20,
    paddingHorizontal: 60,
    borderRadius: 8,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
  loginButtonContainer: {
    flex: 2,
    width: '100%',
  },
});
