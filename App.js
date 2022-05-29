import React, { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator, StatusBar, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './app/navigation/AppNavigator';
import { AudioProvider } from './app/context/AudioProvider';
import { initializePlayer } from './app/utilities/utils';

export default function App() {
  return (
    <AudioProvider>
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
    </AudioProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});