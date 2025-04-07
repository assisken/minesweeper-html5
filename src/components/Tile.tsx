import { Image } from 'react-konva'
import React from 'react'
import { ClickParam, Tile as GameTile } from '../engine/tile'

import { KonvaEventObject } from 'konva/lib/Node'

type Props = {
    tile: GameTile
    isRevealed: boolean
    texture: CanvasImageSource
}

const width = 20
const height = 20

export function Tile(props: Props) {
    function useTap(e: KonvaEventObject<MouseEvent>) {
        const clickParam = e.evt.button == 2 ? ClickParam.RIGHT : ClickParam.LEFT
        props.tile.onTrigger(clickParam)
    }

    return (
        <Image
            x={props.tile.row * width}
            y={props.tile.column * height}
            width={width}
            height={height}
            image={props.texture}
            onMouseDown={useTap}
        />
    )
}
