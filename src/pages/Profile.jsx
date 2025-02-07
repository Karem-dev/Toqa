import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "../components/Nav";

const Profile = () => {
  axios.defaults.baseURL = "http://localhost:8000";
  axios.defaults.withCredentials = true;
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    image: user?.image || "",
  });
  const { logout } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("first_name", formData.first_name);
    formDataToSubmit.append("last_name", formData.last_name);
    formDataToSubmit.append("email", formData.email);

    if (formData.image) {
      formDataToSubmit.append("image", formData.image);
    }

    try {
      // Change from POST to PUT or PATCH based on the backend setup
      const response = await axios.patch("/api/user", formDataToSubmit, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
        withCredentials: true,
      });

      setUser(response.data.user);
      setIsEditing(false);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  if (!user) return null;

  return (
    <>
    <Nav/>
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
              name="image"
              onChange={handleFileChange}
              className="w-full p-2 rounded border-2 border-gray-300"
            />
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-blue-600"
              >
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
            <div className="w-48 h-48 bg-white rounded-full flex items-center ">
              <img
                src={
                  user?.image
                    ? `${axios.defaults.baseURL}/storage/${user.image}`
                    : "/assets/images/userman.jpeg"
                }
                alt="Profile"
                className={`w-full h-full object-cover   mx-auto rounded-full border-4 ${
                  user.status === "active"
                    ? "border-green-500"
                    : "border-gray-500"
                }`}
              />
            </div>

            <span
              className={`text-lg font-semibold ${
                user.status === "active" ? "text-green-500" : "text-gray-500"
              }`}
            >
              {user.status}
            </span>
            <h1 className="text-3xl text-yellow-400 font-semibold mt-4">
              Name: {user.first_name} {user.last_name}
            </h1>
            <p className="text-white text-lg mt-2">Email: {user.email}</p>
            <p className="text-white text-lg mt-2">
              Role: {user.role == 2 ? "User" : "Admin"}
            </p>
            <div className="mt-6">
              <button
                onClick={logout}
                className="inline-block bg-red-500 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-red-600 transform hover:scale-105 transition-all"
              >
                logout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
    </>
  );
};

export default Profile;
