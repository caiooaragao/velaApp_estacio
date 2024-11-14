import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './homeScreen'; // Ensure this component exists and is properly exported
import ListaBarcos from './listaBarcos'; // Ensure this component exists and is properly exported


const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <>
      <Stack.Screen
        name="homeScreen"
        component={HomeScreen}
        options={{ title: 'Welcome' }}
      />
      <Stack.Screen name="listaBarcos" component={ListaBarcos} />
    </>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
};

export default App;
