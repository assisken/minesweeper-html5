import { Image } from 'react-konva'
import { useImage } from 'react-konva-utils'

import background from '../assets/display/nums_background.svg'
import { Segment } from './Segment'
import React, { useState } from 'react'
import { Observer } from '../engine/observer'

export function NumberDisplay(props: {
    x: number
    y: number
    height: number
    number: Observer<number>
    alightRight?: boolean
}) {
    const backgroundProps = { width: 173, height: 108 }
    const backgroundWidth = (props.height / backgroundProps.height) * backgroundProps.width

    const [number, setNumber] = useState(props.number.value)
    props.number.subscribe((v) => setNumber(v))

    function segmentProps(n: number) {
        const segmentPadding = 20
        const offset = 34

        return {
            x: props.x - (props.alightRight ? backgroundWidth : 0) + n * segmentPadding - offset,
            y: props.y + 3,
            width: 52,
            height: props.height - 6,
        }
    }
    const firstSegment = segmentProps(1)
    const secondSegment = segmentProps(2)
    const thirdSegment = segmentProps(3)

    const [backgroundTexture, backgroundTextureLoaded] = useImage(background)

    React.useEffect(() => {}, [[backgroundTextureLoaded].every((v) => v == 'loaded')])

    return (
        <>
            <Image
                x={props.x - (props.alightRight ? backgroundWidth : 0)}
                y={props.y}
                width={backgroundWidth}
                height={props.height}
                image={backgroundTexture}
            />
            <Segment
                x={firstSegment.x}
                y={firstSegment.y}
                height={firstSegment.height}
                displayNumber={Math.floor(number / 100) % 10}
            />
            <Segment
                x={secondSegment.x}
                y={secondSegment.y}
                height={secondSegment.height}
                displayNumber={Math.floor(number / 10) % 10}
            />
            <Segment
                x={thirdSegment.x}
                y={thirdSegment.y}
                height={thirdSegment.height}
                displayNumber={number % 10}
            />
        </>
    )
}
