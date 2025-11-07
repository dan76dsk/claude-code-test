import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const games = [
  {
    id: 'rain',
    title: '🌧️ Emoji Rain',
    description: 'Łap spadające emoji!',
    gradient: 'from-blue-400 to-purple-500',
    path: '/emoji-rain',
  },
  {
    id: 'paint',
    title: '🎨 Emoji Paint',
    description: 'Maluj kolorowymi emoji!',
    gradient: 'from-pink-400 to-orange-500',
    path: '/emoji-paint',
  },
  {
    id: 'clicker',
    title: '⚡ Emoji Clicker',
    description: 'Klikaj szybko i zdobywaj punkty!',
    gradient: 'from-green-400 to-teal-500',
    path: '/emoji-clicker',
  },
  {
    id: 'matcher',
    title: '🧩 Emoji Matcher',
    description: 'Znajdź wszystkie pary!',
    gradient: 'from-yellow-400 to-red-500',
    path: '/emoji-matcher',
  },
]

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
          🎮 Emoji Playground
        </h1>
        <p className="text-xl text-gray-600">
          Wybierz swoją ulubioną grę z emoji!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        {games.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(game.path)}
            className={`bg-gradient-to-br ${game.gradient} p-8 rounded-3xl shadow-xl cursor-pointer transform transition-all hover:shadow-2xl`}
          >
            <h2 className="text-3xl font-bold text-white mb-3">
              {game.title}
            </h2>
            <p className="text-white/90 text-lg">
              {game.description}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 text-gray-500 text-sm"
      >
        Stworzone z ❤️ używając React + TypeScript + Vite
      </motion.footer>
    </div>
  )
}

export default Home
