import { GameImpl } from '../engine/game'
import { Tile as GameTile } from '../engine/tile'
import { Tile } from './Tile'
import { useState } from 'react'

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
import { useImage } from 'react-konva-utils'
import React from 'react'

type Props = {
    game: GameImpl
}

export function GameField(props: Props) {
    const [unopenedTexture, unopenedTextureLoaded] = useImage(unopened)
    const [flagTexture, flagLoaded] = useImage(tile_flagged)
    const [mineTexture, tileMineLoaded] = useImage(tile_mine)

    const [tile0, tile0Loaded] = useImage(tile_0)
    const [tile1, tile1Loaded] = useImage(tile_1)
    const [tile2, tile2Loaded] = useImage(tile_2)
    const [tile3, tile3Loaded] = useImage(tile_3)
    const [tile4, tile4Loaded] = useImage(tile_4)
    const [tile5, tile5Loaded] = useImage(tile_5)
    const [tile6, tile6Loaded] = useImage(tile_6)
    const [tile7, tile7Loaded] = useImage(tile_7)
    const [tile8, tile8Loaded] = useImage(tile_8)

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

    function updateById(tiles: GameTile[]): void {
        const newField = [...field]
        for (const tile of tiles) {
            newField[tile.id] = tile
        }
        updateField(newField)
    }

    props.game.setRenderCallback(updateById)

    const f: GameTile[] = new Array(props.game.columns * props.game.rows)
    props.game.onRender((tile) => (f[tile.id] = tile))

    const [field, updateField] = useState(f)

    React.useEffect(() => {}, [
        [
            unopenedTextureLoaded,
            tileMineLoaded,
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
        ].every((v) => v == 'loaded'),
    ])

    function getTexture(tile: GameTile): CanvasImageSource {
        if (tile.isFlagged) {
            return flagTexture!
        }
        if (!tile.isRevealed) {
            return unopenedTexture!
        }
        if (tile.isMine) {
            return mineTexture!
        }
        return textures.get(tile.adjacentMines)!
    }

    return (
        <>
            {field.map((tile) => (
                <Tile
                    key={tile.id}
                    tile={tile}
                    isRevealed={tile.isRevealed}
                    texture={getTexture(tile)}
                    game={props.game}
                />
            ))}
        </>
    )
}
