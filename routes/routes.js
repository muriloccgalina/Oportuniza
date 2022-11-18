import express from 'express';
import user from './user.routes.js';
import institute from './institute.routes.js';
import donation from './donation.routes.js';
import login from './login.routes.js';

const router = express.Router();

router.use('/user', user);
router.use('/institute', institute);
router.use('/donation', donation);
router.use('/login', login);

export default router;