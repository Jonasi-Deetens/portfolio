import React from 'react'
import { NavLink } from 'react-router-dom'

const PortfolioItem = ({image, title, text}) => {
  return (

    <NavLink to={"/" + title} className="link" activeClassName='active'>
      <article className='bg-primary m-5 text-neutral-50 p-10 rounded-3xl flex flex-col justify-between items-center hover:border hover:border-lightColor hover:shadow-md shadow-secondaryDark hover:scale-105 cursor-pointer'>
          <img className='mb-5' width={30} src={image} alt={"icon of " + title} />
          <h3>{title}</h3>
          <p>{text}</p>
      </article>
    </NavLink>
  )
}

export default PortfolioItem