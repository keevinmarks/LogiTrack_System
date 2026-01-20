import express from 'express';
import { prisma } from '../src/prisma/prisma';
import { hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {compare} from 'bcryptjs';
export const usersRouter = express.Router();


usersRouter.post("/login", async (req, res) => {
    try{
        const {email, password} = req.body;

        const user = await prisma.user.findUnique({
            where: {email}
        });

        if(!user){
            return res.status(400).json({error: "E-mail ou senha inváilidos"});
        }

        const isPasswordValid = await compare(password, user.password);

        if(!isPasswordValid){
            return res.status(400).json({error: "E-mail ou senha inváilidos"});
        }

        const token = jwt.sign(
            {id: user.id, role: user.role, name: user.name},
            process.env.JWT_SECRET as string,
            {expiresIn: '1h'}
        )

        return res.json({
            user:{
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token
        })
    }catch(error){
        console.error(error);
        return res.status(500).json({error: "Erro ao fazer login"});
    }
})

usersRouter.post("/", async (req, res) => {
    try{
        const {name, email, password, role} = req.body;

        const userExists = await prisma.user.findUnique({
            where: {email}
        });

        if(userExists){
            return res.status(400).json({error: "Usuário já existe"});
        }

        const passwordHash = await hash(password, 8);
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: passwordHash,
                role
            }
        });

        return res.status(201).json({
            id: newUser.id,
            name: newUser.name,
            email:newUser.email
        });
    }catch(error){
        console.error(error);
        return res.status(500).json({error: "Erro ao criar usuário"});
    }
});