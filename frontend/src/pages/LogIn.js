import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { userProfile } from '../reducers/userinfo'

export const LogIn = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState()
  const [password, setPassword] = useState()

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:8080/sessions', {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then((data) => {
        dispatch(
          userProfile.actions.loggedIn({ id: data.id, accessToken: data.accessToken, loggedIn: true })
      )
      })
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        type='text'
        onChange={(e) => setName(e.target.value)}>
      </input>
      <input
        type='password'
        onChange={(e) => setPassword(e.target.value)}>
      </input>
      <button
        type='submit'>sign up</button>
    </form>
  )
}