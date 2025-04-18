import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlicer';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {

      const selector = useSelector((state) => state.user);

      const dispatch = useDispatch();
      const [firstName, setFirstName] = useState('');
      const [lastName, setLastName] = useState('');
      const [gender, setGender] = useState('');
      const [about, setAbout] = useState('');
      const [error, setError] = useState('');
      const [imagePreview, setImagePreview] = useState(null);
      const Navigate = useNavigate();

        const handleImageChange = (e)=> {
          const image = e.target.files[0];
          if(image) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setImagePreview(reader.result);
            };
            reader.readAsDataURL(image);
          }
        };

        const validateInput = ()=> {
          if(!firstName || !lastName) {
            setError('Please enter a Name');
            return false;
          }
          return true;
        }

        const handleEditProfile = async(e)=> {
          e.preventDefault();
          if( !validateInput()) return;
          
          try {
            const updatedUser = await axios.patch(import.meta.env.VITE_API_URL + '/user/profile/edit',
              { 
                firstName,
                lastName,
                about,
                gender,
              }, 
              {withCredentials: true});
            console.log(updatedUser.data);
            dispatch(addUser(updatedUser.data.user));
            Navigate('/');

          } catch (error) {
            console.log(error);
          }
        }

        useEffect(() => {
          if (selector) {
            setFirstName(selector.firstName || '');
            setLastName(selector.lastName || '');
            setGender(selector.gender || '');
            setAbout(selector.about || '');
            setImagePreview(selector.imageUrl || null);
          }
        }, [selector]);

  return (
    <section>
    <form data-theme="black" onSubmit={handleEditProfile} >
        <section className='flex justify-center items-center h-screen'>
            <div className="card bg-base-100 w-96 shadow-sm">
                <div className="card-body items-center text-center gap-5">
                    <h2 className="card-title">Profile</h2>

                        <div className="mb-4">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded-full"
                            />
                        </div>
                        
                        <input type="text" 
                          placeholder="FirstName"
                          value={firstName} 
                          className="input input-neutral"
                        
                          onChange={(e) => (setFirstName(e.target.value))} />

                        <input type="text" 
                          placeholder="LastName"
                          value={lastName} 
                          className="input input-neutral"
                        
                          onChange={(e) => (setLastName(e.target.value))} />   

                        <textarea className="textarea textarea-neutral" placeholder="About" value={about}
                         onChange={(e) => setAbout(e.target.value)}>
                        </textarea>

                        <label htmlFor="imageUpload" className="btn btn-secondary">
                            Update Avatar
                        </label>
                          <input
                            id="imageUpload"
                            type="file"
                            accept="image/png, image/jpeg, image/jpg"
                            className="hidden"
                            onChange={handleImageChange}
                        />

                        <select 
                          value={gender || ""}
                          className="select select-neutral" 
                          onChange={(e) => {
                            setGender(e.target.value);
                          }}
                        >
                          <option disabled value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Others">Others</option>
                        </select>

                        {error && <p className="text-red-500">{error}</p>}      
        
                    <div className="card-actions">
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>

                </div>
            </div>
        </section>
    </form>
    </section>
  )
}
