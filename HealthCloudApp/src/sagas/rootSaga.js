import { all } from 'redux-saga/effects';
import { watchReadBTData } from './BluetoothSagas';

function* rootSaga() {
  yield all([watchReadBTData()]);
}
export default rootSaga;