import face_win from '../assets/misc/face_win.svg'
import face_lose from '../assets/misc/face_lose.svg'
import face_pressed from '../assets/misc/face_pressed.svg'
import face_unpressed from '../assets/misc/face_unpressed.svg'

import { useImage } from 'react-konva-utils'
import { useState } from 'react'
import React from 'react'
import { Image } from 'react-konva'
import { Observer } from '../engine/observer'
import { Align } from '../types'

export function StatusButton(props: {
    x: number
    y: number
    align: Align
    activateCallback: () => void
    // TODO: maybe add game state: initial, in_progress, win, loose
    winObserver: Observer<boolean>
}) {
    const textureProps = { width: 40, height: 40 }

    const [unpressedTexture, unpressedTextureLoaded] = useImage(face_unpressed)
    const [pressedTexture, pressedTextureLoaded] = useImage(face_pressed)
    const [_, loseTextureLoaded] = useImage(face_lose)
    const [winTexture, winTextureLoaded] = useImage(face_win)

    props.winObserver.subscribe((v) => {
        if (v) setTexture(winTexture)
    })

    React.useEffect(() => {
        setTexture(unpressedTexture)
    }, [
        [unpressedTextureLoaded, pressedTextureLoaded, loseTextureLoaded, winTextureLoaded].every(
            (v) => v == 'loaded'
        ),
    ])

    function onPress() {
        setTexture(pressedTexture)
    }

    function onRelease() {
        setTexture(unpressedTexture)
    }

    const [texture, setTexture] = useState(unpressedTexture)

    const { x, y } = props.align(
        { x: props.x, y: props.y },
        { x: props.x - textureProps.width, y: props.y }
    )

    return (
        <Image
            x={x}
            y={y}
            width={textureProps.width}
            height={textureProps.height}
            image={texture}
            onMouseDown={onPress}
            onMouseUp={onRelease}
        />
    )
}
