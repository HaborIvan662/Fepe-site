import './App.css'
import { lazy, Suspense } from 'react'
import HomeBanner from './components/Section/HomeBanner'
import ConsentRevisitButton from './components/ConsentRevisitButton'
import WalletModalRoot from './components/WalletModalRoot'
import WarningModal from './components/Modal/WarningModal'
import AboutToken from './components/Section/AboutToken'

// Lazy load components that are not immediately visible
const FeaturedSection = lazy(() => import('./components/Section/FeaturedSection'))
const MediaSection = lazy(() => import('./components/Section/MediaSection'))
const GroupStage = lazy(() => import('./components/Section/GroupStage'))
const AboutSection = lazy(() => import('./components/Section/AboutSection'))
const KeyFeatures = lazy(() => import('./components/Section/KeyFeatures'))
const TokenomicsSection = lazy(() => import('./components/Section/TokenomicsSection'))
const RoadmapSection = lazy(() => import('./components/Section/RoadmapSection'))
const HowToBuy = lazy(() => import('./components/Section/HowToBuy'))
const FAQ = lazy(() => import('./components/Section/FAQ'))

function App() {
  return (
    <>
      <WarningModal />
      <HomeBanner />
      <ConsentRevisitButton />
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
        <FeaturedSection />
        <MediaSection />
        <GroupStage />
        <AboutSection />
        <KeyFeatures />
        <AboutToken />
        <TokenomicsSection />
        <RoadmapSection />
        <HowToBuy />
        <FAQ />
      </Suspense>
      <WalletModalRoot />
    </>
  )
}

export default App
