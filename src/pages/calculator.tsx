import Header from "layout/header"
import SumHours from "components/SumHours"
import Footer from "layout/footer";
import BreadCrump from "components/BreadCrump"

export default function CalculatorPage() {
  const titlePage = 'Somar horas'
  return (
    <>
      <Header title={titlePage} />
      <main>
        <BreadCrump title={titlePage}  />
        <SumHours />
      </main>
      <Footer />
    </>
  )
}
