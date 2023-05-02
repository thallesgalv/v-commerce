import { cn } from '@/utils/cn'

interface Props {
  images: string[]
  activeImage?: string
  setActiveImage: (state: string) => void
}

export default function ProductImageListComponent({
  images,
  activeImage,
  setActiveImage
}: Props) {
  return (
    <ul className="flex flex-wrap gap-2">
      {images?.length &&
        images.map((img, idx) => (
          <li key={idx} onClick={() => setActiveImage(img)}>
            <div
              className={cn(
                'h-16 w-16 bg-no-repeat bg-center bg-contain cursor-pointer',
                activeImage === img && 'border-2 border-purple-500'
              )}
              style={{ backgroundImage: `url(${img})` }}
            ></div>
          </li>
        ))}
    </ul>
  )
}
