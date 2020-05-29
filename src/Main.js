import React, {Component} from 'react';
import AppStack from './navigation/AppStack';
import {Provider} from 'react-redux';
import rootReducer from './reducer/index';
import {createStore, applyMiddleware} from 'redux';
export default class Main extends Component {
  render() {
    return (
      <Provider store={createStore(rootReducer)}>
        <AppStack />
      </Provider>
    );
  }
}
