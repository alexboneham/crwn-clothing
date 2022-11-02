import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

const middleWares = [logger];
const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);

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
