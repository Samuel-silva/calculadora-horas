import BreadCrump from "components/BreadCrump"
import Footer from "layout/footer"
import Header from "layout/header"
import Timer from "components/Timer"

export default function TimerPage() {
  const titlePage = 'Temporizador'

  return (
    <>
      <Header title={titlePage} />
      <main>
        <BreadCrump title={titlePage} />
        <Timer />
      </main>
      <Footer />
    </>
  )
}
