import React, { useEffect, useState } from 'react'
import { NavBar } from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlicer'

export const Body = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const fetchUserData = async()=> {

    try {

      const userData = await axios.get(import.meta.env.VITE_API_URL + "/user/profile", {withCredentials: true});
      // console.log(userData);
      dispatch(addUser(userData.data));
      // navigate('/');

    } catch (error) {
      if(error.status === 401) {
        navigate('/login');
      }
      else {
        setError(error)
        console.log(error.status);
      }
  }
  }

  useEffect(()=> {
    fetchUserData();
  },[])

  return (
    <>
    {error && <p className='text-xl text-red-500'>{error}</p>}

    <header data-theme="aqua">
        < NavBar/>
    </header>
    <main data-theme="abyss">
        <Outlet />
    </main>
    </>
  )
}
