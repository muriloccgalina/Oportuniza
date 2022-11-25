import express from "express";
import Donation from '../models/Donation.js';

const donation = express.Router();

donation.get('/', (req, res) => {
    res.send('Donations routes');
});

donation.post("/register", async (req, res) => {

    const { idInstitute, idUser, item, qtde } = req.body;

    const alreadyExistsdonation = await Donation.findOne({ where: { idUser, cpnj } }).catch(
        (err) => {
            console.log("Error: ", err);
        }
    );

    if (alreadyExistsdonation) {
        return res.status(409).json({ message: "donation already registered!" });
    }

    const newDonation = new Donation({ idUser, cpnj, item, qtde });
    const savedDonation = await newDonation.save().catch((err) => {
        console.log("Error: ", err);
        res.status(500).json({ error: "Sorry! Could not register the donation" });
    });

    if (savedDonation) res.json({ message: "New donation Registered!" });
});

donation.get('/findByInstitute', async (req, res) => {
    const idInstitute = req.query.idInstitute;
    const donations = await Donation.findAll(
        {where: {
            idInstitute : idInstitute
        },
        include: [{model: User}]
    }).catch(
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
    const idUser = req.query.idUser;
    const donations = await Donation.findAll(
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