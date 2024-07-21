import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Text, Alert} from 'react-native';
import axios from 'axios';

export default function NodeScreen({navigation}) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');

  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [mobileError, setMobileError] = useState('');

  function validateName(value) {
    if (value.length < 4) {
      setUsernameError('Username must be at least 4 characters long');
    } else {
      setUsernameError('');
    }
    setUsername(value);
  }

  function validateEmail(value) {
    setEmail(value);
  }

  function validatePassword(value) {
    if (value.length < 5) {
      setPasswordError('Password must be at least 5 characters long');
    } else {
      setPasswordError('');
    }
    setPassword(value);
  }

  function validateMobile(value) {
    if (value.length < 6) {
      setMobileError('Mobile number must be at least 6 digits long');
    } else {
      setMobileError('');
    }
    setMobile(value);
  }

  function handleSubmit() {
    if (
      !username ||
      !email ||
      !password ||
      !mobile ||
      usernameError ||
      passwordError ||
      mobileError
    ) {
      Alert.alert('Error', 'Please correct the form errors before submitting');
      return;
    }

    const userData = {
      name: username,
      email,
      mobile,
      password,
    };
    axios
      .post('http://192.168.0.66:6001/register', userData)
      .then(response => {
        console.log('Response:', response.data);
        if (response.data && response.data.data === 'User Already Exist!!') {
          Alert.alert(
            'Error',
            'User already exists. Please try again with a different username or email.',
          );
        } else {
          Alert.alert('Success', 'Registration successful!');
          navigation.navigate('NodeLogin');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        Alert.alert('Error', 'An error occurred. Please try again.');
        // Handle error response
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={validateName}
      />
      {usernameError ? <Text style={styles.error}>{usernameError}</Text> : null}

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={validateEmail}
      />

      <Text style={styles.label}>Mobile</Text>
      <TextInput
        style={styles.input}
        keyboardType="phone-pad"
        value={mobile}
        onChangeText={validateMobile}
      />
      {mobileError ? <Text style={styles.error}>{mobileError}</Text> : null}

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={validatePassword}
      />
      {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}

      <Button title="Register" onPress={handleSubmit} />
      <Button
        title="Go For LogIn"
        onPress={() => navigation.navigate('NodeLogin')}
      />
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
  error: {
    color: 'red',
    marginBottom: 5,
  },
});
