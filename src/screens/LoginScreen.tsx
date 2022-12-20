/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useEffect } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Background } from '../components/Background';
import { WhiteLogo } from '../components/WhiteLogo';
import { useForm } from '../hooks/useForm';
import { loginStyles } from '../themes/loginTheme';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any, any> {}

export const LoginScreen = ({ navigation }: Props) => {
  const { signIn, removeError, errorMessage } = useContext(AuthContext);

  const { email, password, onChange } = useForm({ email: '', password: '' });

  const onLogin = () => {
    Keyboard.dismiss();
    signIn({ correo: email, password });
  };

  useEffect(() => {
    if (!errorMessage.length) return;
    Alert.alert('Incorrect Login', errorMessage, [
      { text: 'Ok', onPress: removeError },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMessage]);

  return (
    <>
      <Background />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={loginStyles.formContainer}>
          <WhiteLogo />
          <Text style={loginStyles.title}>Login</Text>
          <Text style={loginStyles.label}>Email:</Text>
          <TextInput
            placeholder="Your email"
            placeholderTextColor={'rgba(255,255,255,0.4)'}
            keyboardType="email-address"
            underlineColorAndroid={'white'}
            style={[
              loginStyles.inputField,
              Platform.OS === 'ios' && loginStyles.inputFieldIOS,
            ]}
            selectionColor={'white'}
            onChangeText={value => onChange(value, 'email')}
            value={email}
            onSubmitEditing={onLogin}
            autoCapitalize={'none'}
            autoCorrect={false}
          />
          <Text style={loginStyles.label}>Password:</Text>
          <TextInput
            placeholder="Your password"
            secureTextEntry
            placeholderTextColor={'rgba(255,255,255,0.4)'}
            underlineColorAndroid={'white'}
            style={[
              loginStyles.inputField,
              Platform.OS === 'ios' && loginStyles.inputFieldIOS,
            ]}
            selectionColor={'white'}
            onChangeText={value => onChange(value, 'password')}
            value={password}
            onSubmitEditing={onLogin}
            autoCapitalize={'none'}
            autoCorrect={false}
          />
          <View style={loginStyles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={loginStyles.button}
              onPress={onLogin}>
              <Text style={loginStyles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={loginStyles.newUserContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.replace('RegisterScreen')}>
              <Text style={loginStyles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
