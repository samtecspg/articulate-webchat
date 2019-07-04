import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'

import behavior from './reducers/behaviorReducer';
import messages from './reducers/messagesReducer';
import quickButtons from './reducers/quickButtonsReducer';

import widgetSaga from './sagas/widgetSaga';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const reducer = combineReducers({ behavior, messages, quickButtons });

export default createStore(
  reducer,
  process.env.NODE_ENV !== 'production' ?
    /* eslint-disable no-underscore-dangle */
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__() : ''
    /* eslint-enable */,
  compose(applyMiddleware(sagaMiddleware)),
);

// then run the saga
sagaMiddleware.run(widgetSaga)
