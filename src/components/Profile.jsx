import React, { useState } from 'react';

export const Profile = () => {
  const [image, setImage] = useState(null);
  const [age, setAge] = useState('');
  const [about, setAbout] = useState('');
  const [error, setError] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!age || !about) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    // Handle profile submission logic here (e.g., API call to save profile data)
    console.log({ image, age, about });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center p-4">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>

      <div className="mb-4">
        <label className="block mb-2">Profile Image:</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {image && <img src={image} alt="Profile" className="mt-2 w-32 h-32 rounded-full" />}
      </div>

      <div className="mb-4">
        <label className="block mb-2">Age:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="input input-neutral"
          placeholder="Enter your age"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">About:</label>
        <textarea
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          className="textarea textarea-neutral"
          placeholder="Tell us about yourself"
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <button type="submit" className="btn btn-primary">Save Profile</button>
    </form>
  );
};