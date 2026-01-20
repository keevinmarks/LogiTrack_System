import express from 'express';
import { prisma } from '../src/prisma/prisma';

export const driversRouter = express.Router();

// driversRouter.get("/", (req, res) => {
//     res.send("List of drivers");
// });


driversRouter.post("/", async (req, res) => {
    try{
        const {name, licensePlate, vehicleModel} = req.body;

        const newDriver = await prisma.driver.create({
            data: {
                name,
                licensePlate,
                vehicleModel
            }
        })

        return res.status(201).json(newDriver);
    }catch(error){
        console.error(error);
        return res.status(500).send({error: "Erro ao criar motorista"});
    }
});


driversRouter.get("/", async (req, res) => {
    const drivers = await prisma.driver.findMany();
    return res.json(drivers);
});
