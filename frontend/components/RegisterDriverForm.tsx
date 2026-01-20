'use client'

import { useState } from 'react';
import { Truck, Loader2 } from 'lucide-react';
import api from '@/app/services/api';


const RegisterDriverForm = () => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);

        const data = {
            name: formData.get('name'),
            licensePlate: formData.get('licensePlate'),
            vehicleModel: formData.get('vehicleModel')
        };

        try {
            await api.post("/drivers", data);
            alert('Motorista cadastrado');
            (e.target as HTMLFormElement).reset();
        } catch (error) {
            alert('Erro ao cadastrar motorista');
        } finally {
            setLoading(false);
        }


    }
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Nome do Motorista</label>
                <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2">
                    <Truck size={18} className="text-zinc-500" />
                    <input name="name" required placeholder="Ex: Nome da Silva" className="bg-transparent flex-1 outline-none text-zinc-200" />
                </div>

                <label className="block text-sm font-medium text-zinc-400 mb-1">Número da placa</label>
                <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2">
                    <Truck size={18} className="text-zinc-500" />
                    <input name="licensePlate" required placeholder="Ex: ABC1234" className="bg-transparent flex-1 outline-none text-zinc-200" />
                </div>

                <label className="block text-sm font-medium text-zinc-400 mb-1">Modelo do veículo</label>
                <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2">
                    <Truck size={18} className="text-zinc-500" />
                    <input name="vehicleModel" required placeholder="Ex: Volkswagen, Mercedes " className="bg-transparent flex-1 outline-none text-zinc-200" />
                </div>
            </div>
            <button disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                {loading ? <Loader2 className="animate-spin" /> : 'Cadastrar Motorista'}
            </button>
        </form>
    )
}

export default RegisterDriverForm;