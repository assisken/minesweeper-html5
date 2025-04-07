import './App.css'
import { GameField } from './components/GameField'
import { Stage, Layer } from 'react-konva'
import { GameImpl } from './engine/game'

const rows = 30
const columns = 16
const mines = 99

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
                    <GameField game={game} />
                </Layer>
            </Stage>
        </main>
    )
}

export default App
