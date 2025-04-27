import './App.css'
import { GameField } from './components/GameField'
import { Stage, Layer } from 'react-konva'
import { GameImpl } from './engine/game'
import { Frame } from './components/Frame'
import { NumberDisplay } from './components/NumberDisplay'
import { TimeCounter } from './components/TimeCounter'
import { ObserverImpl } from './engine/observer'

const urlParams = new URLSearchParams(window.location.search)
const difficulty = urlParams.get('difficulty')

let rows = 0
let columns = 0
let mines = 0

switch (difficulty) {
    case 'easy': {
        rows = 9
        columns = 9
        mines = 10
        break
    }
    case 'normal': {
        rows = 16
        columns = 16
        mines = 40
        break
    }
    case 'hard': {
        rows = 30
        columns = 16
        mines = 99
        break
    }
    default: {
        rows = 30
        columns = 16
        mines = 99
        break
    }
}

const flagObserver = new ObserverImpl(mines)

const game = new GameImpl({
    rows: rows,
    columns: columns,
    totalMines: mines,
    withSaveSpot: true,
    flagObserver: flagObserver,
})

function App() {
    const headerHeight = 100
    const pageWidth = columns * 20 + 24 * 2
    const pageHeight = rows * 20 + headerHeight

    return (
        <main onContextMenu={(e) => e.preventDefault()}>
            <Stage width={window.innerWidth} height={window.innerHeight * 0.8}>
                <Layer>
                    <Frame
                        x={0}
                        y={0}
                        width={pageWidth}
                        height={pageHeight}
                        headerHeight={headerHeight}
                    />
                    <GameField x={24} y={100} game={game} />
                    <NumberDisplay x={30} y={30} height={40} number={flagObserver} />
                    <TimeCounter x={pageWidth - 30} y={30} height={40} alightRight={true} />
                </Layer>
            </Stage>
        </main>
    )
}

export default App
