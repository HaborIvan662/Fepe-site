import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.tsx'
import StakingSection from './components/Section/StakingSection'
import { LanguageProvider } from './context/LanguageContext'
import { WalletModalProvider } from './context/WalletModalContext'
import Layout from './components/Layout'
import { config } from './config/wagmi'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <WalletModalProvider>
            <BrowserRouter>
              <Layout>
                <Routes>
                  <Route path="/" element={<App />} />
                  <Route path="/en/staking" element={<StakingSection />} />
                </Routes>
              </Layout>
            </BrowserRouter>
          </WalletModalProvider>
        </LanguageProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>,
)
