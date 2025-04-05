import { useState } from 'react'
import { Image } from 'react-konva'
import { useImage } from 'react-konva-utils'
import mine from '../assets/svg/Minesweeper_unopened_square.svg'
import React from 'react'

export function GeneralBox() {
  React.useEffect(() => {
    setCanvgImage(image)
  })

  const [image] = useImage(mine)
  const [canvgImage, setCanvgImage] = useState(image)

  function tap() {
    console.log('tap')
  }

  return <Image x={1} y={1} width={20} height={20} image={canvgImage} onMouseDown={tap} />
}
