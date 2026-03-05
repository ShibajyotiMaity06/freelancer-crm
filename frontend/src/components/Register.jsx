import { useNavigate } from "react-router-dom"
import { useState } from "react"

function Register () {
    const [username , setUsername] = useState('')
    const [password , setPassword] = useState('')
    const [email , setEmail] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username , email, password }),
      });
      const data = await res.json()
      if (res.ok) {
        localStorage.setItem("token" , data.token)
        localStorage.setItem("userf", JSON.stringify({ username: data.username }));

        navigate('/dashboard')
      } else {
        alert(data.message)
      }

        } catch (err) {
            console.log(err)
        }
    }


 return (
    <div className="min-h-screen bg-[#030303] text-zinc-50 flex items-center justify-center">
      <div className="bg-zinc-900/50 backdrop-blur-xl p-8 rounded-2xl border border-zinc-800 w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Register</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>
          
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>
          
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
          >
            Register
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-zinc-400">
            have an account? 
            <a href="/login" className="text-indigo-400 hover:text-indigo-300 ml-1 transition-colors">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}


export default Register;
