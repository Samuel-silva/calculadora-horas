import { Container } from "styles/sharedstyles"


export default function Footer() {
  const date = new Date()
  const year = date.getFullYear()

  return (
    <>
      <footer className="fixed bottom-0 left-0 h-5 bg-black w-full">
        <Container>
          <p className="text-center text-white text-xs py-1">© {year} - Todos direitos reservados</p>
        </Container>
      </footer>
    </>
  );
}
