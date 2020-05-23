import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { userProfile } from '../reducers/userinfo'
import { Animation } from '../components/Animation'

const Text = styled.p`
  font-size: 50px;
  color: #3831ac;
  font-family: 'Bangers';
  margin: 0;
  margin-bottom: -50px;
`

const Logout = styled.button`
  font-size: 30px;
  background-color: transparent;
  border-radius: 12px;
  margin: 20px;
  color: #3831ac;
  border-color: #3831ac;
`

export const Secret = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [message, setMessage] = useState()
  const token = useSelector((state) => state.userProfile.user.accessToken)
  useEffect(() => {
    console.log('hello')
    fetch('http://localhost:8080/secrets', {
      method: 'GET',
      headers: { 'Authorization': token, 'Content-Type': 'application/json' }
    })
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
  }, [token])

  const LogOut = () => {
    dispatch(userProfile.actions.logOut())
    history.push('/')
  }
  return (
    <div>
      <Text>{message}</Text>
      {token && <Logout onClick={() => LogOut()}>Log out</Logout>}
      {!token && <Animation />}
    </div>
  )
}