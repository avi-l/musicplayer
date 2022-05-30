import React, { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator, StatusBar, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './app/navigation/AppNavigator';
import { AudioProvider } from './app/context/AudioProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function App() {
  return (
    <SafeAreaProvider>
      <AudioProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </AudioProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});