import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleLogin() {
    setLoading(true);
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/user/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log("Login Successful", response.data);
        toast.success("Login Succesful");
        localStorage.setItem("token", response.data.token);

        const user = response.data.user;
        if (user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log("Login Failed", error.response.data);
        toast.error(error.response.data.message || "Login Failed");
        setLoading(false);
      });
    // navigate('/');
  }
  return (
    <div className="w-full h-screen bg-[url(/loginBg.jpg)] bg-cover bg-center flex">
      <div className="w-[50%] h-full"></div>
      <div className="w-[50%] h-full flex justify-center items-center">
        <div className="w-[450px] h-[600px] backdrop-blur-xl shadow-xl rounded-xl flex flex-col items-center justify-center">
          <input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]"
            placeholder="Email"
          />
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]"
            placeholder="Password"
          />
          <button
            onClick={handleLogin}
            className="w-[400px] h-[50px] bg-green-500 text-white rounded-xl cursor-pointer"
          >
            {loading ? "Loading..." : "Login"}
          </button>
          <p className="text-gray-900 text-center">
            {" "}
            Don't have an account yet?{" "}
            <span className="text-green-400 hover:text-green-700 cursor-pointer">
              <Link to="/register">Register Now</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
