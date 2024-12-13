import { useState } from 'react'
import Header from './components/Header'
import Banner from './components/Banner'
import Footer from './components/Footer'
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


