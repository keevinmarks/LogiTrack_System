import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { driversRouter } from './routers/drivers';
import { deliverisRouter } from './routers/deliveries';
import { routersRouter } from './routers/router';
import { usersRouter } from './routers/users';
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/drivers", driversRouter);
app.use("/deliveries", deliverisRouter);
app.use("/routes", routersRouter);
app.use("/users", usersRouter);



const port = 3000;
app.listen(port, () =>{
    console.log(`Server is running on http://localhost:${port}`)
})


