'use client'

import dynamic from 'next/dynamic'
import { Truck } from 'lucide-react'

interface Delivery {
  id: string
  customerName: string
  latitude: number
  longitude: number
  address: string
  status: string
}

const DeliveryMap = dynamic(
  () => import('./DeliveryMap').then((mod) => {
    return (mod as any).default
  }), 
  { 
    ssr: false,
    loading: () => (
      <div className="h-100 w-full bg-zinc-900 animate-pulse rounded-xl border border-zinc-800 flex items-center justify-center text-zinc-500">
        <Truck className="animate-bounce mr-2" /> Carregando Mapa...
      </div>
    )
  }
) as any

export default function MapWrapper({ deliveries }: { deliveries: Delivery[] | null }) {
  return <DeliveryMap deliveries={deliveries} />
}