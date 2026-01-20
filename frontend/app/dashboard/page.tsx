import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Truck } from 'lucide-react'
import KanbanBoard from '@/components/KanbanBoard'
import MapWrapper from '@/components/MapWrapper'
import UserMenu from '@/components/UserMenu'
import { jwtDecode } from 'jwt-decode'


interface Driver {
  id: string
  name: string
}

interface Delivery {
  id: string
  customerName: string
  status: 'PENDING' | 'IN_TRANSIT' | 'DELIVERED'
  address: string
  latitude: number
  longitude: number
  driverId?: string | null 
  driver?: Driver
}

interface TokenPayLoad {
  name: string;
  sub: string;
  role: string;
}

async function getDrivers(token: string) {
  const res = await fetch('http://localhost:3000/drivers', {
    method: 'GET',
    headers: { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    cache: 'no-store'
  })

  if (!res.ok) return []
  return res.json() as Promise<Driver[]>
}

async function getDeliveries(token: string) {
  const res = await fetch('http://localhost:3000/deliveries', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store'
  })

  if (!res.ok) return null
  return res.json() as Promise<Delivery[]>
}

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if(!token){
    console.log("Token não encontrado.");
    redirect('/');
  }

  const [deliveries, drivers] = await Promise.all([
    getDeliveries(token),
    getDrivers(token)
  ])

  if (!deliveries) {
    console.log("Não foi possível obter as entregas.");
    redirect('/');
  }

  let userName = "";
  let roleUser = "";
  try{
    const decoded = jwtDecode<TokenPayLoad>(token);
    userName = decoded.name;
    roleUser = decoded.role;
  }catch(error){
    console.log("Token inválido");
    redirect('/login'); 
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      
      <header className="border-b border-zinc-800 p-4 bg-zinc-900 sticky top-0 z-50">
        <div className="max-w-350 mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="text-blue-500" />
            <span className="font-bold text-xl">LogiTrack</span>
          </div>
          <div className="flex items-center gap-4">
             <UserMenu userName={userName} userRole={roleUser}/>
          </div>
        </div>
      </header>
      
      <main className="max-w-350 mx-auto p-6 space-y-8">
        <section>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            📍 Mapa de Operações
          </h2>
          <MapWrapper deliveries={deliveries} />
        </section>
        <section>
           <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">📋 Quadro de Entregas</h2>
            <span className="text-zinc-500 text-sm">{deliveries.length} pedidos</span>
          </div>
          <KanbanBoard initialDeliveries={deliveries} drivers={drivers} />
        </section>

      </main>
    </div>
  )
}