'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import { Truck, Loader2 } from 'lucide-react';
import api from "@/app/services/api"

const LoginPage = () => {
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setloading(true);
    setError('');

    try{
      const response = await api.post("/users/login", {email, password});

      console.log(response.data);
      const {token} = response.data;
      const {user} = response.data;
      setCookie("user", user, {maxAge: 60 * 60});
      setCookie("token", token, {maxAge: 60 * 60});

      router.push('/dashboard');
    }catch(error){
      setError("Email ou senhas incorretos");
    } finally {
      setloading(false);
    }
  }

  return(
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-50 p-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-xl">
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 bg-blue-600 rounded-full mb-4">
            <Truck className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold">Acesse o LogiTrack</h1>
          <p className="text-zinc-400 text-sm">Gerenciamento logístico inteligente</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">E-mail</label>
            <input 
              type="email"
              required
              className="w-full bg-zinc-800 border border-zinc-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all placeholder:text-zinc-600"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Senha</label>
            <input 
              type="password"
              required
              className="w-full bg-zinc-800 border border-zinc-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage;