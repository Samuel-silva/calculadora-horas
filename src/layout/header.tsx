import Head from "next/head"
import {
  Container
} from "components/sharedstyles";

export default function Header() {
  return (
    <>
      <Head>
        <title>Calculadora de horas</title>
        <meta name="description" content="Calculadora de horas" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-indigo-300">
        <Container>
          <h1 className="text-4xl py-3">Calculadora de horas trabalhadas</h1>
        </Container>
      </header>
    </>
  );
}
