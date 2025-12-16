import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import routes from './router/routes.tsx'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthInitializer from './components/auth/AuthInitializer'
// Import authClient to trigger interceptor setup
import './services/auth/authClient'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthInitializer />
      <RouterProvider router={routes} />
    </QueryClientProvider>
  </StrictMode>,
)
