import { Container } from 'styles/sharedstyles'

export default function Footer() {
  const date = new Date()
  const year = date.getFullYear()

  return (
    <>
      <footer className="absolute bottom-0 left-0 h-6 bg-gray-100 w-full">
        <Container>
          <p className="text-center text-black text-xs h-6 flex justify-center items-center">
            © {year} - Todos direitos reservados
          </p>
        </Container>
      </footer>
    </>
  )
}
