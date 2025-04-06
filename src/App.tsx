import './App.css'
import { GameField } from './components/GameField'
import { Stage, Layer } from 'react-konva'

function App() {
  return (
    <>
      <main onContextMenu={(e) => e.preventDefault()}>
        <Stage width={window.innerWidth} height={window.innerHeight * 0.8}>
          <Layer>
            <GameField />
          </Layer>
        </Stage>
      </main>
    </>
  )
}

export default App
