import { useMutation } from '@tanstack/react-query'
import resumeService, { type CreateResumeRequest, type ResumeResponse } from '../../services/api/resumeService'
import { useAuthStore } from '../../stores/authStore'

interface UseCreateResumeOptions {
  onSuccess?: (data: ResumeResponse) => void
  onError?: (error: Error) => void
}

const useCreateResume = (options?: UseCreateResumeOptions) => {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useMutation({
    mutationFn: async (data: CreateResumeRequest) => {
      if (!accessToken) {
        throw new Error('No access token available')
      }

      // Create FormData for file upload
      const formData = new FormData()
      formData.append('file', data.file)
      
      // Add text_extracted if provided
      if (data.text_extracted) {
        formData.append('text_extracted', data.text_extracted)
      } else {
        // Send empty string if not provided (backend might extract it)
        formData.append('text_extracted', '')
      }

      // Call the service with FormData and access token
      const response = await resumeService.post(formData, accessToken)
      return response
    },
    onSuccess: (data) => {
      options?.onSuccess?.(data)
    },
    onError: (error: Error) => {
      options?.onError?.(error)
      console.error('Error creating resume:', error)
    },
  })
}

export default useCreateResume

