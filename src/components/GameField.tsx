import { GameImpl } from '../engine/game'
import { Tile as GameTile, TileType as GameTileType } from '../engine/tile'
import { Tile } from './Tile'
import { useState } from 'react'

import closed from '../assets/cells/closed.svg'
import pressed from '../assets/cells/pressed.svg'
import tile_0 from '../assets/cells/cell0.svg'
import tile_1 from '../assets/cells/cell1.svg'
import tile_2 from '../assets/cells/cell2.svg'
import tile_3 from '../assets/cells/cell3.svg'
import tile_4 from '../assets/cells/cell4.svg'
import tile_5 from '../assets/cells/cell5.svg'
import tile_6 from '../assets/cells/cell6.svg'
import tile_7 from '../assets/cells/cell7.svg'
import tile_8 from '../assets/cells/cell8.svg'
import tile_mine from '../assets/cells/mine.svg'
import tile_flagged from '../assets/cells/flag.svg'
import { useImage } from 'react-konva-utils'
import React from 'react'

type Props = {
    x: number
    y: number
    game: GameImpl
}

export function GameField(props: Props) {
    const [closedTexture, closedTextureLoaded] = useImage(closed)
    const [pressedTexture, pressedTextureLoaded] = useImage(pressed)
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
            closedTextureLoaded,
            pressedTextureLoaded,
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

    function getTexture(tileType: GameTileType): CanvasImageSource {
        switch (tileType) {
            case GameTileType.PRESSED:
                return pressedTexture!
            case GameTileType.FLAG:
                return flagTexture!
            case GameTileType.CLOSED:
                return closedTexture!
            case GameTileType.MINE:
                return mineTexture!
            case GameTileType.ZERO:
                return tile0!
            case GameTileType.ONE:
                return tile1!
            case GameTileType.TWO:
                return tile2!
            case GameTileType.THREE:
                return tile3!
            case GameTileType.FOUR:
                return tile4!
            case GameTileType.FIVE:
                return tile5!
            case GameTileType.SIX:
                return tile6!
            case GameTileType.SEVEN:
                return tile7!
            case GameTileType.EIGHT:
                return tile8!
            case GameTileType.MINE:
                return mineTexture!
            default:
                return closedTexture!
        }
    }

    return (
        <>
            {field.map((tile) => (
                <Tile
                    x={props.x + tile.row * 20}
                    y={props.y + tile.column * 20}
                    width={20}
                    height={20}
                    key={tile.id}
                    tile={tile}
                    isRevealed={tile.isRevealed}
                    texture={getTexture(tile.visibleType)}
                    game={props.game}
                />
            ))}
        </>
    )
}
