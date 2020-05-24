import React from 'react'
import { Provider } from 'react-redux'
import { combineReducers, createStore } from '@reduxjs/toolkit'
import { SignUp } from './pages/SignUp'
import { LogIn } from './pages/LogIn'
import { Secret } from './pages/Secret'
import { userProfile } from 'reducers/userinfo'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (error) {
    console.log(error)
  }
}

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) return undefined
    return JSON.parse(serializedState)
  } catch (error) {
    console.log(error)
    return undefined
  }
}

const reducer = combineReducers({
  userProfile: userProfile.reducer
})

const persistedState = loadFromLocalStorage()

const store = createStore(reducer, persistedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

store.subscribe(() => saveToLocalStorage(store.getState()))


export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>

          <Route path='/' exact ><LogIn /></Route>
          <Route path='/register' exact ><SignUp /></Route>
          <Route path='/secret' exact ><Secret /></Route>

        </Switch>
      </BrowserRouter>
    </Provider>
  )
}
