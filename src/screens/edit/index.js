import React, {useState} from 'react';
import {Text, View, TextInput, Button, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditUserScreen({route, navigation}) {
  const {userData} = route.params;
  const [username, setUsername] = useState(userData.username);
  const [email, setEmail] = useState(userData.email);
  const [password, setPassword] = useState(userData.password);

  const handleSaveChanges = async () => {
    const updatedUserData = {...userData, username, email, password};
    try {
      await AsyncStorage.setItem(email, JSON.stringify(updatedUserData));
      Alert.alert('Success', 'Changes saved successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to save changes');
    }
  };

  const handleDeleteUser = () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete this account?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'Yes', onPress: deleteUserConfirmed},
      ],
      {cancelable: false},
    );
  };

  const deleteUserConfirmed = async () => {
    try {
      await AsyncStorage.removeItem(email);
      Alert.alert('Success', 'Account deleted successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to delete account');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Edit User Data</Text>
      <Text style={styles.bold}>Email: {email}</Text>
      <Text style={styles.bold}>Username:</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <Text style={styles.bold}>Password:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Save Changes" onPress={handleSaveChanges} />
      <Button title="Delete Account" onPress={handleDeleteUser} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
