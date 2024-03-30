import React, { useContext } from 'react'
import cv from '../assets/Jonasi.pdf#toolbar=0&navpanes=0&scrollbar=0'
import { UserContext } from '../providers/UserProvider'

const CV = () => {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <main className='w-full lg:w-10/12 h-full pt-28 m-auto'>
        <embed className='h-screen' src={cv} type="application/pdf" width="100%"/>
    </main>
  )
}

export default CV