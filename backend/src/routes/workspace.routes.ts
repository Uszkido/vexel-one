import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// To be implemented: workspace controllers
router.get('/', authenticate, (req, res) => {
    res.json({ message: 'List of workspaces' });
});

export default router;
