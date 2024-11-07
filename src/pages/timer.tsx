import Header from "layout/header";
import Link from "next/link";
import { Container } from "styles/sharedstyles";

export default function Home() {
  return (
    <>
      <Header title="Temporizador" />
      <Container>
        <Link href="/calculator">Somar horas</Link>
        <Link href="/calculator">Somar horas</Link>
      </Container>
    </>
  )
}
