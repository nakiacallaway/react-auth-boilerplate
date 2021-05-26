import React, { createContext, useReducer } from 'react';
import instance from '../api/apiConfig';

const initialState = {
  users: [],
  user: undefined,
  alert: false,
  getUsers: () => {},
};

const appReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'GET_USER': 
      return {...state, users: action.payload};
    // case 'SAVE_USER':
    //   return { ...state, alert: false };
    case 'ALERT':
      return { ...state, alert: true };
    default:
      return state;
  }
};

export const GlobalContext = createContext<InitialStateType>(initialState);

export const GlobalProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const getUsers = async () => {
    try {
      let { data } = await instance.get('/user');
      console.log('this is my data', data);
      dispatch({ type: 'GET_USER', payload: data });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        user: state.user,
        alert: state.alert,
        users: state.users,
        getUsers,
      }}>
      {children}
    </GlobalContext.Provider>
    
  );
};
