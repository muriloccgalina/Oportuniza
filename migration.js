import connection from "./config/db.js";
import Institute from "./models/Institute.js";
import Donation from "./models/Donation.js";
import User from "./models/User.js";

const migrate = async () => {
    try {
        const result = await connection.sync();
        console.log(result);
    } catch (error) {
        console.log(error);
    }
};

migrate();