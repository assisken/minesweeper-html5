import React, { useState } from 'react'
import { NumberDisplay } from './NumberDisplay'
import { ObserverImpl } from '../engine/observer'

let initTime = new Date().getTime()

export function TimeCounter(props: {
    x: number
    y: number
    height: number
    alightRight?: boolean
}) {
    const [seconds, setSeconds] = useState(0)

    const secondsObserver = new ObserverImpl(seconds)
    secondsObserver.subscribe((v) => setSeconds(v))

    React.useEffect(() => {
        var id = setInterval(() => {
            const millisecondsSpend = seconds + (new Date().getTime() - initTime)
            secondsObserver.value = Math.floor(millisecondsSpend / 1000)
        }, 1000)
        return () => clearInterval(id)
    })

    return (
        <NumberDisplay
            x={props.x}
            y={props.y}
            height={props.height}
            number={secondsObserver}
            alightRight={props.alightRight}
        />
    )
}
