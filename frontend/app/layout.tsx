import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

// Se tiver a linha "import 'leaflet/dist/leaflet.css'", PODE REMOVER.
// Vamos usar o link CDN abaixo que é mais seguro.

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LogiTrack',
  description: 'Sistema de Logística',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <head>
        {/* SOLUÇÃO DO MAPA BUGADO: Importando o CSS direto da fonte */}
        <link 
          rel="stylesheet" 
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
