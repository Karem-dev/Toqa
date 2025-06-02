import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify"; // استيراد ToastContainer و toast
import "react-toastify/dist/ReactToastify.css"; // استيراد الـ CSS الخاص بـ Toastify
import Nav from "../components/Nav";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [loading,setloading]=useState(false)
  // إعادة التوجيه إذا كان المستخدم قد سجل الدخول بالفعل
  if (user) {
    navigate("/profile");
    return null; // منع عرض النموذج إذا كان المستخدم قد سجل الدخول
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });
      setloading(true); // تحميل المتصفح

      if (response.data.success) {
        await login(response.data.token); // حفظ التوكن وجلب بيانات المستخدم
        toast.success("Login successful!"); // عرض توست للنجاح
        navigate("/");
        setloading(false); // قطع التحميل
      } else {
        toast.error(response.data.message || "Login failed"); // عرض توست للخطأ
        setError("Invalid credentials. Please try again.");
        setloading(false); // قطع التحميل
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong."); // عرض توست للخطأ
      setError("Something went wrong.");
    }
  };

  return (
    <>
    {/* <Nav/> */}
    
    <div className="min-h-screen flex items-center justify-center bg-[url('/assets/images/bg.jpg')]">
      <div className="bg-[url('/assets/images/bg.jpg')] p-8 rounded-lg shadow-xl border border-slate-500 shadow-gray-600 w-full max-w-md">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-100">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border outline-none border-none bg-slate-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-100">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border outline-none border-none bg-slate-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {loading ? "loading" : "Login" }
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
      <ToastContainer /> {/* تأكد من أن ToastContainer داخل JSX */}
    </div>
    </>
  );
}

export default Login;
