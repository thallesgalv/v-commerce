import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">Página não encontrada</h1>
      <Link href="/" className="text-purple-500 underline">
        Voltar para home
      </Link>
    </div>
  )
}
