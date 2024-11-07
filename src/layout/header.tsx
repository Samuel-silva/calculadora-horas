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

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <HeaderStyle>
        <Container>
          <Title className="text-3xl py-3">Calculadora de horas trabalhadas</Title>
        </Container>
        </HeaderStyle>
      </header>
    </>
  );
}
