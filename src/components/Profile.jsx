import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlicer';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [about, setAbout] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setGender(user.gender || '');
      setAbout(user.about || '');
      setImagePreview(user.imageUrl || null);
    }
  }, [user]);

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    if (image) {
      setImageFile(image);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(image);
    }
  };

  const validateInput = () => {
    if (!firstName || !lastName) {
      setError('Please enter a Name');
      return false;
    }
    return true;
  };

  const uploadImageToS3 = async (file) => {
    const fileType = file.type;

    if (file.size > 5 * 1024 * 1024) {
      throw new Error('File size exceeds 5MB');
    }

    //requesting pre-signed url
    const res = await axios.post(
      import.meta.env.VITE_API_URL + '/presigned-url',
      { fileType },
      { withCredentials: true }
    );

    //response with presigned-url and the image-Url 
    const { url, imageUrl } = res.data;

    await axios.put(url, file, {
      headers: { 'Content-Type': fileType },
    });

    return imageUrl;
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
    if (!validateInput()) return;

    let finalImageUrl = user.imageUrl;

    if (imageFile) {
      try {
        finalImageUrl = await uploadImageToS3(imageFile);
      } catch (err) {
        setError(err.message || 'Failed to upload image.');
        return;
      }
    }

    try {
      const res = await axios.patch(
        import.meta.env.VITE_API_URL + '/user/profile/edit',
        {
          firstName,
          lastName,
          about,
          gender,
          imageUrl: finalImageUrl,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.user));
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Something went wrong while updating your profile.');
    }
  };

  return (
    <section>
      <form data-theme="black" onSubmit={handleEditProfile}>
        <section className="flex justify-center items-center h-screen">
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

              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                className="input input-neutral"
                onChange={(e) => setFirstName(e.target.value)}
              />

              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                className="input input-neutral"
                onChange={(e) => setLastName(e.target.value)}
              />

              <textarea
                className="textarea textarea-neutral"
                placeholder="About"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              ></textarea>

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
                value={gender}
                className="select select-neutral"
                onChange={(e) => setGender(e.target.value)}
              >
                <option disabled value="">
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>

              {error && <p className="text-red-500">{error}</p>}

              <div className="card-actions">
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </div>
          </div>
        </section>
      </form>
    </section>
  );
};
