import { SET_COUNTRY_CODE } from '../actions/settings';
import { COUNTRY_LIST } from '../constants';

const INITIAL_STATE = {
  countryCode: COUNTRY_LIST[0].key
};

export const settingsReducer = (state, action) => {
  if (typeof state === 'undefined') {
    return INITIAL_STATE;
  }

  switch (action.type) {
    case SET_COUNTRY_CODE:
      return { ...state, countryCode: action.code };
  }

  return state;
};
