'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Settings, LogOut, ChevronDown } from 'lucide-react';

type Props = {
    userName: string;
    userRole: string;
}

const UserMenu = ({ userName, userRole }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleLogout = () => {
        document.cookie = 'token=; Max-Age=0; path=/;'
        router.push('/')
    }

    const handleSettings = () => {
        router.push('/settings');
    }

    return(
        <div className="relative">
      {/* Botão do Usuário */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:bg-zinc-800 p-2 rounded-lg transition-colors"
      >
        <div className="h-8 w-8 bg-zinc-700 rounded-full flex items-center justify-center">
          <User size={18} className="text-zinc-300" />
        </div>
        <div className="text-right hidden sm:block">
          <div className="text-sm font-medium text-zinc-200">{userName}</div>
          <div className="text-xs text-zinc-400">{userRole}</div>
        </div>
        <ChevronDown size={16} className={`text-zinc-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          <div className="absolute right-0 top-full mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl z-50 overflow-hidden">
            <div className="p-1">
              <button 
                onClick={handleSettings} // Aqui você colocaria um router.push('/settings')
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-md transition-colors text-left cursor-pointer"
              >
                <Settings size={16} />
                Configurações
              </button>
              
              <div className="h-px bg-zinc-800 my-1" />
              
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-900/20 hover:text-red-300 rounded-md transition-colors text-left cursor-pointer"
              >
                <LogOut size={16} />
                Sair
              </button>
            </div>
          </div>
        </>
      )}
    </div>
    )
}

export default UserMenu;