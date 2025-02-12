import Link from 'next/link'
import { Container } from 'styles/sharedstyles'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
interface BreadCrumpProps {
  title: string
}

export default function BreadCrump({ title }: BreadCrumpProps) {
  return (
    <>
      <Container>
        <div className="flex items-center pt-2 text-sm sm:text-base">
          <Link
            href="/"
            className="flex items-center text-gray-800 hover:underline underline-offset-4"
          >
            Home
          </Link>
          <ArrowForwardIosIcon className="text-gray-800 mx-1 text-xs" />
          <p className="text-gray-500">{title}</p>
        </div>
      </Container>
    </>
  )
}
