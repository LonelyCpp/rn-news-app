import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './src/reducers';
import Navigator from './src/screens';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './src/sagas';
import { getDataFromDevice, DeviceStorageKeys } from './src/utils';
import { setCountryCode } from './src/actions';
import { COUNTRY_LIST } from './src/constants';

const sagaMiddleWare = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleWare));
sagaMiddleWare.run(rootSaga);

XMLHttpRequest = GLOBAL.originalXMLHttpRequest
  ? GLOBAL.originalXMLHttpRequest
  : GLOBAL.XMLHttpRequest;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialized: false
    };
    this.initialize().then(() => {
      this.setState({ initialized: true });
    });
  }

  initialize = async () => {
    const countryCode = await getDataFromDevice(
      DeviceStorageKeys.countryCode,
      COUNTRY_LIST[0].key
    );
    store.dispatch(setCountryCode(countryCode));
  };

  render() {
    if (this.state.initialized) {
      return (
        <Provider store={store}>
          <Navigator />
        </Provider>
      );
    }
    return <View style={{ flex: 1 }} />;
  }
}
