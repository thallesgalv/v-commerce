import { useState } from 'react'

interface Props {
  imageSrc: string
  imageName: string
}

export function ZoomOnHoverComponent({ imageSrc, imageName }: Props) {
  const [transform, setTransform] = useState('')
  const [transformOrigin, setTransformOrigin] = useState('center center')

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    let div = e.target as HTMLDivElement
    let posX = e.clientX - div.offsetLeft
    let posY = e.clientY - div.offsetTop

    setTransformOrigin(`${posX}px ${posY}px`)
    setTransform('scale(1.7)')
  }

  function handleMouseLeave() {
    setTransformOrigin('center')
    setTransform('scale(1)')
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="h-96 w-full overflow-hidden hover:cursor-zoom-in md:h-min"
    >
      <div
        style={{
          transformOrigin: transformOrigin,
          transform: transform,
          transition: 'transform 0.3s ease-out',
          background: `no-repeat center/contain url(${imageSrc})`
        }}
        className="h-96 origin-center object-contain md:h-[32rem] lg:w-[32rem] "
        role={imageName}
      />
    </div>
  )
}
