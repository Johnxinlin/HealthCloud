import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import AppNavigation from './AppNavigation';
import { Provider as StoreProvider } from 'react-redux';
import bluetoothReducers from './reducers/bluetoothReducers';
import userInfoReducers from './reducers/userInfoReducers';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';
import { allReducer } from './reducers/allReducer';

const SagaMiddleware = createSagaMiddleware();
const store = createStore(allReducer, applyMiddleware(SagaMiddleware));
SagaMiddleware.run(rootSaga);

const App = () => {
  return (
    <View style={styles.container}>
      <StoreProvider store={store}>
        <AppNavigation />
      </StoreProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
