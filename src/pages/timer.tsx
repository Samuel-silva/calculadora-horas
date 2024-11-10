import BreadCrump from "components/BreadCrump";
import Footer from "layout/footer";
import Header from "layout/header";
import Link from "next/link";
import { Container } from "styles/sharedstyles";

export default function Timer() {
  const titlePage = 'Temporizador'

  return (
    <>
      <Header title={titlePage} />
      <main>
        <BreadCrump title={titlePage} />
      </main>
      <Footer />
    </>
  )
}
