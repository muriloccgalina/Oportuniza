import express from "express";
import donation from '../models/Donation.js';

const donation = express.Router();

donation.get('/', (req, res) => {
    res.send('Donations routes');
});

donation.post("/register", async (req, res) => {

    const { idUser, idInstitute, comment, qtde, dateDonation } = req.body;

    const alreadyExistsdonation = await donation.findOne({ where: { idUser, idInstitute } }).catch(
        (err) => {
            console.log("Error: ", err);
        }
    );

    if (alreadyExistsdonation) {
        return res.status(409).json({ message: "donation already registered!" });
    }

    const newdonation = new donation({ idUser, idInstitute, comment, qtde, dateDonation });
    const saveddonation = await newdonation.save().catch((err) => {
        console.log("Error: ", err);
        res.status(500).json({ error: "Sorry! Could not register the donation" });
    });

    if (saveddonation) res.json({ message: "New donation Registered!" });
});

donation.get('/findByInstitute', async (req, res) => {
    const idInstitute = req.body.idInstitute;
    const donations = await donation.findAll(
        {where: {idInstitute}}
    ).catch(
        (err) => {
            console.log(err)
        }
    );

    if (donations){
        return res.json({donations})
    } else {
        return null
    }
})

donation.get('/findByUser', async (req, res) => {
    const idUser = req.body.idUser;
    const donations = await donation.findAll(
        {where: {idUser}}
    ).catch(
        (err) => {
            console.log(err)
        }
    );

    if (donations){
        return res.json({donations})
    } else {
        return null
    }
})

export default donation;