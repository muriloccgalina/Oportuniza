import express from "express";
import Donation from '../models/Donation.js';
import Institute from '../models/Institute.js';

const home = express.Router();

home.get('/', (req, res) => {
    res.send('Donation Routes');
});

home.get('/findAllDonations', async (req, res) => {
    const donations = await Donation.findAll({
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

export default home;  