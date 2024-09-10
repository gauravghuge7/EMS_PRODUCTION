import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

function Employee() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    navigate("/home")
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-gradient-to-r from-blue-400 to-purple-400">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-2xl border border-gray-300">
        <h1 className="text-2xl font-bold text-center mb-6">Employee Login</h1>
        <form onSubmit={submit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500   hover:ring-blue-700"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 ">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Login
          </button>
          <div className="mt-4 text-center">
            <Link to="/forgot-password" className="text-blue-500 hover:underline">Forgot password?</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Employee;





