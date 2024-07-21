import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Text, Alert} from 'react-native';
import axios from 'axios';

export default function NodeLoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function validateEmail(value) {
    setEmail(value);
    // You can add email validation logic here if needed
  }

  function validatePassword(value) {
    setPassword(value);
    // You can add password validation logic here if needed
  }

  function handleSubmit() {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter valid email and password');
      return;
    }

    const userData = {
      email,
      password,
    };

    axios
      .post('http://192.168.0.66:6001/login', userData)
      .then(response => {
        console.log('Response:', response.data);
        if (response.data && response.data.status === 'ok') {
          Alert.alert('Welcome');
          navigation.navigate('Figma'); // Navigate to the Figma screen
        } else {
          Alert.alert('Error', 'Invalid email or password. Please try again.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        Alert.alert('Error', 'An error occurred. Please try again.');
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={validateEmail}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={validatePassword}
      />

      <Button title="Login" onPress={handleSubmit} />
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
