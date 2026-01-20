import express from 'express';
import { prisma } from '../src/prisma/prisma';


export const routersRouter = express.Router();

routersRouter.post("/", async (req, res) => {
    try{
        const {name, driverId, status} = req.body;

        const newRoute = await prisma.route.create({
            data: { name, driverId, status: status || "PLANNED"}
        });

        return res.status(201).json(newRoute);
    }catch(error){
        console.error(error);
        return res.status(500).json({error: "Erro ao criar rota"});
    }
});

routersRouter.get("/", async (req, res) => {
    try{
        const routers = await prisma.route.findMany({
            include: {
                driver: true,
                deliveries: true
            }
        });
        return res.json(routers);
    }catch(error){
        console.error(error);
        return res.status(500).json({error: "Erro ao buscar rotas"});
    }
});

routersRouter.patch("/:id/add_deliveries", async (req, res) => {
    const {id} = req.params;
    const {deliveryIds} = req.body;

    try{
        await prisma.delivery.updateMany({
            where: {
                id: {in: deliveryIds}
            },
            data:{
                routeId: id,
                status: "PENDING"
            }
        })

        return res.json({message: "Entregas adicionadas à rota com sucesso"});
    }catch(error){
        console.error(error);
        return res.status(500).json({error: "Erro ao adicionar entregas à rota"});
    }
})