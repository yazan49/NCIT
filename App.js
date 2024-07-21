import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './src/screens/splash';
import LogInScreen from './src/screens/logIn';
import SignUpScreen from './src/screens/signUp';
import WelcomeScreen from './src/screens/welcome';
import AdminScreen from './src/screens/admin';
import EditUserScreen from './src/screens/edit';
import SubjectScreen from './src/screens/subject';
import AssignSubjectScreen from './src/screens/assign';
import HomeScreen from './src/screens/home';
import MarkScreen from './src/screens/mark';
import FigmaScreen from './src/screens/figma';
import ViewHomeScreen from './src/viewHome';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import NodeScreen from './src/screens/node';
import ListScreen from './src/screens/list';
import NodeLoginScreen from './src/screens/nodeLogin';
import FireBaseScreen from './src/screens/fireBase';
import messaging from '@react-native-firebase/messaging';

const Stack = createStackNavigator();

export default function App() {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  const getToken = async () => {
    const token = await messaging().getToken();
    console.log('token : ', token);
  };

  useEffect(() => {
    requestUserPermission();
    getToken();
  }, []);
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="Login"
            component={LogInScreen}
            options={{
              headerShown: true,
              headerBackTitle: 'back',
              title: '',
              headerBackVisible: true,
            }}
          />
          <Stack.Screen
            name="Admin"
            component={AdminScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Edit"
            component={EditUserScreen}
            options={{
              headerShown: true,
              headerBackTitle: 'back',
              title: '',
              headerBackVisible: true,
            }}
          />
          <Stack.Screen
            name="Subject"
            component={SubjectScreen}
            options={{
              headerShown: true,
              headerBackTitle: 'back',
              title: '',

              headerBackVisible: true,
            }}
          />
          <Stack.Screen
            name="Assign"
            component={AssignSubjectScreen}
            options={{
              headerShown: true,
              headerBackTitle: 'back',
              title: '',
              headerBackVisible: true,
            }}
          />
          <Stack.Screen
            name="Mark"
            component={MarkScreen}
            options={{
              headerShown: true,
              headerBackTitle: 'back',
              title: '',
              headerBackVisible: true,
            }}
          />

          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen name="Signup" component={SignUpScreen} />

          <Stack.Screen
            name="Figma"
            component={FigmaScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="View"
            component={ViewHomeScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="NodeS"
            component={NodeScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="NodeLogin"
            component={NodeLoginScreen}
            options={{
              headerShown: true,
            }}
          />

          <Stack.Screen
            name="List"
            component={ListScreen}
            options={{
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="FireBase"
            component={FireBaseScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
