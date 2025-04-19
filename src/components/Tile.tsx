import { Image } from 'react-konva'
import { ActionType, Tile as GameTile } from '../engine/tile'
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

    function onMouseDown(e: KonvaEventObject<MouseEvent>) {
        const openType = e.evt.button == 2 ? ActionType.FLAG : ActionType.PRESS
        return props.game.onClick(props.tile, openType)
    }

    function onMouseClick(e: KonvaEventObject<MouseEvent>) {
        const openType = e.evt.button == 2 ? ActionType.FLAG : ActionType.REVEAL
        if (openType == ActionType.FLAG) return
        props.game.onClick(props.tile, openType)
    }

    function onTouchStart() {
        timeoutRef.current = setTimeout(() => {
            props.game.onClick(props.tile, ActionType.FLAG)
        }, 300)
    }

    function onTouchEnd() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
            props.game.onClick(props.tile, ActionType.REVEAL)
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
