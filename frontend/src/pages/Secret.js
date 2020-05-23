import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

export const Secret = () => {
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


  return (
    <div><p>Secret!</p></div>
  )
}