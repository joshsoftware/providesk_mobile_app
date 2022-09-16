import React, { useEffect } from 'react';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import auth from '@react-native-firebase/auth';
import { RootNavigator } from 'src/routes';

const getParameterFromUrl = (url: string, param: string) => {
    var re = new RegExp(".*[?&]" + param + "=([^&]+)(&|$)");
    var match = url.match(re);
    return (match ? match[1] : "");
  }
  export const handleDynamicLink = (link: any) => {
    if(!link) return;
    const referralCode = getParameterFromUrl(link.url,'referral_code');
    if(!referralCode) return;

    if(auth().currentUser) {
      RootNavigator.resetUntil([
        {name: 'Home',key: 'home-screen-dynamic-link',params: {}},
        {name: 'referal-code-screen',key: 'referal-code-screen-dynamic-link',params: { referralCode }}
      ]);
    } else {
      RootNavigator.resetUntil([
        {name: 'login',key: 'login-screen-dynamic-link',params: {screen: 'Login', params: { referralCode }}},
        {name: 'login',key: 'register-screen-dynamic-link',params: { screen: 'Register',params: { referralCode }}}
      ]);
    }
  };
  