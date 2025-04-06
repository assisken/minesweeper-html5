import { useState } from 'react'
import { Image } from 'react-konva'
import { useImage } from 'react-konva-utils'
import React from 'react'

interface props {
  x: number
  y: number
  texture: string
}

export function GeneralBox({ x, y, texture }: props) {
  const width = 20
  const height = 20

  const [image] = useImage(texture)
  const [canvasImage, setCanvasImage] = useState(image)

  function tap() {
    console.log('tap')
  }

  React.useEffect(() => {
    setCanvasImage(image)
  })

  return (
    <Image
      x={x * width}
      y={y * height}
      width={width}
      height={height}
      image={canvasImage}
      onMouseDown={tap}
    />
  )
}
