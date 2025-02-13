import Footer from 'layout/footer'
import Header from 'layout/header'
import Link from 'next/link'
import { Container } from 'styles/sharedstyles'
import Timer from '@mui/icons-material/TimerOutlined'
import Calculate from '@mui/icons-material/CalculateOutlined'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Container>
          <div className="flex flex-col py-10">
            <Link
              href="/timer"
              className="bg-indigo-50 hover:bg-indigo-100 ease-linear duration-300 text-gray-800 text-center rounded px-8 py-4 flex mt-4 items-center"
            >
              <Timer className="mr-2 text-2xl md:text-4xl" />
              <p className="text-xl md:text-2xl">Temporizador</p>
            </Link>

            <Link
              href="/calculator"
              className="bg-indigo-50 hover:bg-indigo-100 ease-linear duration-300 text-gray-800 text-center rounded px-8 py-4 flex mt-4 items-center"
            >
              <Calculate className="mr-2 text-2xl md:text-4xl" />
              <p className="text-xl md:text-2xl">Horas trabalhadas</p>
            </Link>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}
