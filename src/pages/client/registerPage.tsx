import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function handleRegister() {
    // simple client-side validation for password match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/user/", {
        firstName,
        lastName,
        email,
        password,
      })
      .then((response) => {
        console.log("Register Successful", response.data);
        toast.success("Registration Successful! Please login.");
        setLoading(false);
        navigate("/login");
      })
      .catch((error) => {
        console.log("Register Failed", error.response?.data);
        toast.error(error.response?.data?.message || "Registration Failed");
        setLoading(false);
      });
  }

  return (
    <div className="w-full h-screen bg-[url(/loginBg.jpg)] bg-cover bg-center flex">
      <div className="w-[50%] h-full"></div>
      <div className="w-[50%] h-full flex justify-center items-center">
        <div className="w-[450px] h-[760px] backdrop-blur-xl shadow-xl rounded-xl flex flex-col items-center justify-center">
          <input
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
            className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]"
            placeholder="First Name"
          />

          <input
            type="text"
            onChange={(e) => setLastName(e.target.value)}
            className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]"
            placeholder="Last Name"
          />

          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]"
            placeholder="Email"
          />

          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]"
            placeholder="Password"
          />

          <input
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]"
            placeholder="Confirm Password"
          />

          <button
            onClick={handleRegister}
            className="w-[400px] h-[50px] bg-green-500 text-white rounded-xl cursor-pointer mt-3"
            disabled={loading}
          >
            {loading ? "Loading..." : "Register"}
          </button>

          <p className="text-gray-900 text-center mt-3">
            Already have an account?
            <span className="text-green-400 hover:text-green-700 cursor-pointer">
              <Link to="/login"> Login now</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
