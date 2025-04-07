import { Image } from 'react-konva'
import { ClickParam, Tile as GameTile } from '../engine/tile'
import { Game } from '../engine/game'

import { KonvaEventObject } from 'konva/lib/Node'
import { useRef } from 'react'

type Props = {
    tile: GameTile
    isRevealed: boolean
    texture: CanvasImageSource
    game: Game
}

const width = 20
const height = 20

export function Tile(props: Props) {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    function onMouseClick(e: KonvaEventObject<MouseEvent>) {
        const clickParam = e.evt.button == 2 ? ClickParam.RIGHT : ClickParam.LEFT
        props.game.onClick(props.tile, clickParam)
    }

    function onTouchStart() {
        timeoutRef.current = setTimeout(() => {
            props.game.onClick(props.tile, ClickParam.RIGHT)
        }, 300)
    }

    function onTouchEnd() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
            props.game.onClick(props.tile, ClickParam.LEFT)
        }
    }

    return (
        <Image
            x={props.tile.row * width}
            y={props.tile.column * height}
            width={width}
            height={height}
            image={props.texture}
            onMouseDown={onMouseClick}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
        />
    )
}
