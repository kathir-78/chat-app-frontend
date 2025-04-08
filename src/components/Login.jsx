import React, { useState } from 'react'

export const Login = () => {

    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');

    

  return (
    <form data-theme="cupcake">
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
        
                    <div className="card-actions">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </div>
            </div>
        </section>
    </form>
  )
}
