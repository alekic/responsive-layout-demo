import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './screens/HomeScreen';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaProvider>
        <HomeScreen />
      </SafeAreaProvider>
    </>
  );
}

registerRootComponent(App);
