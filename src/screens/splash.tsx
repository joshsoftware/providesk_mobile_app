import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import * as Colors from '@res/colors';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {scaleFonts} from '@utils/helper';

const Splash: React.FC = () => {
  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  const onSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
    } catch (error) {
      if (error?.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('user cancelled the login flow');
      } else if (error?.code === statusCodes.IN_PROGRESS) {
        console.log('operation (e.g. sign in) is in progress already');
      } else if (error?.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('play services not available or outdated');
      } else {
        console.log(error);
      }
    }
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.BG_LIGHT} />
      <View style={styles.loginScreen}>
        <Text style={styles.h1}>Providesk</Text>
        <GoogleSigninButton onPress={onSignIn} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loginScreen: {
    minWidth: '100%',
    minHeight: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
  },
  h1: {
    color: Colors.BLACK,
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: scaleFonts(58),
  },
});

export default Splash;
