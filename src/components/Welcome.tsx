import React from 'react'
import './Welcome.css'

const Welcome: React.FC = () => {
  return (
    <div className="welcome-container">
      <h1>Witaj w React + TypeScript + Vite!</h1>
      <div className="welcome-content">
        <p>To jest prosty komponent startowy dla Twojego projektu.</p>
        <div className="features">
          <div className="feature">
            <h3>⚡ Vite</h3>
            <p>Szybki build tool z natychmiastowym HMR</p>
          </div>
          <div className="feature">
            <h3>⚛️ React</h3>
            <p>Nowoczesna biblioteka do budowania UI</p>
          </div>
          <div className="feature">
            <h3>📘 TypeScript</h3>
            <p>Typowany JavaScript dla lepszego DX</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Welcome
