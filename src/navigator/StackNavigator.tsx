import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import RegisterScreen from '../RegisterScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

export  const StackNavigator =() =>{
  return (
    <Stack.Navigator>
        <Stack.Screen name="LoginScreen" options={{headerShown:false}} component={LoginScreen} />
         <Stack.Screen name="RegisterScreen" options={{headerShown:false}} component={RegisterScreen} />
         <Stack.Screen name="HomeScreen" options={{headerShown:false}} component={HomeScreen} />
    </Stack.Navigator>
  );
}