import express from "express";
import Institute from '../models/Institute.js'
import { cnpj } from 'cpf-cnpj-validator';

const cnpjvalid = cnpj;

const institute = express.Router();

institute.get('/', (req, res) => {
    res.send('Institute Routes');
});

institute.post("/register", async (req, res) => {
    
    const { name, type, cnpj, address } = req.body;

    const alreadyExistsInstitute = await Institute.findOne({ where: { name } }).catch(
        (err) => {
            console.log("Error: ", err);
        }
    );

    if (alreadyExistsInstitute) {
        return res.status(409).json({ message: "Institute already registered!" });
    }

    if (!cnpjvalid.isValid(cnpj)) {
        console.log("Invalid CNPJ");
        return res
            .status(409)
            .json({ message: "CNPJ incorrect"})
    }

    const newInstitute = new Institute({ name, type, cnpj, address });
    const savedInstitute = await newInstitute.save().catch((err) => {
        console.log("Error: ", err);
        res.status(500).json({ error: "Sorry! Could not register the institute" });
    });

    if (savedInstitute) res.json({ message: "New Institute Registered!" });
});

institute.get('/find', async (req, res) => {
    const institutes = await Institute.findAll().catch(
        (err) => {
            console.log(err)
        }
    );

    if (institutes){
        return res.json({institutes})
    } else {
        return null
    }
})

export default institute;