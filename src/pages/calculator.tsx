import Header from "layout/header";
import Calculator from "components/Calculator";
import Footer from "layout/footer";
import BreadCrump from "components/BreadCrump";

export default function CalculatorPage() {
  const titlePage = 'Somar horas'
  return (
    <>
      <Header title={titlePage} />
      <main>
        <BreadCrump title={titlePage}  />
        <Calculator />
      </main>
      <Footer />
    </>
  )
}
