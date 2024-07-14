import 'react-native-gesture-handler';
import React from 'react'
import { PaperProvider, Text } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './src/navigator/StackNavigator';

export const App = () => {
  return (
    <NavigationContainer>
      <PaperProvider>
          <StackNavigator/>
      </PaperProvider>
    </NavigationContainer>
  )
}

export default App;