import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userProfile } from '../reducers/userinfo'

export const Secret = () => {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.userProfile.user.accessToken)
  useEffect(() => {
    console.log('hello')
    fetch('http://localhost:8080/secrets', {
      method: 'GET',
      headers: { 'Authorization': token, 'Content-Type': 'application/json' }
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
  }, [token])

const LogOut = () => {
  dispatch(userProfile.actions.logOut())
}
  return (
    <div><p>Secret!</p>
    <button onClick={() => LogOut()}>Log out</button>
    </div>
  )
}