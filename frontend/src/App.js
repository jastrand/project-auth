import React from 'react'
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { SignUp } from './pages/SignUp'
import { LogIn } from './pages/LogIn'
import { userProfile } from 'reducers/userinfo'

const reducer = combineReducers({
  userProfile: userProfile.reducer
})

const store = configureStore({ reducer })

export const App = () => {
  return (
    <Provider store={store}>
      <div>
        <SignUp />
        <p>hello</p>
        <LogIn />
      </div>
    </Provider>
  )
}
