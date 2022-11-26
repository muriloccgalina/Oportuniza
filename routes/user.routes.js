import express from "express";
import User from "../models/User.js";
import verifyToken from "../config/auth.js";
import { cpf } from 'cpf-cnpj-validator';

const cpfvalid = cpf;
const user = express.Router();

user.get('/', (req, res) => {
    const token = req.headers['token'];
    const authData = verifyToken(token, res);
});

user.post('/register', async (req, res) => {
    const { name, cpf, password, email, phone, admin } = req.body;

    const alreadyExistsUser = await User.findOne(
        { where: { cpf } }
    ).catch((err) => console.log("Error: ", err));

    if (alreadyExistsUser) {
        console.log("Usuário existente: " + alreadyExistsUser);
        return res
            .status(409)
            .json({ message: "CPF already in use"})
    }

    if (!cpfvalid.isValid(cpf)) {
        console.log("Invalid CPF");
        return res
                .status(409)
                .json({ message: "CPF incorrect"})
    }

    const alreadyExistsEmail = await User.findOne(
        { where: { email } }
    ).catch((err) => console.log("Error: ", err));

    if (alreadyExistsEmail) {
        console.log("Email in use: " + alreadyExistsUser);
        return res
            .status(409)
            .json({ message: "EMAIL already in use"})
    }

    const newUser = new User({ name, cpf, password, email, phone, admin });
    const savedUser = await newUser.save().catch((err) => {
        console.log("Error: ", err);
        res.status(500).json({ error: "Unable to register user"});
    });

    if (savedUser) {
        console.log(savedUser);
        res.json({ message: "Thanks for signing up!" })
    } 


});

user.get('/find', async (req, res) => {
    const idUser = req.query.idUser
    const users = await User.findAll({
        where : { id: idUser}
    }).catch(
        (err) => {
            console.log(err)
        }
    );

    if (users){
        return res.json({users})
    } else {
        return null
    }
})


export default user;