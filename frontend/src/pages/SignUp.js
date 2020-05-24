import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userProfile } from '../reducers/userinfo'
import { Form, Header, Input, Label, Button, Register } from '../components/FormStuff'

export const SignUp = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [emailError, setEmailError] = useState(false)
    const [usernameError, setUsernameError] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('https://project-auth-lions.herokuapp.com/users', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then((data) => {
                if (data.error) {
                    if (data.error === 'Email already exist') {
                        setEmailError(true)
                        setUsernameError(false)
                    } else {
                        setEmailError(false)
                        setUsernameError(true)
                    }
                } else {
                    dispatch(
                        userProfile.actions.loggedIn({ id: data.id, accessToken: data.accessToken, loggedIn: true, profileImage: data.profileImage })
                    )
                    setEmailError(false)
                    setUsernameError(false)
                    history.push('/secret')
                }
            })
    }

    return (
        <Form color="#dcc0c7" onSubmit={(e) => handleSubmit(e)}>
            <Header>Sign up</Header>
            <Label>
                Username
            <Input
                    type='text'
                    minLength={3}
                    maxLength={20}
                    borderColor={usernameError ? 'red' : ''}
                    onChange={(e) => setName(e.target.value)}
                    required>
                </Input>
                {usernameError && <p>Username already exists</p>}
            </Label>
            <Label>
                Email
                <Input
                    type='email'
                    borderColor={emailError ? 'red' : ''}
                    onChange={(e) => setEmail(e.target.value)}
                    required>

                </Input>
                {emailError && <p>Email already exists</p>}
            </Label>
            <Label>
                Password
            <Input
                    type='password'
                    minLength={8}
                    maxLength={20}
                    onChange={(e) => setPassword(e.target.value)}
                    required>

                </Input>
            </Label>
            <Button
                type='submit'>SIGN UP</Button>
            <Register>Already a member? <Link style={{ color: "white" }} to="/">Log in!</Link></Register>
        </Form>
    )
}