import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html,
  body {
    color: ${({ theme }) => theme.colors.dark};
    padding: 0 0 24px 0;
    margin: 0;
    min-width: 320px;
    overflow-x: hidden;
    overflow-y: auto;
    width: 100vw;
  }

  .material-symbols-fill {
    font-variation-settings:
    'FILL' 1,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`

export default GlobalStyle
