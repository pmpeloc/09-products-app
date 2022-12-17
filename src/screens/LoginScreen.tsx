import React from 'react';
import { Text, TextInput } from 'react-native';

import { Background } from '../components/Background';
import { WhiteLogo } from '../components/WhiteLogo';
import { loginStyles } from '../themes/loginTheme';

export const LoginScreen = () => {
  return (
    <>
      <Background />
      <WhiteLogo />
      <Text style={loginStyles.title}>Login</Text>
      <Text style={loginStyles.label}>Email:</Text>
      <TextInput
        placeholder="Your email"
        placeholderTextColor={'rgba(255,255,255,0.4)'}
        keyboardType="email-address"
      />
    </>
  );
};
