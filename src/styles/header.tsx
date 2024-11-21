import styled from 'styled-components'

const HeaderStyle = styled.div`
  background: ${({ theme }) => theme.colors.primary};
`

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.light};
  font-weight: 200;
`

export { HeaderStyle, Title }
