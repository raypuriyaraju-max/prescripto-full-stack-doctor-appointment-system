import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import AIHealthQuote from '../components/AIHealthQuote'
import AIHealthFact from '../components/AIHealthFact'
import AIFirstAid from '../components/AIFirstAid'
import AILabSimplifier from '../components/AILabSimplifier'
import AIPrescriptionGuide from '../components/AIPrescriptionGuide'
import MapComponent from '../components/MapComponent';
const Home = () => {
  return (
    <div>
      <Header />
      <SpecialityMenu />
      <TopDoctors />
      <Banner />
      <AIHealthQuote />
      <AIHealthFact />
      <AIFirstAid />
      <AILabSimplifier />
      <AIPrescriptionGuide />
      <MapComponent />
    </div>
  )
}

export default Home