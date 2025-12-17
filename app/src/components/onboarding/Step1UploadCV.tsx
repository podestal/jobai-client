import { useState } from 'react'
import { motion } from 'framer-motion'
import useCreateResume from '../../hooks/resume/useCreateResume'

interface Step1UploadCVProps {
  onComplete: (data: any) => void
}

const Step1UploadCV = ({ onComplete }: Step1UploadCVProps) => {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  const createResume = useCreateResume({
    onSuccess: (data) => {
      // Pass the resume data to the parent component
      onComplete({
        resumeId: data.id,
        file: uploadedFile,
        textExtracted: data.text_extracted,
        resumeData: data
      })
    },
    onError: (error) => {
      setError('Error al subir el CV. Por favor, intenta nuevamente.')
      console.error('Error uploading resume:', error)
    },
  })

  const handleFileSelect = async (file: File) => {
    // Validate file type
    if (!file.type.includes('pdf') && !file.name.endsWith('.docx')) {
      setError('Por favor, sube un archivo PDF o DOCX')
      return
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      setError('El archivo es demasiado grande. Máximo 10MB')
      return
    }

    setUploadedFile(file)
    setError(null)
    
    // Submit the resume to the backend
    createResume.mutate({
      file,
      text_extracted: '', // Backend will extract the text
    })
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
        {createResume.isPending ? (
          <div className="space-y-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"
            />
            <p className="text-lg font-semibold text-gray-700">
              Subiendo y analizando CV...
            </p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-gray-500"
            >
              Por favor espera mientras procesamos tu archivo
            </motion.p>
          </div>
        ) : uploadedFile && createResume.isSuccess ? (
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
              <p className="text-sm text-green-600 mt-2 font-medium">
                ✓ CV subido exitosamente
              </p>
            </div>
          </div>
        ) : uploadedFile && createResume.isError ? (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">{uploadedFile.name}</p>
              <p className="text-sm text-red-600 mt-2">
                Error al subir el archivo
              </p>
              <button
                onClick={() => {
                  setUploadedFile(null)
                  setError(null)
                }}
                className="mt-4 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 underline"
              >
                Intentar con otro archivo
              </button>
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

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg"
        >
          <div className="flex items-center gap-2 text-red-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm font-medium">{error}</p>
          </div>
        </motion.div>
      )}

      {/* Language Detection Info */}
      {!createResume.isPending && !uploadedFile && (
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

