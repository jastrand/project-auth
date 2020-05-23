import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { SignUp } from './pages/SignUp'
import { LogIn } from './pages/LogIn'
import { Secret } from './pages/Secret'
import { userProfile } from 'reducers/userinfo'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

const reducer = combineReducers({
  userProfile: userProfile.reducer
})

const store = configureStore({ reducer })




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
