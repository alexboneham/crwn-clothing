import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

// Create custom logger middleware
const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log('type', action.type);
  console.log('payload', action.payload);
  console.log('currentState', store.getState());

  next(action);

  console.log('next state: ', store.getState());
};

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [loggerMiddleware];
const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);

/* 
    Solution for using new configureStore function from Redux Toolkit

    import logger from 'redux-logger';
    import { configureStore } form '@reduxjs/toolkit';

    import { rootReducer } from './root-reducer';

    export const store = configureStore({
        reducer: rootReducer,
        middleware: [logger],
    }) 
*/

// const curryFunc = (a) => (b, c) => {
//   a + b - c;
// };

// const with3 = curryFunc(3);
// const with10 = curryFunc(10);

// with3(2, 4) // 3 + 2 - 4
