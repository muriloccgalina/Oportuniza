import express from "express";
import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const login = express.Router();

login.post('/', async (req, res) => {
    // Receber as informações de LOGIN
    const { cpf, password } = req.body;

    // Buscar EMAIL no Banco de Dados e armazenar
    const registeredUser = await User.findOne(
        { where: { cpf }}
    ).catch(
        (err) => {
            console.log("Error: ", err);
        }
    );

    if (!registeredUser)
        return res
            .status(400)
            .json({message: "Incorrect CPF or Password."})

    // Validar a SENHA do Usuário
    if (!bcrypt.compareSync(password, registeredUser.password) )
        return res
            .status(400)
            .json({message: "Incorrect CPF or Password."})
    
    // Geração do TOKEN
    const token = jwt.sign(
        // PAYLOAD: o que será armazenado no TOKEN
        {
            id: registeredUser.id,
            name: registeredUser.name,
            admin: registeredUser.admin
        }, 
        // Secret or Private Key
        process.env.JWT_SECRET,
        // Options
        {
            expiresIn: '1h'
        }
    );

    // Envia confirmação e Token para Usuário
    res.json({
        message: "Welcome!",
        token: token
    })


});

export default login;