import {StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as Colors from '@res/colors';
import * as Navigator from 'src/routes/root-navigator';

const home: React.FC = () => {
  const onCreateTicketPress = () => {
    Navigator.navigate('create');
  };

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.BG_LIGHT} />
      <View style={styles.container}>
        <View style={styles.fabParent}>
        <TouchableOpacity
          style={styles.floatingActionButton}
          onPress={onCreateTicketPress}
        />
        </View>
      </View>
      <View style={styles.bottomNavigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
  },
  fabParent: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  floatingActionButton: {
    width: 56,
    height: 56,
    padding: 16,
    borderRadius: 16,
    zIndex: 100,
    margin: 16,
    backgroundColor: Colors.BG_DARK,
  },
  bottomNavigation: {
    height: 64,
    width: '100%',
    backgroundColor: Colors.BG_DARK,
    bottom: 0,
  },
});

export default home;
