import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BackButton from '../components/BackButton'

interface EmojiTarget {
  id: number
  emoji: string
  x: number
  y: number
}

const emojis = ['🎯', '⭐', '💎', '🏆', '🎪', '🎨', '🎭', '🎪', '🌟', '✨']

const GAME_DURATION = 30
const EMOJI_LIFETIME = 2000

const EmojiClicker = () => {
  const [targets, setTargets] = useState<EmojiTarget[]>([])
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(() => {
    const saved = localStorage.getItem('emojiClickerBestScore')
    return saved ? parseInt(saved) : 0
  })
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION)
  const [isPlaying, setIsPlaying] = useState(false)
  const [nextId, setNextId] = useState(0)

  const spawnEmoji = useCallback(() => {
    const newTarget: EmojiTarget = {
      id: nextId,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      x: Math.random() * 80 + 10,
      y: Math.random() * 70 + 15,
    }
    setTargets((prev) => [...prev, newTarget])
    setNextId((prev) => prev + 1)

    setTimeout(() => {
      setTargets((prev) => prev.filter((t) => t.id !== newTarget.id))
    }, EMOJI_LIFETIME)
  }, [nextId])

  const startGame = () => {
    setScore(0)
    setTimeLeft(GAME_DURATION)
    setIsPlaying(true)
    setTargets([])
  }

  const clickEmoji = (id: number) => {
    setTargets((prev) => prev.filter((t) => t.id !== id))
    setScore((prev) => prev + 1)
  }

  useEffect(() => {
    if (!isPlaying) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsPlaying(false)
          if (score > bestScore) {
            setBestScore(score)
            localStorage.setItem('emojiClickerBestScore', score.toString())
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isPlaying, score, bestScore])

  useEffect(() => {
    if (!isPlaying) return

    const spawner = setInterval(() => {
      spawnEmoji()
    }, 800)

    return () => clearInterval(spawner)
  }, [isPlaying, spawnEmoji])

  return (
    <div className="min-h-screen overflow-hidden relative">
      <BackButton />

      <div className="fixed top-6 right-6 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg z-50 space-y-3">
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600">⏱️ {timeLeft}s</div>
          <div className="text-xl font-semibold text-gray-700">🎯 Punkty: {score}</div>
          <div className="text-sm text-gray-500">🏆 Rekord: {bestScore}</div>
        </div>
      </div>

      <div className="text-center pt-24 pb-8 relative z-10">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-3">
          ⚡ Emoji Clicker
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Klikaj emoji zanim znikną! Masz 30 sekund!
        </p>

        {!isPlaying && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={startGame}
            className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-8 py-4 rounded-full text-xl font-bold shadow-xl hover:shadow-2xl transition-shadow"
          >
            {timeLeft === 0 ? '🔄 Zagraj Ponownie' : '▶️ Start'}
          </motion.button>
        )}

        {timeLeft === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl inline-block"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              🎉 Koniec gry!
            </h2>
            <p className="text-xl text-gray-600">
              Twój wynik: <span className="font-bold text-green-600">{score}</span>
            </p>
            {score === bestScore && score > 0 && (
              <p className="text-lg text-yellow-600 font-semibold mt-2">
                🏆 Nowy rekord!
              </p>
            )}
          </motion.div>
        )}
      </div>

      <div className="absolute inset-0">
        <AnimatePresence>
          {targets.map((target) => (
            <motion.div
              key={target.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.2 }}
              style={{
                position: 'absolute',
                left: `${target.x}%`,
                top: `${target.y}%`,
              }}
              className="text-6xl cursor-pointer select-none"
              onClick={() => clickEmoji(target.id)}
            >
              {target.emoji}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default EmojiClicker
