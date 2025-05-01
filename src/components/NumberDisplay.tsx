import { Image } from 'react-konva'
import { useImage } from 'react-konva-utils'

import background from '../assets/display/nums_background.svg'
import { Segment } from './Segment'
import React, { useState } from 'react'
import { Observer } from '../engine/observer'
import { Align } from '../types'

export function NumberDisplay(props: {
    x: number
    y: number
    height: number
    number: Observer<number>
    align: Align
}) {
    const backgroundProps = { width: 173, height: 108 }
    const backgroundWidth = (props.height / backgroundProps.height) * backgroundProps.width

    const [number, setNumber] = useState(props.number.value)
    props.number.subscribe((v) => setNumber(v))

    function segmentProps(n: number) {
        const segmentPadding = 20
        const offset = 34

        const { x, y } = props.align(
            { x: props.x + n * segmentPadding - offset, y: props.y },
            { x: props.x + n * segmentPadding - offset - backgroundWidth, y: props.y }
        )

        return {
            x: x,
            y: y + 3,
            width: 52,
            height: props.height - 6,
        }
    }
    const firstSegment = segmentProps(1)
    const secondSegment = segmentProps(2)
    const thirdSegment = segmentProps(3)

    const [backgroundTexture, backgroundTextureLoaded] = useImage(background)

    React.useEffect(() => {}, [[backgroundTextureLoaded].every((v) => v == 'loaded')])

    const { x, y } = props.align(
        { x: props.x, y: props.y },
        { x: props.x - backgroundWidth, y: props.y }
    )

    return (
        <>
            <Image
                x={x}
                y={y}
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
