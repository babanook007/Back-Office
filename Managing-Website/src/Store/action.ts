import { Dispatch } from 'redux';
import { UserActionType } from './types';
import axios from 'axios';

export const fetchUserData = () => {
  return async (dispatch: Dispatch<UserActionType>) => {
    try {
      const response = await axios.get('http://192.168.1.35/getUsers');
      const data = response.data;

      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (error: any) {
      dispatch({ type: 'FETCH_ERROR', payload: error.message });
    }
  };
};