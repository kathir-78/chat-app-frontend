import React from 'react'
import { NavBar } from './NavBar'
import { Outlet } from 'react-router-dom'

export const Body = () => {
  return (
    <>
    <header data-theme="aqua">
        < NavBar/>
    </header>
    <main data-theme="abyss">
        <Outlet />
    </main>
    </>
  )
}
