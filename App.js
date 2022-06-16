import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import StackScreen from './navigation/Navigator';

const App = () => {
  return (
    // Navigation wrapper
    <NavigationContainer>
      <StackScreen/>
    </NavigationContainer>
  );
};

export default App;
