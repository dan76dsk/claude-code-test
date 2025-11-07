import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import EmojiRain from './pages/EmojiRain'
import EmojiPaint from './pages/EmojiPaint'
import EmojiClicker from './pages/EmojiClicker'
import EmojiMatcher from './pages/EmojiMatcher'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/emoji-rain" element={<EmojiRain />} />
        <Route path="/emoji-paint" element={<EmojiPaint />} />
        <Route path="/emoji-clicker" element={<EmojiClicker />} />
        <Route path="/emoji-matcher" element={<EmojiMatcher />} />
      </Routes>
    </Router>
  )
}

export default App
