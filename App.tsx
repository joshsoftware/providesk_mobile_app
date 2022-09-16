import React, {useEffect} from 'react';

import Routes from './src/routes';
import {Provider} from 'react-redux';
import store from '@reducers/index';
import {fixTextRender} from '@utils/helper';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

const App = () => {
  useEffect(() => {
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
