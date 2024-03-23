import React from 'react'

const PortfolioItem = ({image, title, text}) => {
  return (
    <article className='bg-primary m-5 text-neutral-50 p-10 rounded-3xl'>
        <img width={30} src={image} alt={"icon of " + title} />
        <h3>{title}</h3>
        <p>{text}</p>
    </article>
  )
}

export default PortfolioItem