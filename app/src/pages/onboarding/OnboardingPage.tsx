import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Step1UploadCV from '../../components/onboarding/Step1UploadCV'
import Step2ConfirmInfo from '../../components/onboarding/Step2ConfirmInfo'
import Step3TargetMarket from '../../components/onboarding/Step3TargetMarket'

const OnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [cvData, setCvData] = useState<any>(null)
  const [extractedInfo, setExtractedInfo] = useState<any>(null)

  const handleStep1Complete = (data: any) => {
    setCvData(data)
    setExtractedInfo(data.extractedProfile)
    setCurrentStep(2)
  }

  const handleStep2Complete = (confirmedInfo: any) => {
    setExtractedInfo(confirmedInfo)
    setCurrentStep(3)
  }

  const handleStep3Complete = (marketData: any) => {
    // Will connect to API later
    console.log('Onboarding complete:', { cvData, extractedInfo, marketData })
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-600">
              Paso {currentStep} de 3
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round((currentStep / 3) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / 3) * 100}%` }}
              transition={{ duration: 0.5 }}
              className="bg-linear-to-r from-blue-500 to-indigo-600 h-2 rounded-full"
            />
          </div>
        </div>

        {/* Steps */}
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Step1UploadCV onComplete={handleStep1Complete} />
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Step2ConfirmInfo
                extractedInfo={extractedInfo}
                onComplete={handleStep2Complete}
                onBack={() => setCurrentStep(1)}
              />
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Step3TargetMarket
                onComplete={handleStep3Complete}
                onBack={() => setCurrentStep(2)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default OnboardingPage

