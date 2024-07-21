import React, {useState, useEffect} from 'react';
import {Text, View, TextInput, Button, Alert, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SubjectScreen() {
  const [subjectName, setSubjectName] = useState('');
  const [minMarks, setMinMarks] = useState('');
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    async function loadSubjects() {
      try {
        const existingData = await AsyncStorage.getItem('subjectData');
        const parsedData = existingData ? JSON.parse(existingData) : [];
        setSubjects(parsedData);
      } catch (error) {
        console.error('Error loading subjects:', error);
        Alert.alert('Error', 'Failed to load subjects. Please try again.');
      }
    }

    loadSubjects();
  }, []);

  const saveSubjectData = async () => {
    try {
      if (subjectName === '' || minMarks === '') {
        Alert.alert('Error', 'Please enter subject name and minimum marks.');
        return;
      }

      const newSubjectData = {subjectName, minMarks};

      setSubjects([...subjects, newSubjectData]);

      // Get existing data or initialize an empty array if no data exists
      const existingData = await AsyncStorage.getItem('subjectData');
      const parsedData = existingData ? JSON.parse(existingData) : [];

      parsedData.push(newSubjectData);

      await AsyncStorage.setItem('subjectData', JSON.stringify(parsedData));

      // Clear input fields
      setSubjectName('');
      setMinMarks('');

      Alert.alert('Success', 'Subject data saved successfully.');
    } catch (error) {
      console.error('Error saving subject data:', error);
      Alert.alert('Error', 'Failed to save subject data. Please try again.');
    }
  };

  return (
    <View style={{padding: 20}}>
      <Text style={{fontSize: 24, marginBottom: 20, fontWeight: 'bold'}}>
        Add Subject
      </Text>

      <Text style={{marginBottom: 5, fontWeight: '600'}}>Subject Name</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
          paddingHorizontal: 10,
        }}
        placeholder="Subject Name"
        value={subjectName}
        onChangeText={text => setSubjectName(text)}
      />
      <Text style={{marginTop: 10, marginBottom: 5, fontWeight: '600'}}>
        Minimum Mark
      </Text>

      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
          paddingHorizontal: 10,
        }}
        placeholder="Minimum Marks"
        value={minMarks}
        onChangeText={text => setMinMarks(text)}
        keyboardType="numeric"
      />
      <Button title="Save Subject" onPress={saveSubjectData} />

      <Text style={{fontSize: 24, marginTop: 20, fontWeight: 'bold'}}>
        Subjects
      </Text>
      <FlatList
        data={subjects}
        renderItem={({item}) => (
          <View style={{marginTop: 10}}>
            <Text style={{fontWeight: '600', fontSize: 18}}>
              Subject: {item.subjectName}
            </Text>
            <Text style={{marginTop: 4}}>Minimum Marks: {item.minMarks}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
