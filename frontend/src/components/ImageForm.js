import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userProfile } from '../reducers/userinfo'
import styled from 'styled-components'

export const ImageForm = (props) => {
    const id = useSelector((state) => state.userProfile.user.id)
    const dispatch = useDispatch()
    const [imageUrl, setImageUrl] = useState()
    const handleSubmit = (e) => {
        e.preventDefault()
        props.function(false)
        fetch(`https://project-auth-lions.herokuapp.com/users/${id}`, {
            method: 'POST',
            body: JSON.stringify({ image: imageUrl }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then((data) => {
                dispatch(userProfile.actions.setProfile({ profileImage: data.imageURL }))
            })
    }
    return (
        <Form onSubmit={(e) => handleSubmit(e)}>
            <Label>Update profile image:
            <Input type='url'
                    onChange={(e) => setImageUrl(e.target.value)}
                ></Input></Label>
            <Button
                type='submit'>
                Add image
            </Button>
        </Form>
    )
}

const Form = styled.form`
    display: flex; 
    flex-direction: column;
    align-items: center;
`
const Input = styled.input`
  margin: 8px 0px;
  font-size: 20px;
  width: 100%;
  border-color: ${props => props.borderColor}
`

const Label = styled.label`
  display: flex;
  flex-direction: column;
  color: white;
  width: 70%;
`

const Button = styled.button`
  margin: 8px 0px;
  background-color: white;
  border-radius: 500px;
  width: 70%;
  font-size: 20px;
`