import { useState } from 'react'
import { motion } from 'framer-motion'

interface Step2ConfirmInfoProps {
  extractedInfo: any
  onComplete: (confirmedInfo: any) => void
  onBack: () => void
}

const Step2ConfirmInfo = ({ extractedInfo, onComplete, onBack }: Step2ConfirmInfoProps) => {
  const [editingField, setEditingField] = useState<string | null>(null)
  const [editedInfo, setEditedInfo] = useState(extractedInfo)

  const handleEdit = (field: string, value: any) => {
    setEditedInfo((prev: any) => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSkillRemove = (skill: string) => {
    setEditedInfo((prev: any) => ({
      ...prev,
      skills: prev.skills.filter((s: string) => s !== skill)
    }))
  }

  const handleSkillAdd = (skill: string) => {
    if (skill.trim() && !editedInfo.skills.includes(skill.trim())) {
      setEditedInfo((prev: any) => ({
        ...prev,
        skills: [...prev.skills, skill.trim()]
      }))
    }
  }

  const handleExperienceRemove = (index: number) => {
    setEditedInfo((prev: any) => ({
      ...prev,
      experience: prev.experience.filter((_: any, i: number) => i !== index)
    }))
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Paso 2: Confirma tu información
        </h2>
        <p className="text-gray-600 text-lg">
          Revisa y edita la información extraída de tu CV
        </p>
      </div>

      <div className="space-y-8">
        {/* Job Titles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-50 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Títulos de trabajo detectados
          </h3>
          <div className="space-y-3">
            {editedInfo.experience.map((exp: any, index: number) => (
              <div key={index} className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-200">
                <span className="font-medium text-gray-900">{exp.role}</span>
                <button
                  onClick={() => handleExperienceRemove(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-50 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Habilidades detectadas
          </h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {editedInfo.skills.map((skill: string, index: number) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 border border-gray-200"
              >
                <span className="text-gray-900">{skill}</span>
                <button
                  onClick={() => handleSkillRemove(skill)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </motion.div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Agregar habilidad..."
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSkillAdd(e.currentTarget.value)
                  e.currentTarget.value = ''
                }
              }}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={(e) => {
                const input = e.currentTarget.previousElementSibling as HTMLInputElement
                handleSkillAdd(input.value)
                input.value = ''
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Agregar
            </button>
          </div>
        </motion.div>

        {/* Experience Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-50 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Resumen de experiencia
          </h3>
          <div className="space-y-4">
            {editedInfo.experience.map((exp: any, index: number) => (
              <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{exp.role}</h4>
                    <p className="text-sm text-gray-600">{exp.company} • {exp.dates}</p>
                  </div>
                </div>
                <ul className="mt-3 space-y-1">
                  {exp.bullets.map((bullet: string, bulletIndex: number) => (
                    <li key={bulletIndex} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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
          onClick={() => onComplete(editedInfo)}
          className="px-6 py-3 bg-linear-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
        >
          Se ve bien — continuar
        </motion.button>
      </div>
    </div>
  )
}

export default Step2ConfirmInfo

