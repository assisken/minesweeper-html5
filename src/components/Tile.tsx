import { Image } from 'react-konva'
import { ClickParam, TileImpl as GameTile } from '../engine/tile'
import { Game } from '../engine/game'

import { KonvaEventObject } from 'konva/lib/Node'
import { useRef } from 'react'

type Props = {
    x: number
    y: number
    width: number
    height: number

    tile: GameTile
    isRevealed: boolean
    texture: CanvasImageSource
    game: Game
}

export function Tile(props: Props) {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    function onMouseDown() {
        return props.game.onClick(props.tile, ClickParam.PRESS)
    }

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
            x={props.x}
            y={props.y}
            width={props.width}
            height={props.height}
            image={props.texture}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseClick}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
        />
    )
}
