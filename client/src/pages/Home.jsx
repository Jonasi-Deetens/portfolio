import React from 'react'
import PortfolioItems from '../components/PortfolioItems'
import developer from '../assets/developer.svg'

const Home = () => {
  return (
    <main className='flex flex-col justify-between items-center py-20'>
        <h2>Welcome to my dev portfolio!</h2>
        <img className='mb-5' width={500} src={developer} alt={"cartoon image of a person behind a pc"} />
        <PortfolioItems />
    </main>
  )
}

export default Home