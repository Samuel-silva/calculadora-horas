import styled from 'styled-components'

const Button = styled.button`
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.light};
  display: flex;
  padding: 0.4em 0.7em;
  transition: all 0.3s linear;

  ${({ disabled }) =>
    !disabled &&
    `
    &:hover {
      opacity: 0.8;
    }
    &:active {
      box-shadow: inset 0 0 0 100px rgba(0,0,0,0.2), 0 0 4px 1px rgba(0,0,0,0.2);
    }
  `}

  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.5;
    cursor: no-drop;
  `}
`

const ButtonDanger = styled(Button)`
  background: ${({ theme }) => theme.colors.danger};
  color: ${({ theme }) => theme.colors.light};
`

const ButtonSuccess = styled(Button)`
  background: ${({ theme }) => theme.colors.success};
  color: ${({ theme }) => theme.colors.light};
`

const ButtonDefault = styled(Button)`
  background: #eee;
  color: #444;

  &:hover {
    background: #eaeaea;
    box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.2);
  }
  ${({ disabled }) =>
    disabled &&
    `
    &:hover {
      background: #eee;
      box-shadow: none;
    }
  `}
`

export { Button, ButtonDanger, ButtonSuccess, ButtonDefault }
