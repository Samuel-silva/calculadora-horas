import Head from "next/head"
import { HeaderStyle, Title } from "styles/header";
import { Container } from "styles/sharedstyles";

export default function Header() {
  return (
    <>
      <Head>
        <title>Calculadora de horas</title>

        <meta name="description" content="Calculadora de horas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#05445e" />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <HeaderStyle>
        <Container>
          <Title className="text-xl sm:text-2xl md:text-3xl xl:text-4xl py-3">Calculadora de horas trabalhadas</Title>
        </Container>
        </HeaderStyle>
      </header>
    </>
  );
}
