import { useState } from 'react'
import Header from './components/Header'
import Banner from './components/Banner'
import Services from './components/Services'
import CTA from './components/CTA'
import Footer from './components/Footer'
import About from './components/About'
import TunnelSection from './components/Tunnel'

function Tunnel() {

  return (
    <div className='bg-[#000] min-h-screen'>
      <Header />
      <TunnelSection />
      
      <Footer />
    </div>
  )
}

export default Tunnel


