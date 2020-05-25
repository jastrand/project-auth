import styled, { keyframes } from 'styled-components'

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.color};
  width: 300px;
  border-radius: 8px;
  padding: 80px 8px;
  box-sizing: border: box;
  justify-content: space-between;
  font-family: 'Roboto';
`

export const Header = styled.p`
  font-size: 30px;
  color: black;
  margin: 0;
  margin-bottom: 18px;
`

export const Input = styled.input`
  margin: 8px 0px;
  font-size: 20px;
  width: 100%;
  border: none;
  border-bottom: 1px solid;
  border-color: ${props => props.borderColor};
`

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  color: black;
  width: 70%;
`

const MovingBackground = keyframes`
0%{background-position:0% 50%}
50%{background-position:100% 50%}
100%{background-position:0% 50%}
}
`
export const Button = styled.button`
  margin: 8px 0px;
  background-size: 200% 200%;
  background-image: linear-gradient(270deg, #99B898, #FECEA8);
  animation: ${MovingBackground} 2s ease infinite;
  width: 70%;
  font-size: 20px;
  font-weight: bold;
  padding: 12px;
  color: white;
  margin: 30px 0 40px 0;
`


export const Register = styled.p`
  color: black;
`
