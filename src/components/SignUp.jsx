import axios from 'axios';
import React, { useState } from 'react'
// import { useDispatch } from 'react-redux';
// import { addUser } from '../utils/userSlicer';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";


export const SignUp = () => {

      const [firstName, setFirstName] = useState('');
      const [lastName, setLastName] = useState('');
      const [emailId, setEmailId] = useState('');
      const [password, setPassword] = useState('');
      const [error, setError] = useState('');
      // const dispatch = useDispatch();
      const navigate = useNavigate();

      const validateInput = () => {
        if(!firstName || !lastName) {
          setError('Please enter a Name');
          return false
        }

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

    const handleSignUp = async(e) => {
        e.preventDefault();
        if( !validateInput()) return;

        try {
            await axios.post(import.meta.env.VITE_API_URL + '/auth/signup', {firstName, lastName, emailId, password}, {withCredentials: true});
            // console.log(user.data);
            // dispatch(addUser(user.data));
            toast.success('Account created successfully!');
            navigate("/login");

        } catch (error) {
            console.error('Login failed:', error);
            setError(error.response.data.message);
        }
    }

  return (
    <section>
      <form data-theme="cupcake" onSubmit={handleSignUp}>
          <section className='flex justify-center items-center h-screen'>
              <div className="card bg-base-100 w-96 shadow-sm">
                  <div className="card-body items-center text-center">
                      <h2 className="card-title">Sign Up</h2>
                          <input type="string"
                          placeholder="FirstName"
                          value={firstName}
                          className="input input-neutral"
      
                          onChange={(e) => (setFirstName(e.target.value))} />
                          <input type="string"
                          placeholder="LastName"
                          value={lastName}
                          className="input input-neutral"
      
                          onChange={(e) => (setLastName(e.target.value))} />
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
                          <button type="submit" className="btn btn-primary">Sign Up</button>
                      </div>
                      <div>
                        <span>
                          Already a user?{' '}
                          <Link to="/login" className="text-blue-500 hover:underline">
                            Click here to login
                          </Link>
                        </span>
                      </div>
                  </div>
              </div>
          </section>
      </form>
    </section>
  )
}
