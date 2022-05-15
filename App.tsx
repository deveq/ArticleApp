import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './src/screens/RootStack';
import {QueryClientProvider, QueryClient} from 'react-query';
import {UserContextProvider} from './src/contexts/UserContext';

const queryClient = new QueryClient();

function App() {
  return (
    <UserContextProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </QueryClientProvider>
    </UserContextProvider>
  );
}

export default App;
