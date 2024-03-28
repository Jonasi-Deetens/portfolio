import React from 'react'
import cv from '../assets/Jonasi.pdf'

const CV = () => {
  return (
    <main className='w-full h-full pt-20'>
        <embed src={cv} type="application/pdf" width="100%" height="900px"/>
    </main>
  )
}

export default CV