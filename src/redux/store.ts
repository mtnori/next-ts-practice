import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import Immutable from 'immutable';
import rootReducer from './reducers';
import rootSaga from './sagas';

/**
 * @param {object} initialState
 * @param {boolean} options.isServer indicates whether it is a server side or client side
 * @param {Request} options.req NodeJS Request object (if any)
 * @param {boolean} options.debug User-defined debug mode param
 * @param {string} options.storeKey This key will be used to preserve store in global namespace for safe HMR
 */
const configureStore = (initialState: any = Immutable.Map()) => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware)
  );

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};
export default configureStore;
