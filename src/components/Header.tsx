import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import logoImg from '../assets/images/logo/logo.png';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface HeaderProps {
  tasksCounter: number;
}

export function Header({tasksCounter}: HeaderProps) {
  const {top} = useSafeAreaInsets();

  return (
    <View style={[styles.container, {paddingTop: top}]}>
      <Image source={logoImg} />

      <View style={styles.tasks}>
        <Text style={styles.tasksCounter}>TODO count </Text>
        <Text style={styles.tasksCounterBold}>{tasksCounter}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingHorizontal: 24,
    paddingBottom: 60,
    backgroundColor: '#0267C1',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  tasks: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  tasksCounter: {
    fontSize: 15,
    color: '#FFF',
    fontFamily: 'Inter-Regular',
  },
  tasksCounterBold: {
    fontSize: 15,
    color: '#FFF',
    fontFamily: 'Inter-Bold',
    fontWeight: 'bold',
  },
});
