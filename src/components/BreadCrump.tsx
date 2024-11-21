import Link from 'next/link'
import { Container } from 'styles/sharedstyles'
import HomeOutlined from '@mui/icons-material/Home'
interface BreadCrumpProps {
  title: string
}

export default function BreadCrump({ title }: BreadCrumpProps) {
  return (
    <>
      <Container>
        <div className="flex items-center pt-2">
          <Link href="/" className="flex items-center mr-1 text-primary">
            <HomeOutlined
              className="text-primary mr-1"
              style={{ fontSize: 'clamp(22px, 2vw, 24px)' }}
            />
            <span className="text-base sm:text-lg">Home</span>
          </Link>
          <p className="text-base sm:text-lg text-gray-500">/ {title}</p>
        </div>
      </Container>
    </>
  )
}
