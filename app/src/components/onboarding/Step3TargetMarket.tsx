import { useState } from 'react'
import { motion } from 'framer-motion'

interface Step3TargetMarketProps {
  onComplete: (marketData: any) => void
  onBack: () => void
}

const Step3TargetMarket = ({ onComplete, onBack }: Step3TargetMarketProps) => {
  const [jobTitles, setJobTitles] = useState<string[]>(['Desarrollador Full Stack'])
  const [newJobTitle, setNewJobTitle] = useState('')
  const [recommendedTitles] = useState([
    'Backend Developer',
    'Full Stack Developer',
    'Software Engineer',
    'Frontend Developer'
  ])
  const [locations, setLocations] = useState<string[]>(['Remoto'])
  const [contractType, setContractType] = useState('Indiferente')
  const [minSalary, setMinSalary] = useState('')
  const [idealSalary, setIdealSalary] = useState('')

  const availableLocations = ['Remoto', 'Lima', 'Arequipa', 'Todo Perú']
  const contractTypes = ['Planilla', 'Honorarios', 'Freelance', 'Indiferente']

  const handleAddJobTitle = (title: string) => {
    if (title.trim() && !jobTitles.includes(title.trim())) {
      setJobTitles([...jobTitles, title.trim()])
      setNewJobTitle('')
    }
  }

  const handleRemoveJobTitle = (title: string) => {
    setJobTitles(jobTitles.filter(t => t !== title))
  }

  const handleAddRecommendedTitle = (title: string) => {
    if (!jobTitles.includes(title)) {
      setJobTitles([...jobTitles, title])
    }
  }

  const toggleLocation = (location: string) => {
    if (locations.includes(location)) {
      setLocations(locations.filter(l => l !== location))
    } else {
      setLocations([...locations, location])
    }
  }

  const handleComplete = () => {
    onComplete({
      jobTitles,
      locations,
      contractType,
      salaryRange: {
        minimum: minSalary,
        ideal: idealSalary
      }
    })
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Paso 3: Orientar al mercado laboral
        </h2>
        <p className="text-gray-600 text-lg">
          Configura tus preferencias de búsqueda de trabajo
        </p>
      </div>

      <div className="space-y-8">
        {/* A. Job Titles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-50 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            A. Títulos de trabajo
          </h3>
          
          {/* Current Job Titles */}
          <div className="flex flex-wrap gap-2 mb-4">
            {jobTitles.map((title, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 border border-gray-200"
              >
                <span className="text-gray-900">{title}</span>
                <button
                  onClick={() => handleRemoveJobTitle(title)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </motion.div>
            ))}
          </div>

          {/* Add New Job Title */}
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={newJobTitle}
              onChange={(e) => setNewJobTitle(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAddJobTitle(newJobTitle)
                }
              }}
              placeholder="Escribe un título de trabajo..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => handleAddJobTitle(newJobTitle)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
            >
              Agregar
            </button>
          </div>

          {/* Recommended Titles */}
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-700 mb-3">
              Basado en tu CV, también recomendamos:
            </p>
            <div className="flex flex-wrap gap-2">
              {recommendedTitles
                .filter(title => !jobTitles.includes(title))
                .map((title, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAddRecommendedTitle(title)}
                    className="px-3 py-1.5 bg-white border border-blue-200 text-blue-700 rounded-lg text-sm hover:bg-blue-100 transition-colors cursor-pointer"
                  >
                    + {title}
                  </motion.button>
                ))}
            </div>
          </div>
        </motion.div>

        {/* B. Locations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-50 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            B. Ubicaciones
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {availableLocations.map((location) => (
              <motion.button
                key={location}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleLocation(location)}
                className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 cursor-pointer ${
                  locations.includes(location)
                    ? 'bg-linear-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-300'
                }`}
              >
                {location}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* C. Contract Type */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-50 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            C. Tipo de contrato
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {contractTypes.map((type) => (
              <motion.button
                key={type}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setContractType(type)}
                className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 cursor-pointer ${
                  contractType === type
                    ? 'bg-linear-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-300'
                }`}
              >
                {type}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* D. Salary Range */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-50 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            D. Rango salarial
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salario mínimo aceptable (S/)
              </label>
              <input
                type="number"
                value={minSalary}
                onChange={(e) => setMinSalary(e.target.value)}
                placeholder="Ej: 5000"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salario ideal (S/) <span className="text-gray-400">(Opcional)</span>
              </label>
              <input
                type="number"
                value={idealSalary}
                onChange={(e) => setIdealSalary(e.target.value)}
                placeholder="Ej: 8000"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors cursor-pointer"
        >
          Atrás
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleComplete}
          className="px-6 py-3 bg-linear-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
        >
          Completar configuración
        </motion.button>
      </div>
    </div>
  )
}

export default Step3TargetMarket

