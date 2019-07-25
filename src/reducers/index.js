import { combineReducers } from 'redux';
import { homeReducer } from './home';
import { settingsReducer } from './settings';

export default combineReducers({
  home: homeReducer,
  settings: settingsReducer
});
