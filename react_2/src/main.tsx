import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"

const queryClient = new QueryClient({
  // staleTime:4000,
  // refetchInterval:3000,
  // gcTime:10000
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
    
  </React.StrictMode>,
)
