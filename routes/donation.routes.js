import express from "express";
import Donation from '../models/Donation.js';
import Institute from '../models/Institute.js';
import User from "../models/User.js";

const donation = express.Router();

donation.get('/', (req, res) => {
    res.send('Donation Routes');
});

donation.post("/register", async (req, res) => {

    const { idUser, idInstitute, itens, qtde } = req.body;

    const alreadyExistsDonation = await Donation.findOne({ where: { idUser, idInstitute } }).catch(
        (err) => {
            console.log("Error: ", err);
        }
    );

    if (alreadyExistsDonation) {
        return res.status(409).json({ message: "Donation already registered!" });
    }

    const newDonation = new Donation({ idUser, idInstitute, itens, qtde });
    const savedDonation = await newDonation.save().catch((err) => {
        console.log("Error: ", err);
        res.status(500).json({ error: "Sorry! Could not register the Donation" });
    });

    if (savedDonation) res.json({ message: "New Donation Registered!" });
});

donation.get('/findByInstitute', async (req, res) => {
    const idInstitute = req.query.idInstitute;
    const donations = await Donation.findAll({
        where: {
            idInstitute: idInstitute
        },
        include: [{model: User}]
    }).catch(
        (err) => {
            console.log(err)
        }
    );

    if (donations) {
        return res.json({ donations })
    } else {
        return null
    }
})

donation.get('/findByUser', async (req, res) => {
    const idUser = req.query.idUser;
    const donations = await Donation.findAll({
        where: {
            idUser: idUser
        },
        include: [{model: Institute}]
    }).catch(
        (err) => {
            console.log(err)
        }
    );

    if (donations) {
        return res.json({ donations })
    } else {
        return null
    }
})

export default donation;  