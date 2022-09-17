import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import * as Colors from '@res/colors';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {scaleFonts} from '@utils/helper';
import {useAppDispatch} from '@reducers/index';
import {authenticateUser} from '@reducers/userReducer';
import * as Navigator from 'src/routes/root-navigator';
import {getValue} from '@utils/storage';

const Splash: React.FC = () => {
  let dispatch = useAppDispatch();

  const checkIsUserLoggedIn = async () => {
    if ((await GoogleSignin.isSignedIn()) && (await getValue('token'))) {
      Navigator.replace('home');
    }
  };

  useEffect(() => {
    GoogleSignin.configure();
    checkIsUserLoggedIn();
  }, []);

  const onSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      const data = await dispatch(
        authenticateUser({
          email: userInfo?.user?.email,
          name: userInfo?.user?.name,
          google_user_id: userInfo?.user?.id,
        }),
      ).unwrap();

      if (data.data.auth_token != null) {
        Navigator.replace('home');
      }
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
    marginBottom: 24,
  },
});

export default Splash;
