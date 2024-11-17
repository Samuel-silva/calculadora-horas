import type { AppProps } from "next/app"
import { ThemeProvider, type DefaultTheme } from "styled-components"
import 'styles/globals.css'
import GlobalStyle from "styles/globalstyles"
import { Montserrat } from "next/font/google"

const theme: DefaultTheme = {
  colors: {
    primary: "#05445e",
    secondary: "#189ab4",
    success: "#0E9F6E",
    danger: "#F05252",
    warnig: "#FCE96A",
    info: "#3F83F8",
    light: "#FAFAFA",
    dark: "#333"
  },
};

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap'
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={ montserrat.className }>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </div>
  );
}
