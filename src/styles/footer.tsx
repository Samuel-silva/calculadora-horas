import styled from 'styled-components'

const FooterStyle = styled.footer`
  background: ${({ theme }) => theme.colors.primary};
`

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.light};
  font-weight: 200;
`

export { FooterStyle, Title }
