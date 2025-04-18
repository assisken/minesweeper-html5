import { Rect } from 'react-konva'
import { useImage } from 'react-konva-utils'
import closed from '../assets/cells/closed.svg'
import React, { useState } from 'react'

type Props = {
    x: number
    y: number
    width: number
    height: number
}

export function Header(props: Props) {
    const [unopenedTexture, unopenedTextureLoaded] = useImage(closed)
    const [texture, setTexture] = useState(unopenedTexture)
    const [textureWidth, setTextureWidth] = useState(1)

    React.useEffect(() => {
        setTexture(unopenedTexture)
    }, [unopenedTextureLoaded != 'loaded'])

    return (
        <Rect
            x={props.x}
            y={props.y}
            width={props.width}
            height={props.height}
            fillPatternImage={texture}
        />
    )
}
