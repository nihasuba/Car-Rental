"use client"
import { useState } from "react";
import axios from "axios";
import { useAppContext } from "@/context/AppContext";

const Register = () => {
  const [state, setState] = useState("register");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setShowRegister, setShowLogin } = useAppContext();

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/user/register", {
        name, email, password
      });
      if (response.data.success === true) {
        alert("Registered Successfully");
        setShowRegister(false);
        setShowLogin(true);
      } else {
        alert(response.data.message || "Registration failed");
      }
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <div onClick={() => setShowRegister && setShowRegister(false)} className="fixed top-0 bottom-0 left-0 right-0 flex items-center text-sm text-gray-600 bg-black/50">
      <form onSubmit={onSubmitHandler} onClick={e => e.stopPropagation()} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white">
        <p className="text-2xl font-medium m-auto">
          <span className="text-primary">User</span> Register
        </p>
        <div className="w-full">
          <p>Name</p>
          <input onChange={e => setName(e.target.value)} value={name} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="text" required />
        </div>
        <div className="w-full">
          <p>Email</p>
          <input onChange={e => setEmail(e.target.value)} value={email} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="email" required />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input onChange={e => setPassword(e.target.value)} value={password} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="password" required />
        </div>
        <p>
          Already have an account? {""}
          <span className="text-primary cursor-pointer"
          onClick={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}>
            click here
          </span>
        </p>
        <button className="bg-primary hover:bg-blue-800 transition-all text-white w-full py-2 rounded-md cursor-pointer">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;