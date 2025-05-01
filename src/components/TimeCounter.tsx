import React, { useState } from 'react'
import { NumberDisplay } from './NumberDisplay'
import { Observer, ObserverImpl } from '../engine/observer'
import { Align } from '../types'

let initTime = new Date().getTime()

export function TimeCounter(props: {
    x: number
    y: number
    height: number
    align: Align
    isTimerRunningObserver: Observer<boolean>
}) {
    const [seconds, setSeconds] = useState(0)
    const [isTimerRunning, setTimerRunning] = useState(false)

    props.isTimerRunningObserver.subscribe((v) => {
        initTime = new Date().getTime()
        setTimerRunning(v)
    })

    const secondsObserver = new ObserverImpl(seconds)
    secondsObserver.subscribe((v) => setSeconds(v))

    React.useEffect(() => {
        if (isTimerRunning) {
            var id = setInterval(() => {
                const millisecondsSpend = seconds + (new Date().getTime() - initTime)
                secondsObserver.value = Math.floor(millisecondsSpend / 1000)
            }, 1000)
        }
        return () => clearInterval(id)
    })

    return (
        <NumberDisplay
            x={props.x}
            y={props.y}
            height={props.height}
            number={secondsObserver}
            align={props.align}
        />
    )
}
