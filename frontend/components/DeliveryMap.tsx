'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],  
  iconAnchor: [12, 41],    
  popupAnchor: [1, -34],   
  shadowSize: [41, 41]
});

interface Delivery {
  id: string
  customerName: string
  latitude: number
  longitude: number
  address: string
  status: string
}

interface DeliveryMapProps {
  deliveries: Delivery[]
}

export default function DeliveryMap({ deliveries }: DeliveryMapProps) {
  const centerPosition: [number, number] = deliveries.length > 0 
    ? [deliveries[0].latitude, deliveries[0].longitude] 
    : [-3.1190, -60.0217]

  return (
    <div className="h-100 w-full rounded-xl overflow-hidden border border-zinc-800 shadow-lg z-0">
      <MapContainer 
        center={centerPosition} 
        zoom={13} 
        scrollWheelZoom={true} 
        style={{ height: "100%", width: "100%" }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {deliveries.map((delivery) => (
          <Marker 
            key={delivery.id} 
            position={[delivery.latitude, delivery.longitude]}
            icon={customIcon}
          >
            <Popup>
              <div className="text-sm">
                <strong className="block text-zinc-900 text-base">{delivery.customerName}</strong>
                <span className="text-zinc-600 block mb-1">{delivery.address}</span>
                
                <span className={`px-2 py-0.5 rounded text-xs font-bold text-white ${
                  delivery.status === 'DELIVERED' ? 'bg-green-600' : 
                  delivery.status === 'IN_TRANSIT' ? 'bg-blue-600' : 'bg-yellow-600'
                }`}>
                  {delivery.status}
                </span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}