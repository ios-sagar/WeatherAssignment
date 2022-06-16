import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../Screens/Home';

const Stack = createNativeStackNavigator();

const StackScreen = () => {
  return (
    <Stack.Navigator>
      {/* Navigation Screens Starts */}
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerTitle: 'Weather Search', headerTitleAlign: 'center'}}
      />
      {/* Navigation Screen Ends */}
    </Stack.Navigator>
  );
};

export default StackScreen;
