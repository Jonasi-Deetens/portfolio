import React from 'react'
import PortfolioItem from './PortfolioItem'
import PortfolioItemData from '../data/PortfolioItemData'

const PortfolioItems = () => {
    return (
        <section className='dark flex flex-wrap items-center justify-around'>
            {PortfolioItemData.map(data => (
                <PortfolioItem image={data.image} title={data.title} text={data.text}/>
            ))}
        </section>
    )
}

export default PortfolioItems