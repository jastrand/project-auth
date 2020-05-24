import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userProfile } from '../reducers/userinfo'
import { Form, Header, Input, Label, Button, Register } from '../components/FormStuff'


export const LogIn = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [name, setName] = useState()
  const [password, setPassword] = useState()
  const [userError, setUserError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('https://project-auth-lions.herokuapp.com/sessions', {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then((data) => {
        if (data.error) {
          data.error === "Username does not exist" ? setUserError(true) : setPasswordError(true)
        } else {
          dispatch(
            userProfile.actions.loggedIn({ id: data.userId, accessToken: data.accessToken, loggedIn: true, profileImage: data.profileImage })
          )
          setUserError(false)
          setPasswordError(false)
          history.push('/secret')
        }
      })
  }

  return (
    <Form color="#5e1a41" onSubmit={(e) => handleSubmit(e)}>
      <Header>Login</Header>
      <Label>

        Username
      <Input
          type='text'
          placeholder="Enter username"
          minLength={3}
          maxLength={20}
          onChange={(e) => setName(e.target.value)}>
        </Input>
        {userError && <p>Username not found</p>}
      </Label>
      <Label>
        Password
      <Input
          type='password'
          placeholder="Enter password"
          minLength={8}
          maxLength={20}
          onChange={(e) => setPassword(e.target.value)}>
        </Input>
        {passwordError && <p>Password does not match</p>}
      </Label>
      <Button
        disabled={!name || !password}
        type='submit'>LOGIN</Button>
      <Register>Not a member? <Link style={{ color: "white" }} to="/register">Sign up</Link></Register>
    </Form>
  )
}