import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import BackButton from '../components/BackButton'

interface Card {
  id: number
  emoji: string
  isFlipped: boolean
  isMatched: boolean
}

const emojis = ['🎮', '🎨', '🎭', '🎪', '🎯', '🎲', '🎰', '🎳']

const createDeck = (): Card[] => {
  const pairs = [...emojis, ...emojis]
  return pairs
    .map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false,
    }))
    .sort(() => Math.random() - 0.5)
}

const EmojiMatcher = () => {
  const [cards, setCards] = useState<Card[]>(createDeck())
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [matchedPairs, setMatchedPairs] = useState(0)
  const [isChecking, setIsChecking] = useState(false)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [endTime, setEndTime] = useState<number | null>(null)

  const flipCard = (id: number) => {
    if (
      isChecking ||
      flippedCards.length === 2 ||
      flippedCards.includes(id) ||
      cards[id].isMatched
    ) {
      return
    }

    if (startTime === null) {
      setStartTime(Date.now())
    }

    setCards((prev) =>
      prev.map((card) =>
        card.id === id ? { ...card, isFlipped: true } : card
      )
    )
    setFlippedCards((prev) => [...prev, id])
  }

  const resetGame = () => {
    setCards(createDeck())
    setFlippedCards([])
    setMoves(0)
    setMatchedPairs(0)
    setStartTime(null)
    setEndTime(null)
  }

  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsChecking(true)
      setMoves((prev) => prev + 1)

      const [first, second] = flippedCards
      const firstCard = cards[first]
      const secondCard = cards[second]

      if (firstCard.emoji === secondCard.emoji) {
        setCards((prev) =>
          prev.map((card) =>
            card.id === first || card.id === second
              ? { ...card, isMatched: true }
              : card
          )
        )
        setMatchedPairs((prev) => prev + 1)
        setFlippedCards([])
        setIsChecking(false)
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === first || card.id === second
                ? { ...card, isFlipped: false }
                : card
            )
          )
          setFlippedCards([])
          setIsChecking(false)
        }, 1000)
      }
    }
  }, [flippedCards, cards])

  useEffect(() => {
    if (matchedPairs === emojis.length && startTime && !endTime) {
      setEndTime(Date.now())
    }
  }, [matchedPairs, startTime, endTime])

  const getTimeString = () => {
    if (!startTime) return '0:00'
    const elapsed = ((endTime || Date.now()) - startTime) / 1000
    const minutes = Math.floor(elapsed / 60)
    const seconds = Math.floor(elapsed % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const isGameWon = matchedPairs === emojis.length

  return (
    <div className="min-h-screen overflow-hidden relative">
      <BackButton />

      <div className="fixed top-6 right-6 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg z-50 space-y-2">
        <div className="text-lg font-semibold text-gray-700">
          ⏱️ Czas: {getTimeString()}
        </div>
        <div className="text-lg font-semibold text-gray-700">
          🎯 Ruchy: {moves}
        </div>
        <div className="text-lg font-semibold text-gray-700">
          ✨ Pary: {matchedPairs}/{emojis.length}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetGame}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors mt-4"
        >
          🔄 Nowa Gra
        </motion.button>
      </div>

      <div className="text-center pt-24 pb-8 relative z-10">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent mb-3">
          🧩 Emoji Matcher
        </h1>
        <p className="text-gray-600 text-lg">
          Znajdź wszystkie pary emoji!
        </p>
      </div>

      {isGameWon && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 flex items-center justify-center z-40 bg-black/50 backdrop-blur-sm"
        >
          <div className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-md">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Gratulacje!
            </h2>
            <p className="text-xl text-gray-600 mb-2">
              Ukończyłeś grę w <span className="font-bold">{moves}</span> ruchach
            </p>
            <p className="text-xl text-gray-600 mb-6">
              Czas: <span className="font-bold">{getTimeString()}</span>
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetGame}
              className="bg-gradient-to-r from-yellow-500 to-red-500 text-white px-8 py-3 rounded-full text-lg font-bold shadow-lg"
            >
              🔄 Zagraj Ponownie
            </motion.button>
          </div>
        </motion.div>
      )}

      <div className="flex items-center justify-center px-4 pb-12">
        <div className="grid grid-cols-4 gap-3 max-w-2xl">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              whileHover={{ scale: card.isMatched ? 1 : 1.05 }}
              whileTap={{ scale: card.isMatched ? 1 : 0.95 }}
              onClick={() => flipCard(card.id)}
              className={`aspect-square rounded-2xl shadow-lg cursor-pointer flex items-center justify-center text-5xl transition-all ${
                card.isMatched
                  ? 'bg-green-200 opacity-70'
                  : card.isFlipped
                  ? 'bg-white'
                  : 'bg-gradient-to-br from-yellow-400 to-red-500'
              }`}
            >
              {card.isFlipped || card.isMatched ? (
                <motion.span
                  initial={{ rotateY: 90 }}
                  animate={{ rotateY: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {card.emoji}
                </motion.span>
              ) : (
                <span className="text-4xl">❓</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EmojiMatcher
