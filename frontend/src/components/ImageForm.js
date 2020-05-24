import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userProfile } from '../reducers/userinfo'

export const ImageForm = () => {
    const id = useSelector((state) => state.userProfile.user.id)
    const dispatch = useDispatch()
    const [imageUrl, setImageUrl] = useState()
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(id)
        fetch(`http://localhost:8080/users/${id}`, {
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
        <form onSubmit={(e) => handleSubmit(e)}>
            <label>Update profile image
            <input type='url'
                    onChange={(e) => setImageUrl(e.target.value)}
                ></input></label>
            <button
                type='submit'>
                Add url
            </button>
        </form>
    )
}