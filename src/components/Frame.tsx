import { Image, Rect } from 'react-konva'
import { useImage } from 'react-konva-utils'
import cornerUpLeft from '../assets/area/corner_up_left_2x.png'
import cornerUpRight from '../assets/area/corner_up_right_2x.png'
import cornerMiddleLeft from '../assets/area/t_left_2x.png'
import cornerMiddleRight from '../assets/area/t_right_2x.png'
import cornerBottomLeft from '../assets/area/corner_bottom_left_2x.png'
import cornerBottomRight from '../assets/area/corner_bottom_right_2x.png'
import horizontal from '../assets/area/border_hor_2x.png'
import vertical from '../assets/area/border_vert_2x.png'
import React from 'react'

type Props = {
    x: number
    y: number
    width: number
    height: number
    headerHeight: number
}

// Schema:
//     2
// 1-╔══════════════════════════╗-3
// 4-║ ┏━━━━━┓   ┏━━┓   ┏━━━━━┓ ║-4
//   ║ ┗━━━━━┛   ┗━━┛   ┗━━━━━┛ ║
// 5-╠══════════════════════════╣-6
//   ║  2^                      ║
// 4-║     <- actual game ->    ║-4
// 7-╚══════════════════════════╝-8
//      ^2

export function Frame(props: Props) {
    const cornerProps = { width: 24, height: 22 }

    // 1:
    const [cornerUpLeftTexture, cornerUpLeftTextureLoaded] = useImage(cornerUpLeft)
    const cornerUpLeftTextureProps = cornerProps

    // 3:
    const [cornerUpRightTexture, cornerUpRightTextureLoaded] = useImage(cornerUpRight)
    const cornerUpRightTextureProps = cornerProps

    // 5:
    const [cornerMiddleLeftTexture, cornerMiddleLeftTextureLoaded] = useImage(cornerMiddleLeft)
    const cornerMiddleLeftTextureProps = cornerProps

    // 6:
    const [cornerMiddleRightTexture, cornerMiddleRightTextureLoaded] = useImage(cornerMiddleRight)
    const cornerMiddleRightTextureProps = cornerProps

    // 7:
    const [cornerBottomLeftTexture, cornerBottomLeftTextureLoaded] = useImage(cornerBottomLeft)
    const cornerBottomLeftTextureProps = cornerProps

    // 8:
    const [cornerBottomRightTexture, cornerBottomRightTextureLoaded] = useImage(cornerBottomRight)
    const cornerBottomRightTextureProps = cornerProps

    // 2:
    const [horizontalTexture, horizontalTextureLoaded] = useImage(horizontal)
    const horizontalTextureProps = {
        width: props.width - cornerUpLeftTextureProps.width - cornerUpRightTextureProps.width,
        height: 22,
    }

    // 4:
    const [verticalTexture, verticalTextureLoaded] = useImage(vertical)
    const headerVerticalTextureProps = {
        width: 24,
        height:
            props.headerHeight -
            cornerUpLeftTextureProps.height -
            cornerMiddleLeftTextureProps.height,
    }
    const gameVerticalTextureProps = { width: 24, height: props.height - props.headerHeight }

    const backgroundProps = { width: props.width, height: props.headerHeight }

    React.useEffect(() => {}, [
        [
            cornerUpLeftTextureLoaded,
            cornerUpRightTextureLoaded,
            horizontalTextureLoaded,
            verticalTextureLoaded,
            cornerMiddleLeftTextureLoaded,
            cornerMiddleRightTextureLoaded,
            cornerBottomLeftTextureLoaded,
            cornerBottomRightTextureLoaded,
        ].every((v) => v == 'loaded'),
    ])

    return (
        <>
            <Rect
                x={props.x}
                y={props.y}
                width={backgroundProps.width}
                height={backgroundProps.height}
                fill={'silver'}
            />
            <Image
                x={props.x}
                y={props.y}
                width={cornerUpLeftTextureProps.width}
                height={cornerUpLeftTextureProps.height}
                image={cornerUpLeftTexture}
            />
            <Image
                x={props.x + cornerUpLeftTextureProps.width}
                y={props.y}
                width={horizontalTextureProps.width}
                height={horizontalTextureProps.height}
                image={horizontalTexture}
            />
            <Image
                x={props.x + cornerUpLeftTextureProps.width + horizontalTextureProps.width}
                y={props.y}
                width={cornerUpRightTextureProps.width}
                height={cornerUpRightTextureProps.height}
                image={cornerUpRightTexture}
            />
            <Image
                x={props.x}
                y={cornerUpLeftTextureProps.height}
                width={headerVerticalTextureProps.width}
                height={headerVerticalTextureProps.height}
                image={verticalTexture}
            />
            <Image
                x={props.x + cornerUpLeftTextureProps.width + horizontalTextureProps.width}
                y={cornerUpLeftTextureProps.height}
                width={headerVerticalTextureProps.width}
                height={headerVerticalTextureProps.height}
                image={verticalTexture}
            />
            <Image
                x={props.x}
                y={cornerUpLeftTextureProps.height + headerVerticalTextureProps.height}
                width={cornerMiddleLeftTextureProps.width}
                height={cornerMiddleLeftTextureProps.height}
                image={cornerMiddleLeftTexture}
            />
            <Image
                x={props.x + cornerMiddleLeftTextureProps.width}
                y={cornerUpLeftTextureProps.height + headerVerticalTextureProps.height}
                width={horizontalTextureProps.width}
                height={horizontalTextureProps.height}
                image={horizontalTexture}
            />
            <Image
                x={props.x + cornerMiddleLeftTextureProps.width + horizontalTextureProps.width}
                y={cornerUpLeftTextureProps.height + headerVerticalTextureProps.height}
                width={cornerMiddleRightTextureProps.width}
                height={cornerMiddleRightTextureProps.height}
                image={cornerMiddleRightTexture}
            />

            <Image
                x={props.x}
                y={
                    cornerUpLeftTextureProps.height +
                    headerVerticalTextureProps.height +
                    cornerMiddleLeftTextureProps.height
                }
                width={gameVerticalTextureProps.width}
                height={gameVerticalTextureProps.height}
                image={verticalTexture}
            />
            <Image
                x={props.x + cornerMiddleLeftTextureProps.width + horizontalTextureProps.width}
                y={
                    cornerUpLeftTextureProps.height +
                    headerVerticalTextureProps.height +
                    cornerMiddleLeftTextureProps.height
                }
                width={gameVerticalTextureProps.width}
                height={gameVerticalTextureProps.height}
                image={verticalTexture}
            />

            <Image
                x={props.x}
                y={props.headerHeight + gameVerticalTextureProps.height}
                width={cornerBottomLeftTextureProps.width}
                height={cornerBottomLeftTextureProps.height}
                image={cornerBottomLeftTexture}
            />
            <Image
                x={props.x + cornerBottomLeftTextureProps.width}
                y={props.headerHeight + gameVerticalTextureProps.height}
                width={horizontalTextureProps.width}
                height={horizontalTextureProps.height}
                image={horizontalTexture}
            />
            <Image
                x={props.x + cornerBottomLeftTextureProps.width + horizontalTextureProps.width}
                y={props.headerHeight + gameVerticalTextureProps.height}
                width={cornerBottomRightTextureProps.width}
                height={cornerBottomRightTextureProps.height}
                image={cornerBottomRightTexture}
            />
        </>
    )
}
