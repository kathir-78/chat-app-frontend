import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../utils/userSlicer';
import { useNavigate, Link } from 'react-router-dom';

export const NavBar = () => {

    const user = useSelector((state)=> state.user);
    // console.log(user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutUser = async()=> {
        try {
            await axios.post(import.meta.env.VITE_API_URL+ "/auth/logout", {}, {withCredentials: true});
            dispatch(removeUser());
            navigate('/login');

        } catch (error) {
            console.error(error);
        }
    }

  return (
    <div className="navbar bg-base-100 shadow-sm px-12" >
        <div className="flex-1">
            <div className=''>
                <Link className="text-xl p-2 rounded-3xl bg-amber-100" to="/" >ChatApp</Link>
            </div>
        </div>
        {user && 
            <div className="flex gap-2 items-center">
                <span className='text-xl mr-4'> welcome {user.firstName}</span>
                <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS Navbar component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
                <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li>
                        <Link to="/profile">
                            Profile
                        </Link>
                        {/* <span className="badge">New</span> */}
                    </li>
                    <li>
                        <Link to="/">
                            Peoples
                        </Link>
                    </li>
                    {/* <li><a>Settings</a></li> */}
                    <li><a onClick={logoutUser}>Logout</a></li>
                </ul>
                </div>
            </div> }
    </div>
  )
}
