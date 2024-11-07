import Footer from "layout/footer";
import Header from "layout/header";
import Link from "next/link";
import { Container } from "styles/sharedstyles";

export default function Home() {
  return (
    <>
      <Header title="Jornada de trabalho"/>
      <main>
        <Container>
          <div className="flex justify-center flex-col sm:flex-row py-10">
            <Link href="/timer" className="bg-amber-500 hover:bg-amber-600 ease-linear duration-300 text-white text-center rounded-lg px-8 py-4">
              <i aria-hidden="true" className="material-symbols-outlined text-6xl md:text-8xl">timer</i>
              <p className="text-2xl md:text-4xl">Temporizador</p>
            </Link>

            <Link href="/calculator" className="bg-lime-500 hover:bg-lime-600 ease-linear duration-300 mt-4 sm:mt-0 sm:ml-8 text-white text-center rounded-lg px-8 py-4">
              <i aria-hidden="true" className="material-symbols-outlined text-6xl md:text-8xl">calculate</i>
              <p className="text-2xl md:text-4xl">Somar horas</p>
            </Link>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}
