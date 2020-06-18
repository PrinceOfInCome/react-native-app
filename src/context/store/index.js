import React, {createContext, useReducer} from 'react';
import Loader from '../reducer/loader';
export const Store = React.createContext();
const dispatch = {};
export function StoreProvider(props) {
  //all reducer
  const [mapLoaderState, dispatchLoaderStateAction] = useReducer(
    Loader,
    dispatch,
  );
  // value of all reducers
  const loaderValue = {mapLoaderState, dispatchLoaderStateAction};

  // combine all value
  const value  = {
	  ...loaderValue,

  }

  //store

return <Store.Provider value = {value}>{props.children}</Store.Provider>
}
