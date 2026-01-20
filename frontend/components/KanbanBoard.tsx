'use client'

import { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { MapPin, Package, User } from 'lucide-react';
import api from '@/app/services/api';

interface Driver {
  id: string;
  name: string;
}

interface Delivery {
  id: string
  customerName: string
  status: 'PENDING' | 'IN_TRANSIT' | 'DELIVERED'
  address: string
  driverId?: string | null
}

interface KanbanBoardProps {
  initialDeliveries: Delivery[]
  drivers: Driver[]
}

const COLUMNS = {
  PENDING: "Pendente",
  IN_TRANSIT: "Em rota",
  DELIVERED: "Entregue"
}

const KanbanBoard = ({ initialDeliveries, drivers }: KanbanBoardProps) => {
  const [deliveries, setDeliveries] = useState<Delivery[]>(initialDeliveries);
  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const newStatus = destination.droppableId as Delivery['status'];

    const updateDeliveries = deliveries.map(item => {
      if (item.id === draggableId) {
        return { ...item, status: newStatus }
      }
      return item
    });

    setDeliveries(updateDeliveries);

    try {
      await api.patch(`/deliveries/${draggableId}/status`, {
        status: newStatus
      })
    } catch (error) {
      console.error("Erro ao atualizar status", error);
      alert("Erro ao mover card. Revertendo...");
      setDeliveries(deliveries);
    }
  }


  const handleAssignDriver = async (deliveryId: string, driverId: string) => {
    const updatedDeliveries = deliveries.map(item => {
      if (item.id === deliveryId) {
        return { ...item, driverId: driverId || null }
      }
      return item
    })

    setDeliveries(updatedDeliveries)
    try {
      await api.patch(`/deliveries/${deliveryId}/assign`, {
        driverId: driverId || null
      })
    } catch (error) {
      console.error("Erro ao atribuir motorista", error);
      alert("Erro ao definir motorista.");
      setDeliveries(deliveries);
    }
  }

  const getColumnDeliveries = (status: string) => {
    return deliveries.filter(d => d.status === status)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {Object.entries(COLUMNS).map(([statusKey, title]) => (
          <div key={statusKey} className="flex flex-col h-full">
            <div className={`p-3 rounded-t-xl font-bold border-b-4 bg-zinc-900 border-zinc-800
              ${statusKey === 'PENDING' ? 'border-b-yellow-500' : ''}
              ${statusKey === 'IN_TRANSIT' ? 'border-b-blue-500' : ''}
              ${statusKey === 'DELIVERED' ? 'border-b-green-500' : ''}
            `}>
              {title}
              <span className="ml-2 text-xs bg-zinc-800 px-2 py-1 rounded text-zinc-400">
                {getColumnDeliveries(statusKey).length}
              </span>
            </div>
            <Droppable droppableId={statusKey}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`flex-1 p-2 bg-zinc-900/50 rounded-b-xl min-h-125 transition-colors
                  ${snapshot.isDraggingOver ? 'bg-zinc-800/80' : ''}
                  `}
                >
                  {getColumnDeliveries(statusKey).map((delivery, index) => (
                    <Draggable key={delivery.id} draggableId={delivery.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`p-4 mb-3 rounded-lg border bg-zinc-900 shadow-sm cursor-grab active:cursor-grabbing hover:border-zinc-600 transition-all
                            ${snapshot.isDragging ? 'border-blue-500 shadow-xl scale-105 rotate-2' : 'border-zinc-800'}
                          `}
                          style={provided.draggableProps.style}
                        >
                          <div className="font-semibold text-zinc-200">{delivery.customerName}</div>
                          <div className="mt-3 mb-2">
                            <div className="flex items-center gap-2 bg-zinc-950 p-1.5 rounded border border-zinc-800">
                              <User size={14} className="text-zinc-500" />
                              <select
                                className="bg-transparent text-xs text-zinc-300 w-full outline-none cursor-pointer"
                                value={delivery.driverId || ""}
                                onChange={(e) => handleAssignDriver(delivery.id, e.target.value)}
                                onPointerDown={(e) => e.stopPropagation()}
                              >
                                <option value="" className="bg-zinc-900">Sem Motorista</option>
                                {drivers.map(driver => (
                                  <option key={driver.id} value={driver.id} className="bg-zinc-900">
                                    {driver.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div className="text-xs text-zinc-500 mt-2 flex items-center gap-1">
                            <MapPin size={12} /> {delivery.address}
                          </div>
                          <div className="text-xs text-zinc-600 mt-2 flex items-center gap-1">
                            <Package size={12} /> ID: {delivery.id.slice(0, 6)}...
                          </div>
                        </div>
                      )}
                    </Draggable>

                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}

      </div>
    </DragDropContext>
  )
}
export default KanbanBoard;