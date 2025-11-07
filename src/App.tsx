import { useState } from 'react'
import './App.css'
import Welcome from './components/Welcome'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Welcome />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Licznik: {count}
        </button>
        <p>
          Edytuj <code>src/App.tsx</code> i zapisz, aby przetestować HMR
        </p>
      </div>
      <p className="read-the-docs">
        Kliknij w logo Vite i React, aby dowiedzieć się więcej
      </p>
    </div>
  )
}

export default App
