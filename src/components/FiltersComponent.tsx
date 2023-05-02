import { useProductsContext } from '@/contexts/ProductsContext'
import { useRouter } from 'next/router'
import { FormEvent, useRef } from 'react'
import { BaseButton } from './Base/BaseButon'
import BaseInput from './Base/BaseInput'
import { BaseToggle } from './Base/BaseToggle'

export function FiltersComponent() {
  const { isWishlistFilterActive, setIsWishlistFilterActive } =
    useProductsContext()

  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (inputRef.current) {
      router.push({
        pathname: '/search',
        query: { q: inputRef.current.value }
      })
    }
  }

  function handleToggle() {
    setIsWishlistFilterActive(!isWishlistFilterActive)
  }

  return (
    <div className="container mx-auto flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
      <div className="flex min-w-fit gap-1">
        <span className="text-xs">Filtrar por favoritos:</span>
        <div onClick={handleToggle}>
          <BaseToggle />
        </div>
      </div>

      <form className="flex w-full gap-2" onSubmit={handleSubmit}>
        <BaseInput
          placeholder="Busque um produto"
          type="search"
          required
          ref={inputRef}
        />
        <BaseButton variant="primary" type="submit">
          Buscar
        </BaseButton>
      </form>
    </div>
  )
}
