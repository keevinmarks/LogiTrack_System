'use client'

import { useState } from 'react'
import { KeyRound, Loader2 } from 'lucide-react'

const ChangePasswordForm = () => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000))
        alert('Senha alterada com sucesso! (Simulação)')
        setLoading(false)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Nova Senha</label>
                <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2">
                    <KeyRound size={18} className="text-zinc-500" />
                    <input name="password" type="password" required className="bg-transparent flex-1 outline-none text-zinc-200" />
                </div>
            </div>
            <button disabled={loading} className="w-full bg-zinc-700 hover:bg-zinc-600 text-white font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                {loading ? <Loader2 className="animate-spin" /> : 'Alterar Senha'}
            </button>
        </form>
    )
}

export default ChangePasswordForm;