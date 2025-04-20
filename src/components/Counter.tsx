import { Image } from 'react-konva'
import { useImage } from 'react-konva-utils'

import background from '../assets/display/nums_background.svg'
import display0 from '../assets/display/d0.svg'
import display1 from '../assets/display/d1.svg'
import display2 from '../assets/display/d2.svg'
import display3 from '../assets/display/d3.svg'
import display4 from '../assets/display/d4.svg'
import display5 from '../assets/display/d5.svg'
import display6 from '../assets/display/d6.svg'
import display7 from '../assets/display/d7.svg'
import display8 from '../assets/display/d8.svg'
import display9 from '../assets/display/d9.svg'
import React, { useState } from 'react'

export function Counter(props: { x: number; y: number; height: number; alightRight?: boolean }) {
    const backgroundProps = { width: 173, height: 108 }
    const backgroundWidth = (props.height / backgroundProps.height) * backgroundProps.width

    const segmentProps = { width: 52, height: 99 }
    const segmentWidth = (props.height / segmentProps.height) * segmentProps.width

    const [backgroundTexture, backgroundTextureLoaded] = useImage(background)

    const [display0Texture, display0TextureLoaded] = useImage(display0)
    const [display1Texture, display1TextureLoaded] = useImage(display1)
    const [display2Texture, display2TextureLoaded] = useImage(display2)
    const [display3Texture, display3TextureLoaded] = useImage(display3)
    const [display4Texture, display4TextureLoaded] = useImage(display4)
    const [display5Texture, display5TextureLoaded] = useImage(display5)
    const [display6Texture, display6TextureLoaded] = useImage(display6)
    const [display7Texture, display7TextureLoaded] = useImage(display7)
    const [display8Texture, display8TextureLoaded] = useImage(display8)
    const [display9Texture, display9TextureLoaded] = useImage(display9)

    const [texture, setTexture] = useState(display0Texture)

    React.useEffect(() => {}, [
        [
            display0TextureLoaded,
            display1TextureLoaded,
            display2TextureLoaded,
            display3TextureLoaded,
            display4TextureLoaded,
            display5TextureLoaded,
            display6TextureLoaded,
            display7TextureLoaded,
            display8TextureLoaded,
            display9TextureLoaded,
        ].every((v) => v == 'loaded'),
    ])

    return (
        <Image
            x={props.x - (props.alightRight ? backgroundWidth : 0)}
            y={props.y}
            width={backgroundWidth}
            height={props.height}
            image={backgroundTexture}
        />
    )
}
