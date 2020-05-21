import React, {Component} from 'react';
import RootNavigation from './navigation/RootNavigation';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import reducer from './reducer';
import {createStore, applyMiddleware} from 'redux';
export default class Main extends Component {
  render() {
    return (
      <Provider store={createStore(reducer, {}, applyMiddleware(ReduxThunk))}>
        <RootNavigation />
      </Provider>
    );
  }
}
