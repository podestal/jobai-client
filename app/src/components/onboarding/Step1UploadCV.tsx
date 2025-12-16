import { useState } from 'react'
import { motion } from 'framer-motion'

interface Step1UploadCVProps {
  onComplete: (data: any) => void
}

const Step1UploadCV = ({ onComplete }: Step1UploadCVProps) => {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [detectedLanguage, setDetectedLanguage] = useState<string | null>(null)

  const handleFileSelect = async (file: File) => {
    setUploadedFile(file)
    setIsUploading(true)
    
    // Simulate file upload and analysis
    setTimeout(() => {
      setDetectedLanguage('Español')
      setIsUploading(false)
      
      // Simulate extracted data
      const mockExtractedProfile = {
        name: 'Juan Pérez',
        experience: [
          {
            role: 'Desarrollador Full Stack',
            company: 'Tech Corp',
            dates: '2020 - Presente',
            bullets: ['Desarrollo de aplicaciones web', 'Gestión de equipos']
          }
        ],
        skills: ['React', 'Node.js', 'Python', 'PostgreSQL'],
        education: [
          {
            degree: 'Ingeniería de Sistemas',
            institution: 'Universidad Nacional',
            year: '2018'
          }
        ],
        yearsOfExperience: 5
      }
      
      onComplete({
        file,
        extractedProfile: mockExtractedProfile
      })
    }, 2000)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const file = e.dataTransfer.files[0]
    if (file && (file.type === 'application/pdf' || file.name.endsWith('.docx'))) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Paso 1: Sube tu CV
        </h2>
        <p className="text-gray-600 text-lg">
          Sube tu CV y extraeremos tu experiencia automáticamente.
        </p>
      </div>

      {/* Upload Area */}
      <motion.div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        animate={{
          scale: isDragging ? 1.02 : 1,
          borderColor: isDragging ? '#3b82f6' : '#e5e7eb',
        }}
        className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${
          isDragging ? 'bg-blue-50' : 'bg-gray-50'
        }`}
      >
        {isUploading ? (
          <div className="space-y-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"
            />
            <p className="text-lg font-semibold text-gray-700">
              Analizando CV...
            </p>
            {detectedLanguage && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-gray-500"
              >
                Idioma detectado: <span className="font-semibold">{detectedLanguage}</span>
              </motion.p>
            )}
          </div>
        ) : uploadedFile ? (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">{uploadedFile.name}</p>
              <p className="text-sm text-gray-500 mt-1">
                {(uploadedFile.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="w-20 h-20 bg-linear-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Arrastra tu CV aquí
            </h3>
            <p className="text-gray-500 mb-6">
              o haz clic para seleccionar un archivo
            </p>
            <label className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl cursor-pointer hover:shadow-lg transition-all duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Seleccionar archivo
              <input
                type="file"
                accept=".pdf,.docx"
                onChange={handleFileInput}
                className="hidden"
              />
            </label>
            <p className="text-sm text-gray-400 mt-4">
              Formatos soportados: PDF / DOCX
            </p>
          </>
        )}
      </motion.div>

      {/* Language Detection Info */}
      {!isUploading && !uploadedFile && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>El idioma se detectará automáticamente</span>
        </motion.div>
      )}
    </div>
  )
}

export default Step1UploadCV

