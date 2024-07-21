import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({route}) {
  const {email} = route.params;

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataJSON = await AsyncStorage.getItem(email);
        if (userDataJSON) {
          const userData = JSON.parse(userDataJSON);
          setUserData(userData);
        } else {
          console.log('User data not found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [email]);

  return (
    <View style={styles.container}>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.header}>Username</Text>
          <Text style={styles.header}>Email</Text>
        </View>
        <View style={styles.row}>
          <Text>{userData ? userData.username : '-'}</Text>
          <Text>{userData ? userData.email : '-'}</Text>
        </View>
      </View>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.header}> Name</Text>
          <Text style={styles.header}>Pass Mark</Text>
          <Text style={styles.header}>mark</Text>
        </View>
        {userData &&
          userData.subjects.map((subject, index) => (
            <View style={styles.row} key={index}>
              <Text>{subject.subjectName}</Text>
              <Text>{subject.minMarks}</Text>
              <Text>{subject.markObtained ? subject.markObtained : '-'}</Text>
            </View>
          ))}
      </View>
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
