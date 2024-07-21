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
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AssignSubjectScreen({navigation}) {
  const [users, setUsers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    getAllUsers();
    loadSubjects();
  }, []);

  useEffect(() => {
    if (selectedSubject) {
      handleAssignSubject();
    }
  }, [selectedSubject]);

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

  const loadSubjects = async () => {
    try {
      const existingData = await AsyncStorage.getItem('subjectData');
      const parsedData = existingData ? JSON.parse(existingData) : [];
      setSubjects(parsedData);
      console.log('your data 00000', parsedData);
    } catch (error) {
      console.error('Error loading subjects:', error);
      Alert.alert('Error', 'Failed to load subjects. Please try again.');
    }
  };

  const handleAssignSubject = async () => {
    try {
      if (!selectedUser || !selectedSubject) {
        console.error('Selected user or subject is null');
        Alert.alert('Error', 'No user or subject selected. Please try again.');
        return;
      }

      const userData = await AsyncStorage.getItem(selectedUser.email);
      const parsedUserData = JSON.parse(userData);

      if (!parsedUserData.subjects) {
        parsedUserData.subjects = [];
      }

      // Check if the subject is already assigned to the user
      const isSubjectAssigned = parsedUserData.subjects.some(
        subject => subject.subjectName === selectedSubject.subjectName,
      );

      if (isSubjectAssigned) {
        console.error('Subject already assigned');
        Alert.alert(
          'Error',
          'Selected subject is already assigned to the user.',
        );
        return;
      }

      parsedUserData.subjects.push({
        subjectName: selectedSubject.subjectName,
        minMarks: selectedSubject.minMarks,
      });

      await AsyncStorage.setItem(
        selectedUser.email,
        JSON.stringify(parsedUserData),
      );

      setIsModalVisible(false);
      setSelectedSubject(null);

      Alert.alert('Success', 'Subject assigned successfully.');
    } catch (error) {
      console.error('Error assigning subject:', error);
      Alert.alert('Error', 'Failed to assign subject. Please try again.');
    }
  };

  const handleAssignSubjectButtonPress = user => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleSubjectSelection = subject => {
    console.log('Selected subject:', subject);
    setSelectedSubject(subject);
    setIsModalVisible(false);
    // handleAssignSubject();  // This is now triggered by the useEffect hook
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
            data={subjects}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => handleSubjectSelection(item)}>
                <Text>{item.subjectName}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
            style={styles.subjectList}
          />
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
});
