'use client'

import { useState } from 'react';
import { Package, MapPin, Loader2 } from 'lucide-react';
import api from '@/app/services/api';


const CreateDeliveryForm = () => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            customerName: formData.get('customerName'),
            address: formData.get('address'),
            latitude: Number(formData.get('latitude')),
            longitude: Number(formData.get('longitude'))
        };

        try {
            await api.post('/deliveries', data);
            alert('Entrega criada com sucesso!');
            (e.target as HTMLFormElement).reset();
        } catch (error) {
            console.error(error);
            alert('Erro ao criar entrega.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Nome do Cliente</label>
                <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2">
                    <Package size={18} className="text-zinc-500" />
                    <input name="customerName" required placeholder="Ex: Mercado Bem Barato" className="bg-transparent flex-1 outline-none text-zinc-200 placeholder:text-zinc-600" />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Endereço</label>
                <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2">
                    <MapPin size={18} className="text-zinc-500" />
                    <input name="address" required placeholder="Ex: Av. Torquato Tapajós, 123" className="bg-transparent flex-1 outline-none text-zinc-200 placeholder:text-zinc-600" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Latitude</label>
                    <input name="latitude" type="number" step="any" required defaultValue="-3.1190" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 outline-none" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Longitude</label>
                    <input name="longitude" type="number" step="any" required defaultValue="-60.0217" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 outline-none" />
                </div>
            </div>

            <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                {loading ? <Loader2 className="animate-spin" /> : 'Criar Entrega'}
            </button>
        </form>
    )
}

export default CreateDeliveryForm;