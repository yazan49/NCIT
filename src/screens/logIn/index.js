import React, {useState} from 'react';
import {View, TextInput, Button, Alert, StyleSheet, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const adminEmail = 'Admin';
  const adminPass = 'admin00';

  const handleLogin = async () => {
    try {
      if (email === adminEmail && password === adminPass) {
        navigation.navigate('Admin');
        return;
      }

      const userData = await AsyncStorage.getItem(email);
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        if (parsedUserData.password === password) {
          if (!parsedUserData.isActive) {
            Alert.alert(
              'Inactive Account',
              'This account is inactive, please wait for the administrator to activate your account',
            );
            return;
          }
          navigation.navigate('Home', {email: email});
        } else {
          Alert.alert('Error', 'Invalid password');
        }
      } else {
        Alert.alert('Error', 'User not found');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch user data');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.label}>Password</Text>

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  label: {
    marginBottom: 5,
  },
});
