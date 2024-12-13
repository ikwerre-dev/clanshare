import { useState } from 'react'
import Header from './components/Header'
import Banner from './components/Banner'
import Footer from './components/Footer'

function Home() {

  return (
    <div className='bg-[#000] min-h-screen'>
      
      <Header />
      <Banner />
      <Footer />
    </div>  
  )
}

export default Home


