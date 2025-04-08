import React from 'react'
import { NavBar } from './NavBar'
import { Outlet } from 'react-router-dom'

export const Body = () => {
  return (
    <>
    <header data-theme="cupcake">
        < NavBar/>
    </header>
    <main>
        <Outlet />
    </main>
    </>
  )
}
