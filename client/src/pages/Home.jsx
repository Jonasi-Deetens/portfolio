import React from 'react'
import PortfolioItems from '../components/PortfolioItems'

const Home = () => {
  return (
    <main className='flex flex-col justify-between'>
        <h2>Welcome to my dev portfolio!</h2>
        <PortfolioItems />
    </main>
  )
}

export default Home