import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();

//Memoria
const users = [];

//Rota registro
router.post("/register", async(req, res) => {
    const{username, password} = req.body;

    const userExit = users.find((u) => u.username === username);
    if(userExit){
        return res.status(400).json({message: "Usuario já existe"});

    }

    const hashPassword = await bcrypt.hash(password, 10);
    userExit.push ({username, password:hashPassword});
    res.json({message:"Usuario registrado com sucesso"})
});

//Login
router.post("login", async (req,res) => {
    const{username, password} = req.body;
    const user = users.find((u) => u.username === username);
    
    if(!user){
        return res.status(400).json({message: "Usuario não encontrado"});
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.status(400).json({massage:"Senha ivalida"})
    }
    const token = jwt.sign({username}, "secreta123", {expiresIn:"1h"});
    res.json({token});

    //Rota protegida
    router.get("/profile", authMiddleware, (req, res) =>{
        res.json({message:`Bem vindo ${user}`})
    })
})



export default router;