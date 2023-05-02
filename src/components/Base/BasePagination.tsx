import { cn } from '@/utils/cn'

interface Props {
  maxProducts: number
  currentPage: number
  limitPerPage: number
  goToNextPage: () => void
  goToPrevPage: () => void
}

export function BasePagination({
  maxProducts,
  currentPage,
  goToNextPage,
  goToPrevPage,
  limitPerPage
}: Props) {
  const totalPages = Math.ceil(maxProducts / limitPerPage)
  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages

  return (
    <div className="my-4 flex justify-center gap-2">
      <button
        onClick={goToPrevPage}
        disabled={isFirstPage}
        className={cn(
          'underline',
          isFirstPage && 'pointer-events-none opacity-50'
        )}
      >
        Anterior
      </button>

      <span>
        Página {currentPage} de {totalPages || 1}
      </span>

      <button
        className={cn(
          'underline',
          isLastPage && 'pointer-events-none opacity-50'
        )}
        disabled={isLastPage}
        onClick={goToNextPage}
      >
        Próxima
      </button>
    </div>
  )
}
