import React, {useEffect} from 'react';

import Routes from './src/routes';
import {Provider} from 'react-redux';
import store from '@reducers/index';
import {fixTextRender} from '@utils/helper';

const App = () => {
  useEffect(() => {
    fixTextRender();
    return () => {};
  }, []);

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;
