import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  Button,
  StyleSheet,
  Alert,
  Modal,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MarkScreen({navigation}) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [assignedSubjects, setAssignedSubjects] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [mark, setMark] = useState('');

  useEffect(() => {
    getAllUsers();
  }, []);

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

  const handleAssignSubjectButtonPress = user => {
    setSelectedUser(user);
    loadAssignedSubjects(user.email);
    setIsModalVisible(true);
  };

  const loadAssignedSubjects = async email => {
    try {
      const userData = await AsyncStorage.getItem(email);
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        if (parsedUserData.subjects) {
          setAssignedSubjects(parsedUserData.subjects);
        } else {
          setAssignedSubjects([]);
        }
      } else {
        console.error('User data not found');
        setAssignedSubjects([]);
      }
    } catch (error) {
      console.error('Error loading assigned subjects:', error);
      Alert.alert(
        'Error',
        'Failed to load assigned subjects. Please try again.',
      );
    }
  };

  const handleSubjectSelection = subject => {
    setSelectedSubject(subject);
  };

  const handleAssignMark = async () => {
    try {
      if (!selectedUser || !selectedSubject || !mark) {
        console.error('Selected user, subject, or mark is null');
        Alert.alert(
          'Error',
          'Please select a user, a subject, and enter a mark.',
        );
        return;
      }

      const userData = await AsyncStorage.getItem(selectedUser.email);
      if (userData) {
        const parsedUserData = JSON.parse(userData);

        const subjectToUpdate = parsedUserData.subjects.find(
          sub => sub.subjectName === selectedSubject.subjectName,
        );
        if (subjectToUpdate) {
          subjectToUpdate.markObtained = mark;
          await AsyncStorage.setItem(
            selectedUser.email,
            JSON.stringify(parsedUserData),
          );
          setMark('');
          setSelectedSubject(null);
          Alert.alert('Success', 'Mark added successfully.');
        } else {
          console.error('Selected subject not found in assigned subjects');
          Alert.alert(
            'Error',
            'Selected subject not found in assigned subjects.',
          );
        }
      } else {
        console.error('User data not found');
        Alert.alert('Error', 'User data not found. Please try again.');
      }
    } catch (error) {
      console.error('Error adding mark:', error);
      Alert.alert('Error', 'Failed to add mark. Please try again.');
    }
  };

  const renderUserItem = ({item}) => (
    <View style={styles.userContainer}>
      <TouchableOpacity onPress={() => handleAssignSubjectButtonPress(item)}>
        <Text>Email: {item.email}</Text>
        <Text>Username: {item.username}</Text>
        <Text>Active: {item.isActive ? 'Yes' : 'No'}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderAssignedSubjects = ({item}) => (
    <TouchableOpacity onPress={() => handleSubjectSelection(item)}>
      <Text>{item.subjectName}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>All Users</Text>
      <FlatList
        data={users}
        renderItem={renderUserItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.flatList}
      />
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeading}>Select Subject</Text>
          <FlatList
            data={assignedSubjects}
            renderItem={renderAssignedSubjects}
            keyExtractor={(item, index) => index.toString()}
            style={styles.subjectList}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Mark"
            onChangeText={text => setMark(text)}
            value={mark}
            keyboardType="numeric"
          />
          <Button title="Assign Mark" onPress={handleAssignMark} />
          <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
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
  subjectList: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
