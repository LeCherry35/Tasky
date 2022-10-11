import { rootReducer } from './reducers/index';
import { compose } from 'redux'
import { configureStore } from '@reduxjs/toolkit'


declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }
  
export const store = configureStore(
  {reducer: rootReducer}
  )
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof rootReducer>

