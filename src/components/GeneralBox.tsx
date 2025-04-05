import { Rect } from 'react-konva'

function tap() {
  console.log('tap')
}

export function GeneralBox() {
  return (
    <Rect
      x={1}
      y={1}
      width={20}
      height={20}
      fill={'#c6c6c6'}
      stroke={'#808080'}
      strokeWidth={2}
      onMouseDown={tap}
    />
  )
}
