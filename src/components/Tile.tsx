import { useState } from 'react'
import { Image } from 'react-konva'
import { useImage } from 'react-konva-utils'
import React from 'react'
import { ClickParam, Tile as GameTile, TileType } from '../engine/tile'

import unopened from '../assets/svg/Minesweeper_unopened_square.svg'
import tile_0 from '../assets/svg/Minesweeper_0.svg'
import tile_1 from '../assets/svg/Minesweeper_1.svg'
import tile_2 from '../assets/svg/Minesweeper_2.svg'
import tile_3 from '../assets/svg/Minesweeper_3.svg'
import tile_4 from '../assets/svg/Minesweeper_4.svg'
import tile_5 from '../assets/svg/Minesweeper_5.svg'
import tile_6 from '../assets/svg/Minesweeper_6.svg'
import tile_7 from '../assets/svg/Minesweeper_7.svg'
import tile_8 from '../assets/svg/Minesweeper_8.svg'
import tile_flagged from '../assets/svg/Minesweeper_flag.svg'
import { KonvaEventObject } from 'konva/lib/Node'

interface props {
  tile: GameTile
}

export function Tile({ tile }: props) {
  const width = 20
  const height = 20

  const [unopenedTexture, unopenedTextureLoaded] = useImage(unopened)
  const [image, setImage] = useState(unopenedTexture)

  const [flagTexture] = useImage(tile_flagged)

  const textures = new Map<
    TileType,
    [undefined | HTMLImageElement, 'loaded' | 'loading' | 'failed']
  >([
    [TileType.ZERO, useImage(tile_0)],
    [TileType.ONE, useImage(tile_1)],
    [TileType.TWO, useImage(tile_2)],
    [TileType.THREE, useImage(tile_3)],
    [TileType.FOUR, useImage(tile_4)],
    [TileType.FIVE, useImage(tile_5)],
    [TileType.SIX, useImage(tile_6)],
    [TileType.SEVEN, useImage(tile_7)],
    [TileType.EIGHT, useImage(tile_8)],
  ])

  function useTap(e: KonvaEventObject<MouseEvent>) {
    const clickParam = e.evt.button == 2 ? ClickParam.RIGHT : ClickParam.LEFT
    tile.onClick(clickParam)

    if (tile.isFlagged) {
      setImage(flagTexture)
      return
    }

    const texture = textures.get(tile.type)
    if (!texture) {
      throw new Error('texture not found')
    }

    const [actualTexture] = texture
    setImage(actualTexture)
  }

  React.useEffect(() => {
    setImage(unopenedTexture)
  }, [unopenedTextureLoaded == 'loaded'])

  return (
    <Image
      x={tile.row * width}
      y={tile.column * height}
      width={width}
      height={height}
      image={image}
      onMouseDown={useTap}
    />
  )
}
