import React from 'react'
import search from '../assets/search.svg'

const Footer = () => {
  return (
    <footer className='h-16 w-full bg-secondaryDark absolute bottom-0 flex items-center'>
        <div className='flex w-10/12 lg:w-1/2  m-auto border-2 border-red-400 rounded-full'>
          <input className='px-5 w-full bg-lightColor rounded-full text-secondaryDark' type="text" name="searchbar" id="searchbar" />
          <img className='m-2' src={search} width={20} alt="svg icon of a magnifying glass" />
        </div>
    </footer>
  )
}

export default Footer