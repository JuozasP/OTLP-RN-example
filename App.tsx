import 'react-native-reanimated';
import 'react-native-gesture-handler';

import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Home} from './src/pages/Home';
import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Tracer} from './src/oplt/tracing';
import './src/oplt/metric';
import {appStartupCounter} from './src/oplt/metric';

export default function App() {
  useEffect(() => {
    Tracer();
    appStartupCounter?.add(1, {label: 'app-startup'});
  }, []);

  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  );
}

const RootStack = createNativeStackNavigator({
  screens: {
    Home: {
      screen: Home,
      options: {
        headerShown: false,
      },
    },
  },
});

const Navigation = createStaticNavigation(RootStack);
