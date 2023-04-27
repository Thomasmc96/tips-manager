import React, {useState} from "react";

const Login = () => {
    const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Username: ${username}\nPassword: ${password}`);
    // Send form data to server or perform login action
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="username" className="block font-bold mb-2">
          Username
        </label>
        <input
          type="text"
          id="username"
          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block font-bold mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-sandBeige text-black py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
      </div>
    </form>
  );
}
export default Login;