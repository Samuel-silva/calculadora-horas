import Header from 'layout/header'
import SumHours from 'components/SumHours'
import Footer from 'layout/footer'
import BreadCrump from 'components/BreadCrump'
import { Container } from 'styles/sharedstyles'

export default function CalculatorPage() {
  const titlePage = 'Calculadora de horas'
  const subTitlePage = 'Horas trabalhadas'

  return (
    <>
      <Header title={titlePage} />
      <main>
        <BreadCrump title={subTitlePage} />
        <Container>
          <h2 className="text-xl md:text-2xl xl:text-3xl font-semibold text-gray-700 pt-6 sm:pt-8">
            Horas trabalhadas
          </h2>
        </Container>
        <SumHours />
        <Container>
          <p className="text-sm sm:text-base py-4 sm:py-6">
            Nesta página, você pode calcular facilmente o total de horas
            trabalhadas ao longo do dia. Basta inserir seus horários de entrada
            e saída, incluindo até 5 intervalos, e o sistema fará o cálculo
            automaticamente para você. Ideal para quem precisa acompanhar sua
            jornada de trabalho com precisão e praticidade.
          </p>
        </Container>
      </main>
      <Footer />
    </>
  )
}
