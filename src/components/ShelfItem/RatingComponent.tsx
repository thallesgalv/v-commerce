import { BaseIcon } from '../Base/BaseIcon'

interface Props {
  rating: number
}

export function RatingComponent({ rating }: Props) {
  const fullStars = Math.floor(rating)
  const halfStar = rating % 1 !== 0
  const emptyStars = Math.floor(5 - rating)

  const starStyle = 'text-yellow-500'

  return (
    <div className="flex">
      {[...Array(fullStars)].map((_, i) => (
        <span key={i} className={starStyle}>
          <BaseIcon icon="material-symbols:star" />
        </span>
      ))}
      {halfStar && (
        <span className={starStyle}>
          <BaseIcon icon="material-symbols:star-half-outline" />
        </span>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={i} className={starStyle}>
          <BaseIcon icon="material-symbols:star-outline" />
        </span>
      ))}
    </div>
  )
}
