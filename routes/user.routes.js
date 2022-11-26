import express from "express";
import User from "../models/User.js";
import verifyToken from "../config/auth.js";

const user = express.Router();

user.get('/', (req, res) => {
    const token = req.headers['token'];
    const authData = verifyToken(token, res);
});

user.post('/register', async (req, res) => {
    const { name, cpf, password, admin } = req.body;

    const alreadyExistsUser = await User.findOne(
        { where: { cpf } }
    ).catch((err) => console.log("Error: ", err));

    if (alreadyExistsUser) {
        console.log("Usuário existente: " + alreadyExistsUser);
        return res
            .status(409)
            .json({ message: "CPF already in use"})
    }

    const newUser = new User({ name, cpf, password, admin });
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