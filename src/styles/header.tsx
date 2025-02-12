import styled from 'styled-components'

const HeaderStyle = styled.div`
  background: rgba(169, 186, 212, 0.2);
`

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.dark};
`

export { HeaderStyle, Title }
