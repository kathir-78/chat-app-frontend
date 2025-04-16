import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlicer';
import { useNavigate, Link } from 'react-router-dom';


export const Login = () => {

    const [emailId, setEmailId] = useState('kathiresan.it22@bitsathy.ac.in');
    const [password, setPassword] = useState('kathirNikitha');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validateInput = () => {
        if (!emailId || !/\S+@\S+\.\S+/.test(emailId)) {
            setError('Please enter a valid email address.');
            return false;
        }
        if (!password) {
            setError('Please enter the password');
            return false;
        }
        setError('');
        return true;
    };

    const handleLogin = async(e) => {
        e.preventDefault();
        if( !validateInput()) return;

        try {
            const user = await axios.post(import.meta.env.VITE_API_URL + '/auth/login', {emailId, password}, {withCredentials: true});
            // console.log(user.data);
            dispatch(addUser(user.data));
            navigate("/");

        } catch (error) {
            console.error('Login failed:', error);
            setError(error.message);
        }
    } 

  return (
    <form data-theme="cupcake" onSubmit={handleLogin}>
        <section className='flex justify-center items-center h-screen'>
            <div className="card bg-base-100 w-96 shadow-sm">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">Login</h2>

                        <input type="email" 
                        placeholder="Email"
                        value={emailId} 
                        className="input input-neutral"
                        
                        onChange={(e) => (setEmailId(e.target.value))} />

                        <input type="password" 
                        placeholder="Password"
                        value={password} 
                        className="input input-neutral" 
                        onChange={(e) => (setPassword(e.target.value))}
                        />

                        {error && <p className="text-red-500">{error}</p>}      
        
                    <div className="card-actions">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>

                    <div>
                        <span>
                            If you are a new user,{' '}
                            <Link to="/signup" className="text-blue-500 hover:underline">
                            click here to sign up
                            </Link>
                        </span>
                    </div>
                    
                </div>
            </div>
        </section>
    </form>
  )
}
