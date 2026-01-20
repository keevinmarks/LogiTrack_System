
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Settings, Shield, User, Truck, Package } from 'lucide-react'
import BackButton from '@/components/BackButton'
import { jwtDecode } from 'jwt-decode'
import CreateDeliveryForm from '@/components/CreateDeliveryForm'
import RegisterDriverForm from '@/components/RegisterDriverForm'
import RegisterUserForm from '@/components/RegisteruserForm'
import ChangePasswordForm from '@/components/ChangePasswordForm'

export default async function SettingsPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) {
    redirect('/')
  }

  const decodedToken: {id: string; role: string; name: string} = jwtDecode(token);
  const isManager = decodedToken.role === 'MANAGER'; 

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
           <BackButton />
        </div>
        <header className="flex items-center gap-3 border-b border-zinc-800 pb-6">
          <div className="p-3 bg-zinc-900 rounded-xl">
            <Settings className="text-blue-500 w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Configurações do Sistema</h1>
            <p className="text-zinc-400">Gerencie usuários, entregas e motoristas.</p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-6 text-blue-400">
              <Package />
              <h2 className="text-lg font-bold text-zinc-100">Nova Entrega</h2>
            </div>
            <CreateDeliveryForm />
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-6 text-zinc-400">
              <Shield />
              <h2 className="text-lg font-bold text-zinc-100">Segurança</h2>
            </div>
            <ChangePasswordForm />
          </div>
          {isManager && (
            <>
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 border-l-4 border-l-emerald-600">
                <div className="flex items-center gap-2 mb-6 text-emerald-500">
                  <Truck />
                  <h2 className="text-lg font-bold text-zinc-100">Cadastrar Motorista</h2>
                </div>
                <div className="mb-4 text-xs text-zinc-500 uppercase font-bold tracking-wider">
                  Área do Gerente
                </div>
                <RegisterDriverForm />
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 border-l-4 border-l-purple-600">
                <div className="flex items-center gap-2 mb-6 text-purple-500">
                  <User />
                  <h2 className="text-lg font-bold text-zinc-100">Novo Usuário do Sistema</h2>
                </div>
                <div className="mb-4 text-xs text-zinc-500 uppercase font-bold tracking-wider">
                  Área do Gerente
                </div>
                <RegisterUserForm />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}