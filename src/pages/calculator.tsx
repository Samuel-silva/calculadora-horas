import Header from "layout/header";
import Calculator from "components/calculator";
import Footer from "layout/footer";

export default function Home() {
  return (
    <>
      <Header title="Somar horas" />
      <main>
        <Calculator />
      </main>
      <Footer />
    </>
  )
}
