import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { userProfile } from '../reducers/userinfo'
import { Input, Label } from '../components/FormStuff'


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
            <Label>Update profile image
            <Input type='url'
                    onChange={(e) => setImageUrl(e.target.value)}
                ></Input></Label>
            <Button
                type='submit'>
                Add url
            </Button>
        </Form>
    )
}

const Form = styled.form`
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.color};
  width: 300px;
  border-radius: 8px;
  justify-content: space-between;
  font-family: 'Roboto';
  display: flex;
`

const Button = styled.button`
font-size: 20px;
  background-color: transparent;
  border-radius: 12px;
  margin: 20px;
  color: #3831ac;
  border-color: #3831ac;
  padding: 14px;

  &:hover {
    background: #3831ac;
    color: white;
    transform: scale(1.1);
    cursor: pointer;
  }
`