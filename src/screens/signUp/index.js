import React, {useState} from 'react';
import {View, TextInput, Button, Alert, StyleSheet, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';

export default function SignupScreen({navigation}) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const usersArray = await AsyncStorage.multiGet(keys);
      const allUsers = usersArray.map(user => JSON.parse(user[1]));
      setUsers(allUsers);
      console.log(allUsers);
    } catch (error) {
      console.error('Error retrieving users:', error);
    }
  };

  const handleRegister = async () => {
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      Alert.alert('Error', 'An account with this email already exists');
      return;
    }

    if (password !== repeatPassword) {
      Alert.alert('Error', "Passwords don't match");
      return;
    }
    if (username.length < 8) {
      Alert.alert('Error', 'Username must be at least 8 characters long');
      return;
    }
    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters long');
      return;
    }
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!strongPasswordRegex.test(password)) {
      Alert.alert(
        'Error',
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&).',
      );
      return;
    }

    const userData = {
      username,
      email,
      password,
      isActive: false,
    };

    try {
      await AsyncStorage.setItem(email, JSON.stringify(userData));
      Alert.alert(
        'User registered successfully',
        'Wait For Admin To Activate Your Acc',
      );
      console.log('Registered User Data:', userData);
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', 'Failed to save user data');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Text style={styles.label}>Repeat Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={repeatPassword}
        onChangeText={setRepeatPassword}
      />
      <Button title="Register" onPress={handleRegister} />
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
