/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useEffect } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { useForm } from '../hooks/useForm';
import { WhiteLogo } from '../components/WhiteLogo';
import { loginStyles } from '../themes/loginTheme';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any, any> {}

export const RegisterScreen = ({ navigation }: Props) => {
  const { signUp, removeError, errorMessage } = useContext(AuthContext);

  const { name, email, password, onChange } = useForm({
    name: '',
    email: '',
    password: '',
  });

  const onRegister = () => {
    Keyboard.dismiss();
    signUp({ nombre: name, correo: email, password });
  };

  useEffect(() => {
    if (!errorMessage.length) return;
    Alert.alert('Incorrect Register', errorMessage, [
      { text: 'Ok', onPress: removeError },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMessage]);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: '#5856d6' }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={loginStyles.formContainer}>
          <WhiteLogo />
          <Text style={loginStyles.title}>Register</Text>
          <Text style={loginStyles.label}>Name:</Text>
          <TextInput
            placeholder="Your name"
            placeholderTextColor={'rgba(255,255,255,0.4)'}
            underlineColorAndroid={'white'}
            style={[
              loginStyles.inputField,
              Platform.OS === 'ios' && loginStyles.inputFieldIOS,
            ]}
            selectionColor={'white'}
            onChangeText={value => onChange(value, 'name')}
            value={name}
            onSubmitEditing={onRegister}
            autoCapitalize={'words'}
            autoCorrect={false}
          />
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
            onSubmitEditing={onRegister}
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
            onSubmitEditing={onRegister}
            autoCapitalize={'none'}
            autoCorrect={false}
          />
          <View style={loginStyles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={loginStyles.button}
              onPress={onRegister}>
              <Text style={loginStyles.buttonText}>Create account</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => navigation.replace('LoginScreen')}
            activeOpacity={0.8}
            style={loginStyles.buttonReturn}>
            <Text style={loginStyles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
