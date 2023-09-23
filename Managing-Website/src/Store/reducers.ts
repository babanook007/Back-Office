import { combineReducers } from 'redux';
import { UserActionType, UserState } from './types';

const initialState: UserState = {
  data: [],
  error: null,
};

const userReducer = (state = initialState, action: UserActionType): UserState => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        ...state,
        data: action.payload,
        error: null,
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
const rootReducer = combineReducers({
  userData: userReducer,
});

export default rootReducer;
  