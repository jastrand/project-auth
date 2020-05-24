import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { userProfile } from '../reducers/userinfo'
import { Animation } from '../components/Animation'
import { ImageForm } from '../components/ImageForm'

const Text = styled.p`
  font-size: 60px;
  color: white;
  font-family: 'Bangers';
  margin: 0;
  margin-bottom: -50px;
`

const Logout = styled.button`
  font-size: 30px;
  background-color: transparent;
  border-radius: 12px;
  margin: 20px;
  color: white;
  padding: 10px;
  border-color: white;

  &:hover {
    background-color: white;
    cursor: pointer;
    transform: scale(1.2);
    color: black;
  }
`
const ImgWrapper = styled.div`
  position: relative;
  min-width: 200px;
  min-height: 200px;
  max-width: 200px;
  max-height: 200px;
`

const Image = styled.img`
  width: 100%;
  border-radius: 50%;
  margin: 10px;

  ${ImgWrapper}:hover & {
    filter: brightness(20%);
  }

`
const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`

const ImgText = styled.button`
  position: absolute;
  display: none;
  top: 45%;
  left: 25%;
  z-index: 5;
  color: white;
  background: none;
  border: none;
  font-size: 17px;
  cursor: pointer;

  ${ImgWrapper}:hover & {
    display: block;
  }
`

export const Secret = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [message, setMessage] = useState()
  const [showForm, setShowForm] = useState(false)
  const token = useSelector((state) => state.userProfile.user.accessToken)
  const image = useSelector((state) => state.userProfile.user.profileImage)
  useEffect(() => {
    console.log('hello')
    fetch('https://project-auth-lions.herokuapp.com/secrets', {
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
    <Container>
      <Text>{message}</Text>
      {token && <ImgWrapper>
        <ImgText onClick={() => setShowForm(!showForm)}>Update image</ImgText>
        {!image && <Image src={require('../assets/face.png')} alt="profile picture"></Image>}
        {image && <Image src={image} alt="profile picture"></Image>}
      </ImgWrapper>}
      {showForm && <ImageForm function={setShowForm} />}
      {token && <Logout onClick={() => LogOut()}>Log out</Logout>}
      {!token && <Animation />}
    </Container>
  )
}