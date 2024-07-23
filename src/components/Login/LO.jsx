import { useState } from "react";
import { assets } from "../../assets/assets";

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Add login logic here
    console.log("Login:", { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-custom-image bg-cover bg-center">
      <div className="bg-[#ffffffcf] backdrop-blur-sm p-8 rounded-md shadow-lg w-full max-w-sm">
        <img
          src={assets.orbitLogoRed}
          alt=""
          className="h-14 mx-auto mb-4 mt-2"
        />
        <form onSubmit={handleLogin}>
          <div className="mb-1">
            <label
              className="block text-[#999] text-sm font-bold mb-1"
              htmlFor="email"
            >
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow appearance-none rounded-sm w-full py-2 px-3 text-[#111111] mb-3 leading-tight focus:outline-none focus:shadow-outline bg-white focus:bg-[#ffffffbb]"
              required
            />
          </div>
          <div className="mb-1">
            <label
              className="block text-[#999] text-sm font-bold mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none rounded-sm w-full py-2 px-3 text-[#111111] mb-3 leading-tight focus:outline-none focus:shadow-outline bg-white focus:bg-[#ffffffbb]"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-[#999] text-sm font-bold mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none rounded-sm w-full py-2 px-3 text-[#111111] mb-3 leading-tight focus:outline-none focus:shadow-outline bg-white focus:bg-[#ffffffbb]"
              required
            />
          </div>
          <div className="flex items-center flex-col gap-1">
            <button
              type="submit"
              className="w-full bg-[#ff0000] hover:bg-[#dd0000] text-white font-bold py-[6px] px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
            <button
              type="submit"
              className="bg-[#ff0000] hover:bg-[#dd0000] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
