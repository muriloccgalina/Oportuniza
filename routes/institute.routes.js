import express from "express";
import Institute from '../models/Institute.js'

const institute = express.Router();

institute.get('/', (req, res) => {
    res.send('Rota de Institute');
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

    const newRestaurant = new Institute({ name, type, cnpj, address });
    const savedRestaurant = await newRestaurant.save().catch((err) => {
        console.log("Error: ", err);
        res.status(500).json({ error: "Sorry! Could not register the institute" });
    });

    if (savedRestaurant) res.json({ message: "New Institute Registered!" });
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