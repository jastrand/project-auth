import React, { useState } from 'react'



export const SignUp = () => {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:8080/users', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data)
            })
    }


    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <input
                type='text'
                onChange={(e) => setName(e.target.value)}>
            </input>
            <input
                type='email'
                onChange={(e) => setEmail(e.target.value)}>

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