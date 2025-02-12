import styled from 'styled-components'

const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 8px;
  color: #333;
  font-size: 0.7em;
  padding: 0.75em 1.5em;
  transition: all 0.3s linear;
  outline: none;

  &:focus {
    border-color: #fff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }

  @media ${({ theme }) => theme.breakpoints.sm} {
    font-size: 1em;
  }
`

export { Input }
