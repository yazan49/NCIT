import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const [users, setUsers] = useState([]);

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

  return (
    <View style={styles.container}>
      {users.map(user => (
        <View key={user.email}>
          <Text style={styles.header}>Username: {user.username}</Text>
          <Text style={styles.header}>Email: {user.email}</Text>
          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.header}>Subject Name</Text>
              <Text style={styles.header}>Pass Mark</Text>
              <Text style={styles.header}>Mark Obtained</Text>
            </View>
            {user.subjects.map((subject, index) => (
              <View style={styles.row} key={index}>
                <Text>{subject.subjectName}</Text>
                <Text>{subject.minMarks}</Text>
                <Text>{subject.markObtained ? subject.markObtained : '-'}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    width: Dimensions.get('window').width - 40, // Full width of screen minus padding
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  header: {
    fontWeight: 'bold',
  },
});
