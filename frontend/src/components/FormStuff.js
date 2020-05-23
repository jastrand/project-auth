import styled from 'styled-components'

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.color};
  width: 300px;
  border-radius: 15px;
  padding-bottom: 15px;
`

export const Header = styled.p`
  font-size: 30px;
  color: white;
`

export const Input = styled.input`
  margin: 8px 0px;
  font-size: 20px;
  width: 100%;
  border-color: ${props => props.borderColor}
`

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  color: white;
  width: 70%;
`

export const Button = styled.button`
  margin: 8px 0px;
  background-color: white;
  border-radius: 500px;
width: 70%;
  font-size: 20px;
`

export const Register = styled.p`
  color: white;
`
