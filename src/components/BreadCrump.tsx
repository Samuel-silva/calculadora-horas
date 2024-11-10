import Link from "next/link";
import { Container } from "styles/sharedstyles";

interface BreadCrumpProps {
  title: string
}

export default function BreadCrump({ title }: BreadCrumpProps) {
  return (
    <>
      <Container>
        <div className="flex items-center pt-2">
          <Link href="/" className="flex items-center mr-1 text-indigo-800">
            <i aria-hidden="true" className="material-symbols-outlined material-symbols-fill text-2xl pr-1">home</i>
            <span className="text-lg pt-0.5">Home</span>
          </Link>
          <p className="text-gray-500">/ {title}</p>
        </div>
      </Container>
    </>
  )
}
