import {createStore, applyMiddleware, compose} from 'redux';
import {persistStore, persistCombineReducers} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import createSagaMiddleware from 'redux-saga';
import actions from './actions';
import rootReducer from './reducers';
import rootSaga from './sagas';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'],
  blacklist: [''],
};

const persistedReducer = persistCombineReducers(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();

function configStore() {
  const store = createStore(
    persistedReducer,
    compose(applyMiddleware(sagaMiddleware)),
  );
  sagaMiddleware.run(rootSaga);
  const persistor = persistStore(store);
  return {store, persistor};
}

export {configStore, actions};
