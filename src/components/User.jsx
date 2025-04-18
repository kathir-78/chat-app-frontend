import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addListOfUsers } from '../utils/userDataSlice';
import { Link } from 'react-router-dom';

export const User = () => {
  const dispatch = useDispatch();
  const listOfUsers = useSelector((state) => state.connections);

  const getUser = async () => {
    if (listOfUsers) return;

    try {
      const users = await axios.get(import.meta.env.VITE_API_URL + '/user', { withCredentials: true });
      console.log(users);
      dispatch(addListOfUsers(users.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Users</h2>
      <ul className="list bg-base-100 rounded-lg shadow-lg">
        {listOfUsers && listOfUsers.length > 0 ? (
          listOfUsers.map((user) => (
            <li key={user._id} className="flex items-center gap-6 p-4 list-row">

              <div className="flex-shrink-0">
                <img
                  className="w-12 h-12 rounded-full object-cover"
                  src={user.imageUrl} 
                  alt={user.firstName}
                />
              </div>

              <div className="flex-1">
                <div className="font-semibold text-lg">{user.firstName} {user.lastName}</div>
                <p className="text-base text-gray-600 mt-2">{user.about || 'No description available.'}</p>
              </div>

              <Link to={`/chat/${user._id}`}>
                <button className="btn btn-outline btn-secondary">Chat</button>
              </Link>
            </li>
          ))
        ) : (
          <li className="p-4 text-center text-gray-500">No users found.</li>
        )}
      </ul>
    </div>
  );
};