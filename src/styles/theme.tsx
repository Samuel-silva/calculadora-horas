import { DefaultTheme } from 'styled-components'

interface Size {
  sm: string
  md: string
  lg: string
  xl: string
}

interface Colors {
  primary: string
  secondary: string
  success: string
  danger: string
  warnig: string
  info: string
  light: string
  dark: string
}

const size: Size = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px'
}

const colors: Colors = {
  primary: '#05445e',
  secondary: '#189ab4',
  success: '#0E9F6E',
  danger: '#F05252',
  warnig: '#FCE96A',
  info: '#3F83F8',
  light: '#FAFAFA',
  dark: '#333'
}

export const theme: DefaultTheme = {
  breakpoints: {
    sm: `(min-width: ${size.sm})`,
    md: `(min-width: ${size.md})`,
    lg: `(min-width: ${size.lg})`,
    xl: `(min-width: ${size.xl})`
  },
  colors
}
