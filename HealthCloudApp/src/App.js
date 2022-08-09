import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import AppNavigation from './AppNavigation';
import { Provider as StoreProvider } from 'react-redux';
import bluetoothReducers from './reducers/bluetoothReducers';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';

const SagaMiddleware = createSagaMiddleware();
const store = createStore(bluetoothReducers,  applyMiddleware(SagaMiddleware));
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
