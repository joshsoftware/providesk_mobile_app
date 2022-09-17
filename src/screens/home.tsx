/* eslint-disable react-hooks/rules-of-hooks */
import {
  Image,
  LayoutAnimation,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as Colors from '@res/colors';
import * as Navigator from 'src/routes/root-navigator';
import {scaleFonts} from '@utils/helper';
import Pager, {PagerViewOnPageSelectedEvent} from 'react-native-pager-view';
import IndexList from './index-list';

const home: React.FunctionComponent = () => {
  const onCreateTicketPress = () => {
    Navigator.navigate('create');
  };

  const [selectedTab, setSelectedTab] = useState(0);

  const onTabSelected = (tabIndex: number) => {
    if (tabIndex >= 0 && tabIndex < 2) {
      LayoutAnimation.easeInEaseOut();
      setSelectedTab(tabIndex);
      pagerRef.current?.setPage(tabIndex);
    }
  };

  const pagerRef = useRef<Pager>(null);

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.BG_LIGHT} />
      <View style={styles.container}>
        <Pager
          orientation="horizontal"
          ref={pagerRef}
          scrollEnabled={true}
          initialPage={0}
          offscreenPageLimit={1}
          style={{width: '100%', height: '100%'}}
          onPageSelected={(e: PagerViewOnPageSelectedEvent) => {
            if (selectedTab !== e.nativeEvent.position) {
              onTabSelected(e.nativeEvent.position);
            }
          }}>
          <IndexList key="0" status="pending" />
          <IndexList key="1" status="resolved" />
        </Pager>
        {selectedTab === 0 ? (
          <View style={styles.fabParent}>
            <TouchableOpacity
              style={styles.floatingActionButton}
              onPress={onCreateTicketPress}>
              <Image
                source={require('src/assets/images/icon_plus.png')}
                resizeMode="contain"
                style={styles.fabIcon}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <></>
        )}
      </View>
      <View style={styles.bottomNavigation}>
        <TouchableOpacity
          onPress={() => onTabSelected(0)}
          style={[
            styles.bottomTabButton,
            selectedTab === 0 ? styles.bottomTabSelectedButton : {},
          ]}>
          <Image
            source={require('src/assets/images/todo.png')}
            style={styles.fabIconSmall}
            resizeMode="contain"
          />
          {selectedTab === 0 ? (
            <></>
          ) : (
            <Text style={styles.bottomNavigationText}>Pending</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onTabSelected(1)}
          style={[
            styles.bottomTabButton,
            selectedTab === 1 ? styles.bottomTabSelectedButton : {},
          ]}>
          <Image
            source={require('src/assets/images/checked.png')}
            style={styles.fabIconSmall}
            resizeMode="contain"
          />
          {selectedTab === 1 ? (
            <></>
          ) : (
            <Text style={styles.bottomNavigationText}>Resolved</Text>
          )}
        </TouchableOpacity>
      </View>
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
    bottom: 16,
    right: 16,
    backgroundColor: Colors.WHITE,
    borderRadius: 16,
  },
  floatingActionButton: {
    width: 56,
    height: 56,
    padding: 16,
    alignItems: 'center',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    zIndex: 100,
    backgroundColor: Colors.BG_DARK,
  },
  bottomNavigation: {
    minHeight: 56,
    width: '100%',
    backgroundColor: Colors.BG_DARK,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabIcon: {
    tintColor: Colors.PRIMARY,
    height: 24,
    width: 24,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  fabIconSmall: {
    tintColor: Colors.PRIMARY,
    height: 16,
    width: 16,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bottomTabButton: {
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 24,
    marginVertical: 10,
    marginHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 40,
  },
  bottomTabSelectedButton: {
    backgroundColor: Colors.BG_DARK,
  },
  bottomNavigationText: {
    fontFamily: 'Montserrat',
    color: Colors.PRIMARY,
    fontSize: scaleFonts(16),
    fontWeight: 'bold',
    marginStart: 8,
  },
});

export default home;
