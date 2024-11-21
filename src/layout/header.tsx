import Head from 'next/head'
import { HeaderStyle, Title } from 'styles/header'
import { Container } from 'styles/sharedstyles'

type HeaderProps = {
  title?: string
}

export default function Header({ title }: HeaderProps) {
  const defaultTitle = 'Jornada de trabalho'
  const titlePage = title ? `${defaultTitle} - ${title}` : defaultTitle
  const titleMain = title || defaultTitle

  return (
    <>
      <Head>
        <title>{titlePage}</title>

        <meta name="description" content="Calculadora de horas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#05445e" />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <HeaderStyle>
          <Container>
            <Title className="text-2xl md:text-3xl xl:text-4xl py-3 px-1">
              {titleMain}
            </Title>
          </Container>
        </HeaderStyle>
      </header>
    </>
  )
}
