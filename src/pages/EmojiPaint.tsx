import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import BackButton from '../components/BackButton'

interface PaintPoint {
  id: number
  emoji: string
  x: number
  y: number
  size: number
}

const emojiPalette = ['😀', '❤️', '🌟', '🌈', '🎨', '✨']

const EmojiPaint = () => {
  const [points, setPoints] = useState<PaintPoint[]>([])
  const [selectedEmoji, setSelectedEmoji] = useState(emojiPalette[0])
  const [size, setSize] = useState(32)
  const [isDrawing, setIsDrawing] = useState(false)
  const nextIdRef = useRef(0)

  const addPoint = (x: number, y: number) => {
    const newPoint: PaintPoint = {
      id: nextIdRef.current++,
      emoji: selectedEmoji,
      x,
      y,
      size,
    }
    setPoints((prev) => [...prev, newPoint])
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDrawing(true)
    addPoint(e.clientX, e.clientY)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDrawing) {
      addPoint(e.clientX, e.clientY)
    }
  }

  const handleMouseUp = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    setPoints([])
  }

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDrawing(false)
    window.addEventListener('mouseup', handleGlobalMouseUp)
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp)
  }, [])

  return (
    <div className="min-h-screen overflow-hidden relative">
      <BackButton />

      <div className="fixed top-6 right-6 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg z-50 space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Wybierz Emoji:
          </label>
          <div className="flex gap-2">
            {emojiPalette.map((emoji) => (
              <motion.button
                key={emoji}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedEmoji(emoji)}
                className={`text-3xl p-2 rounded-lg transition-all ${
                  selectedEmoji === emoji
                    ? 'bg-pink-200 ring-2 ring-pink-500'
                    : 'bg-white hover:bg-gray-100'
                }`}
              >
                {emoji}
              </motion.button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Rozmiar: {size}px
          </label>
          <input
            type="range"
            min="16"
            max="64"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={clearCanvas}
          className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
        >
          🗑️ Wyczyść
        </motion.button>
      </div>

      <div className="text-center pt-24 pb-8 relative z-10 pointer-events-none">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent mb-3">
          🎨 Emoji Paint
        </h1>
        <p className="text-gray-600 text-lg">
          Przytrzymaj i przeciągnij, aby rysować emoji!
        </p>
      </div>

      <div
        className="absolute inset-0 cursor-crosshair select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {points.map((point) => (
          <div
            key={point.id}
            className="absolute pointer-events-none"
            style={{
              left: point.x,
              top: point.y,
              fontSize: `${point.size}px`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {point.emoji}
          </div>
        ))}
      </div>
    </div>
  )
}

export default EmojiPaint
