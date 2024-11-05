import Head from "next/head"
import { HeaderStyle, Title } from "styles/header";
import { Container } from "styles/sharedstyles";

export default function Header() {
  return (
    <>
      <Head>
        <title>Calculadora de horas</title>
        <meta name="description" content="Calculadora de horas" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <HeaderStyle>
        <Container>
          <Title className="text-4xl py-3">Calculadora de horas trabalhadas</Title>
        </Container>
        </HeaderStyle>
      </header>
    </>
  );
}
