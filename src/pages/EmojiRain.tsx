import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BackButton from '../components/BackButton'

interface Emoji {
  id: number
  emoji: string
  left: number
  duration: number
}

const emojis = ['😀', '😂', '🥳', '😍', '🤩', '😎', '🤗', '🥰', '😜', '🤪', '🌟', '⭐', '✨', '💫', '🌈', '🎈', '🎉', '🎊']

const EmojiRain = () => {
  const [fallingEmojis, setFallingEmojis] = useState<Emoji[]>([])
  const [score, setScore] = useState(0)
  const [nextId, setNextId] = useState(0)

  const createEmoji = (clientX: number) => {
    const newEmoji: Emoji = {
      id: nextId,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      left: (clientX / window.innerWidth) * 100,
      duration: 2 + Math.random() * 2,
    }
    setFallingEmojis((prev) => [...prev, newEmoji])
    setNextId((prev) => prev + 1)
  }

  const handleClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains('game-area')) {
      createEmoji(e.clientX)
    }
  }

  const catchEmoji = (id: number) => {
    setFallingEmojis((prev) => prev.filter((emoji) => emoji.id !== id))
    setScore((prev) => prev + 1)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setFallingEmojis((prev) =>
        prev.filter((emoji) => Date.now() - emoji.id < emoji.duration * 1000)
      )
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen overflow-hidden relative">
      <BackButton />

      <div className="fixed top-6 right-6 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg z-50">
        <span className="text-xl font-bold text-purple-600">
          🎯 Złapane: {score}
        </span>
      </div>

      <div className="text-center pt-24 pb-8 relative z-10">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
          🌧️ Emoji Rain
        </h1>
        <p className="text-gray-600 text-lg">
          Kliknij gdziekolwiek, aby stworzyć deszcz emoji! Łap je zanim znikną!
        </p>
      </div>

      <div
        className="game-area absolute inset-0 cursor-pointer"
        onClick={handleClick}
      >
        <AnimatePresence>
          {fallingEmojis.map((item) => (
            <motion.div
              key={item.id}
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: window.innerHeight + 100, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: item.duration, ease: 'linear' }}
              style={{ left: `${item.left}%`, position: 'absolute' }}
              className="text-5xl cursor-pointer hover:scale-125 transition-transform"
              onClick={(e) => {
                e.stopPropagation()
                catchEmoji(item.id)
              }}
            >
              {item.emoji}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default EmojiRain
