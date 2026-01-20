'use client'

import { useState } from 'react';
import { UserPlus, Mail, Lock, Loader2 } from 'lucide-react';
import api from '@/app/services/api';

const RegisterUserForm = () => {

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);

        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
            role: formData.get("role")
        }

        try {
            await api.post("/users", data);
            alert("Usuário criado com sucesso");
            (e.target as HTMLFormElement).reset();
        } catch (error) {
            console.error(error);
            alert("Erro ao criar usuário");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Nome</label>
                <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2">
                    <UserPlus size={18} className="text-zinc-500" />
                    <input name="name" required placeholder="Nome completo" className="bg-transparent flex-1 outline-none text-zinc-200" />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Email</label>
                <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2">
                    <Mail size={18} className="text-zinc-500" />
                    <input name="email" type="email" required placeholder="usuario@logitrack.com" className="bg-transparent flex-1 outline-none text-zinc-200" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Senha</label>
                    <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2">
                        <Lock size={18} className="text-zinc-500" />
                        <input name="password" type="password" required className="bg-transparent flex-1 outline-none text-zinc-200" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Cargo</label>
                    <select name="role" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 outline-none">
                        <option value="DRIVER_APP">Usuário Comum</option>
                        <option value="MANAGER">Gerente</option>
                    </select>
                </div>
            </div>

            <button disabled={loading} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                {loading ? <Loader2 className="animate-spin" /> : 'Registrar Usuário'}
            </button>
        </form>
    )
}

export default RegisterUserForm;