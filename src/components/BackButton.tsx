import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const BackButton = () => {
  const navigate = useNavigate()

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate('/')}
      className="fixed top-6 left-6 z-50 bg-white/90 backdrop-blur-sm text-gray-700 px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow font-semibold flex items-center gap-2"
    >
      <span className="text-xl">←</span>
      <span>Menu</span>
    </motion.button>
  )
}

export default BackButton
