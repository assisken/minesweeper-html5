import { useImage } from 'react-konva-utils'
import { Image } from 'react-konva'
import { useState } from 'react'
import React from 'react'

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

export function Segment(props: { displayNumber: number; x: number; y: number; height: number }) {
    const segmentProps = { width: 52, height: 99 }
    const actualWidth = (props.height / props.height) * segmentProps.width

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

    React.useEffect(() => {
        setTexture(textureByNumber.get(props.displayNumber))
    }, [
        props.displayNumber,
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

    const textureByNumber = new Map([
        [0, display0Texture],
        [1, display1Texture],
        [2, display2Texture],
        [3, display3Texture],
        [4, display4Texture],
        [5, display5Texture],
        [6, display6Texture],
        [7, display7Texture],
        [8, display8Texture],
        [9, display9Texture],
    ])

    const [texture, setTexture] = useState(display0Texture)

    return (
        <>
            <Image
                x={props.x}
                y={props.y}
                width={actualWidth}
                height={props.height}
                image={texture}
            />
        </>
    )
}
