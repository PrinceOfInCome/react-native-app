import React from 'react';
import AppStack from './src/navigation/AppStack';
import Loader from './src/component/loader';
import {StoreProvider} from './src/context/store';

export default function App() {
  return (
    <StoreProvider>
      <AppStack />
      <Loader />
    </StoreProvider>
  );
}
