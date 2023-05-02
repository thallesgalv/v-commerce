import { Breadcumb } from '@/interfaces/Breadcumb'
import Link from 'next/link'

interface Props {
  breadcumb: Breadcumb
}

export function BreadcumbComponent({ breadcumb }: Props) {
  return (
    <div className="flex items-center gap-1 text-xs">
      <span className="underline">
        <Link href="/">Produtos</Link>
      </span>
      {breadcumb?.category && (
        <span className="flex items-center gap-1 capitalize">
          &gt;
          {breadcumb?.product ? (
            <Link
              className="underline"
              href={`/categories/${breadcumb.category}`}
            >
              {breadcumb.category}
            </Link>
          ) : (
            <span>{breadcumb.category}</span>
          )}
        </span>
      )}
      {breadcumb?.searchTerm && (
        <div className="flex items-center gap-1">
          &gt;
          <span>{breadcumb.searchTerm}</span>
        </div>
      )}
      {breadcumb?.product && (
        <div className="flex items-center gap-1">
          &gt;
          <span>{breadcumb.product}</span>
        </div>
      )}
    </div>
  )
}
