import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext'; // جلب بيانات المستخدم من السياق
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Assuming you're using axios for API requests

const Profile = () => {
  const { user, setUser } = useAuth(); // جلب بيانات المستخدم من الـ AuthContext
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false); // state to toggle edit mode
  const [formData, setFormData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    profile_picture: user?.profile_picture || '',
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle file change for profile picture
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, profile_picture: file }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('first_name', formData.first_name);
    formDataToSubmit.append('last_name', formData.last_name);
    formDataToSubmit.append('email', formData.email);

    if (formData.profile_picture) {
      formDataToSubmit.append('profile_picture', formData.profile_picture);
    }

    try {
        const response = await axios.post('/api/user/update', formDataToSubmit, {
            headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUser(response.data.user); // Update the user data in context
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error('Error updating profile', error);
    }
  };

  // Don't render the profile page if there's no user (before the redirect happens)
  if (!user) {
    return null; // or a loading spinner
  }

  return (
    <div className="profile-page bg-[url('/assets/images/bg.jpg')] bg-cover min-h-screen flex justify-center items-center p-4 backdrop-blur-md">
      <div className="profile-card bg-gradient-to-r from-slate-800 via-gray-900 to-slate-700 backdrop-blur-lg shadow-xl rounded-lg p-8 w-full md:w-[60%] max-w-xl h-auto flex items-center justify-center flex-col space-y-6">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full p-2 rounded border-2 border-gray-300"
              placeholder="First Name"
            />
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full p-2 rounded border-2 border-gray-300"
              placeholder="Last Name"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 rounded border-2 border-gray-300"
              placeholder="Email"
            />
            <input
              type="file"
              name="profile_picture"
              onChange={handleFileChange}
              className="w-full p-2 rounded border-2 border-gray-300"
            />
            <div className="flex justify-between">
              <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-blue-600">
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <img
              src={user?.profile_picture || '/assets/images/userman.jpeg'}
              alt="Profile"
              className={`w-36 h-36 mx-auto rounded-full border-4 ${user.status === 'active' ? 'border-green-500' : 'border-gray-500'}`}
            />
            <span className={`text-lg font-semibold ${user.status === 'active' ? 'text-green-500' : 'text-gray-500'}`}>{user.status}</span>

            <h1 className="text-3xl text-yellow-400 font-semibold mt-4">Name: {user.first_name} {user.last_name}</h1>
            <p className="text-white text-lg mt-2">Email: {user.email}</p>
            <p className="text-white text-lg mt-2">Role: {user.role === "2" ? "User" : "Admin"}</p>

            <div className="mt-6">
              <button
                onClick={() => setIsEditing(true)}
                className="inline-block bg-blue-500 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-blue-600 transform hover:scale-105 transition-all"
              >
                Edit Profile
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
