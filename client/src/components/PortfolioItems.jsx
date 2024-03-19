import React from 'react'
import PortfolioItem from './PortfolioItem'

const PortfolioItems = () => {
    return (
        <section className='flex flex-wrap items-center justify-around'>
            <PortfolioItem />
            <PortfolioItem />   
            <PortfolioItem />   
            <PortfolioItem />   
        </section>
    )
}

export default PortfolioItems