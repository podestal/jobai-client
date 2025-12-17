import APIClient from "./apiClient"

export interface CreateResumeRequest {
  file: File
  text_extracted?: string
}

export interface ResumeResponse {
  id: number
  user: number
  file: string
  text_extracted: string
  created_at: string
}

const resumeService = new APIClient<ResumeResponse, CreateResumeRequest>("resumes/")

export default resumeService
