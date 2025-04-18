import './App.css'
import { GameField } from './components/GameField'
import { Stage, Layer } from 'react-konva'
import { GameImpl } from './engine/game'
import { Header } from './components/header'

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

const game = new GameImpl({
    rows: rows,
    columns: columns,
    totalMines: mines,
    withSaveSpot: true,
})

function App() {
    return (
        <main onContextMenu={(e) => e.preventDefault()}>
            <Stage width={window.innerWidth} height={window.innerHeight * 0.8}>
                <Layer>
                    <Header x={0} y={0} width={columns * 20} height={100} />
                    <GameField x={0} y={100} game={game} />
                </Layer>
            </Stage>
        </main>
    )
}

export default App
