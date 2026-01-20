import express from 'express';
import { prisma } from '../src/prisma/prisma';
import { driversRouter } from './drivers';

export const deliverisRouter = express.Router();

deliverisRouter.post("/", async (req, res) => {
    try{
        const {customerName, address, latitude, longitude} = req.body;

        const newDelivery = await prisma.delivery.create({
            data: {
                customerName,
                address,
                latitude,
                longitude,
                status: "PENDING"
            }
        });

        return res.status(201).json(newDelivery);
    }catch(error){
        console.error(error);
        return res.status(500).json({error: "Erro ao criar entrega"});
    }
});

deliverisRouter.get("/", async (req, res) => {
    const deliveries = await prisma.delivery.findMany({
        orderBy: {createdAt: "desc"},
        include: {driver: true}
    });
    return res.json(deliveries);
});


deliverisRouter.patch("/:id/status", async (req, res) => {
    const {id} = req.params;
    const {status, driverId} = req.body;

    try{
        const updateDelivery = await prisma.delivery.update({
            where: {id},
            data: {status}
        })
        return res.json(updateDelivery);
    }catch(error){
        console.error(error);
        return res.status(400).json({error: "Entrega não encontrada"});
    }
});

deliverisRouter.patch("/:id/assign", async (req, res) => {
    const { id } = req.params;
    const { driverId } = req.body; // Recebe o ID do motorista

    try {
        const updateDelivery = await prisma.delivery.update({
            where: { id },
            data: { 
                driverId: driverId || null // Se vier vazio, remove o motorista (null)
            }
        })
        return res.json(updateDelivery);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: "Erro ao atribuir motorista" });
    }
});