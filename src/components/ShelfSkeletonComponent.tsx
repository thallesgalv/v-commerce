import { ShelfItemSkeletonComponent } from './ShelfItem/ShelfItemSkeletonComponent'

interface Props {
  items: number
}

export function ShelfSkeletonComponent({ items }: Props) {
  const list = [...Array(items)].map((_, i) => i + 1)

  return (
    <ul className="mt-4 grid gap-4 md:grid-cols-3 xl:grid-cols-5">
      {list?.map((i) => (
        <li key={i}>
          <ShelfItemSkeletonComponent />
        </li>
      ))}
    </ul>
  )
}
