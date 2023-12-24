import React from 'react'
import Menu from '../assets/menu.svg'
import NewNote from '../assets/edit.svg'

function Header() {
  return (
    <div className='flex justify-between p-2 border-[gray] border-b-[1px]'>
       <div>
        <img className='w-6' src={Menu} alt="" />
    </div>
    <div>
        <p className='text-white'>All Notes</p>
    </div>
    <div>
        <img className='w-6' src={NewNote} alt="" />
    </div>
    </div>
  )
}

export default Header
