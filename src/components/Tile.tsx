import { useState } from 'react'
import { Image } from 'react-konva'
import { useImage } from 'react-konva-utils'
import React from 'react'
import { ClickParam, Tile as GameTile } from '../engine/tile'

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
import tile_mine from '../assets/svg/Minesweeper_mine.svg'
import tile_flagged from '../assets/svg/Minesweeper_flag.svg'
import { KonvaEventObject } from 'konva/lib/Node'

interface props {
    tile: GameTile
}

export function Tile({ tile }: props) {
    const width = 20
    const height = 20

    const [unopenedTexture, unopenedTextureLoaded] = useImage(unopened)
    const [tile0, tile0Loaded] = useImage(tile_0)
    const [tile1, tile1Loaded] = useImage(tile_1)
    const [tile2, tile2Loaded] = useImage(tile_2)
    const [tile3, tile3Loaded] = useImage(tile_3)
    const [tile4, tile4Loaded] = useImage(tile_4)
    const [tile5, tile5Loaded] = useImage(tile_5)
    const [tile6, tile6Loaded] = useImage(tile_6)
    const [tile7, tile7Loaded] = useImage(tile_7)
    const [tile8, tile8Loaded] = useImage(tile_8)
    const [flagTexture, flagLoaded] = useImage(tile_flagged)
    const [tileMine, tileMineLoaded] = useImage(tile_mine)

    const [image, setImage] = useState(unopenedTexture)

    const textures = new Map([
        [0, tile0],
        [1, tile1],
        [2, tile2],
        [3, tile3],
        [4, tile4],
        [5, tile5],
        [6, tile6],
        [7, tile7],
        [8, tile8],
    ])

    React.useEffect(() => {
        setImage(unopenedTexture)
    }, [
        [
            unopenedTextureLoaded,
            flagLoaded,
            tile0Loaded,
            tile1Loaded,
            tile2Loaded,
            tile3Loaded,
            tile4Loaded,
            tile5Loaded,
            tile6Loaded,
            tile7Loaded,
            tile8Loaded,
            tileMineLoaded,
        ].every((v) => v == 'loaded'),
    ])

    function useTap(e: KonvaEventObject<MouseEvent>) {
        const clickParam = e.evt.button == 2 ? ClickParam.RIGHT : ClickParam.LEFT
        tile.onTrigger(clickParam)

        if (tile.isFlagged) {
            setImage(flagTexture)
            return
        }

        if (!tile.isRevealed) {
            setImage(unopenedTexture)
            return
        }

        if (tile.isRevealed && tile.isMine) {
            setImage(tileMine)
            return
        }

        const texture = textures.get(tile.adjacentMines)
        if (!texture) {
            throw new Error(
                `texture "${tile.adjacentMines}" not found in map ${Array.from(textures.keys())}`
            )
        }

        setImage(texture)
    }

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
