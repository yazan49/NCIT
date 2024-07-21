import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  Button,
  StyleSheet,
  Alert,
  Modal,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

export default function AdminScreen({navigation}) {
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [minMark, setMinMark] = useState('');
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, [isModalVisible]);

  useEffect(() => {
    loadSubjects();
  }, []);

  const loadSubjects = async () => {
    try {
      const existingData = await AsyncStorage.getItem('subjectData');
      const parsedData = existingData ? JSON.parse(existingData) : [];
      setSubjects(parsedData);
    } catch (error) {
      console.error('Error loading subjects:', error);
      Alert.alert('Error', 'Failed to load subjects. Please try again.');
    }
  };

  const getAllUsers = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const usersArray = await AsyncStorage.multiGet(keys);
      const allUsers = usersArray
        .map(([key, value]) => {
          try {
            const userData = JSON.parse(value);
            if (
              userData &&
              userData.username &&
              userData.email &&
              userData.password
            ) {
              return userData;
            } else {
              return null;
            }
          } catch (error) {
            console.error('Error parsing user data:', error);
            return null;
          }
        })
        .filter(user => user !== null);
      setUsers(allUsers);
    } catch (error) {
      console.error('Error retrieving users:', error);
    }
  };

  const handleActivateAccount = async email => {
    try {
      const userIndex = users.findIndex(user => user.email === email);
      if (userIndex !== -1) {
        const updatedUsers = [...users];
        updatedUsers[userIndex].isActive = true;
        setUsers(updatedUsers);
        await AsyncStorage.setItem(
          email,
          JSON.stringify(updatedUsers[userIndex]),
        );
      }
    } catch (error) {
      console.error('Error activating account:', error);
    }
  };

  const handleDeleteUser = async email => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete this user?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              const filteredUsers = users.filter(user => user.email !== email);
              setUsers(filteredUsers);
              await AsyncStorage.removeItem(email);
            } catch (error) {
              console.error('Error deleting user:', error);
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  const handleRegister = async () => {
    if (password !== repeatPassword) {
      Alert.alert('Error', "Passwords don't match");
      return;
    }
    if (username.length < 8) {
      Alert.alert('Error', 'Username must be at least 8 characters long');
      return;
    }

    const userData = {
      username,
      email,
      password,
      isActive: false,
      subjects: [], // Initialize subjects array
    };

    try {
      await AsyncStorage.setItem(email, JSON.stringify(userData));
      Alert.alert('User registered successfully');
      setIsModalVisible(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to save user data');
    }
  };

  const handleCreateUser = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const renderUserItem = ({item}) => (
    <View style={styles.userContainer}>
      <Button
        title="Edit User"
        onPress={() => navigation.navigate('Edit', {userData: item})}
        style={styles.editButton}
      />

      <Text>Email: {item.email}</Text>
      <Text>Username: {item.username}</Text>
      <Text>Active: {item.isActive ? 'Yes' : 'No'}</Text>
      <Text>Assigned Subjects:</Text>
      <FlatList
        data={item.subjects}
        renderItem={({item}) => (
          <Text>
            {item.name} - Marks: {item.marks}
          </Text>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.buttonContainer}>
        {!item.isActive && (
          <Button
            title="Activate Account"
            onPress={() => handleActivateAccount(item.email)}
          />
        )}
      </View>
      <Button
        title="Delete User"
        onPress={() => handleDeleteUser(item.email)}
        color={'red'}
        style={styles.deleteButton}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Create User"
          onPress={handleCreateUser}
          color={'black'}
        />
        <Button
          title="Create Subject"
          onPress={() => navigation.navigate('Subject')}
          color={'black'}
        />
      </View>

      <View style={styles.buttonContainer2}>
        <Button
          title="Assign Subject"
          onPress={() => navigation.navigate('Assign')}
          color={'black'}
        />
        <Button
          title="Set Marks"
          onPress={() => navigation.navigate('Mark')}
          color={'black'}
        />
      </View>
      <TouchableHighlight onPress={() => navigation.navigate('List')}>
        <Text style={styles.heading}>All Users:</Text>
      </TouchableHighlight>

      <FlatList
        data={users}
        renderItem={renderUserItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.flatList}
      />

      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeading}>Create User</Text>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
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
          <Button title="Cancel" onPress={handleCloseModal} color={'red'} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  editButton: {},
  deleteButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  label: {
    marginBottom: 5,
  },
  buttonContainer2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
});
