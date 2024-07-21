import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

export default function WelcomeScreen({navigation}) {
  const handleNavigation = screen => {
    navigation.navigate(screen);
  };

  return (
    <ImageBackground
      blurRadius={3}
      source={require('../../assets/ncit.png')}
      style={styles.imageBackground}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.replace('FireBase')}
          style={[styles.button, styles.loginButton]}>
          <Text style={styles.buttonText}>FireBase</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.replace('NodeS')}
          style={[styles.button, styles.loginButton]}>
          <Text style={styles.buttonText}>node</Text>
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => handleNavigation('Signup')}
            style={[styles.button, styles.signupButton]}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleNavigation('Login')}
            style={[styles.button, styles.loginButton]}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => navigation.replace('Figma')}
          style={[styles.button, styles.loginButton]}>
          <Text style={styles.buttonText}>Figma</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 70,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  signupButton: {
    backgroundColor: '#999',
  },
  loginButton: {
    backgroundColor: '#333',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    paddingHorizontal: 15,
  },
});
