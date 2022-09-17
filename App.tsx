import React, {useEffect} from 'react';

import Routes from './src/routes';
import {Provider} from 'react-redux';
import store from '@reducers/index';
import {fixTextRender} from '@utils/helper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {UIManager} from 'react-native';

const App = () => {
  useEffect(() => {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    fixTextRender();
    return () => {};
  }, []);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <Routes />
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
