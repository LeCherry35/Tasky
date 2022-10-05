import { rootReducer } from './reducers/index';
import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }
  
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers())