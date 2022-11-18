import express from "express";
import Institute from '../models/Institute.js'

const institute = express.Router();

institute.get('/', (req, res) => {
    res.send('Institute routes');
});

institute.post("/register", async (req, res) => {
    
    const { name, type, cpnj, address } = req.body;

    const alreadyExistsInstitute = await Institute.findOne({ where: { name } }).catch(
        (err) => {
            console.log("Error: ", err);
        }
    );

    if (alreadyExistsInstitute) {
        return res.status(409).json({ message: "Institute already registered!" });
    }

    const newInstitute = new Institute({ name, type, cpnj, address });
    const savedInstitute = await newInstitute.save().catch((err) => {
        console.log("Error: ", err);
        res.status(500).json({ error: "Sorry! Could not register the Institute" });
    });

    if (savedInstitute) res.json({ message: "New Institute Registered!" });
});

institute.get('/find', async (req, res) => {
    const Institutes = await Institute.findAll().catch(
        (err) => {
            console.log(err)
        }
    );

    if (Institutes){
        return res.json({Institutes})
    } else {
        return null
    }
})

export default Institute;