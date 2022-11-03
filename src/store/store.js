import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import logger from 'redux-logger';
import { loggerMiddleware } from './middleware/logger';

import { rootReducer } from './root-reducer';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Add middleware only if not in production
const middleWares = [process.env.NODE_ENV !== 'production' && loggerMiddleware].filter(Boolean);

// Compose enhancer from Redux Dev Tools if not in production, else compose method from redux
const composeEnhancer =
  (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

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
