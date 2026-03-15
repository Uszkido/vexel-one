import { Router } from 'express';

const router = Router();

router.get('/metrics', (req, res) => {
    // Simulated real-time metrics
    res.json([
        { id: 'agents', value: (Math.floor(Math.random() * 5) + 10).toString(), change: '+2', up: true },
        { id: 'workflows', value: (Math.floor(Math.random() * 50) + 250).toString(), change: '+5%', up: true },
        { id: 'alerts', value: (Math.floor(Math.random() * 3) + 3).toString(), change: '-1', up: false },
        { id: 'api', value: ((Math.random() * 5) + 15).toFixed(1) + 'K', change: '+4%', up: true },
    ]);
});

router.get('/alerts', (req, res) => {
    res.json([
        { text: 'Logistics email delays after 4 PM correlate with Monday supply chain bottlenecks.', confidence: 88, tag: 'Supply Chain' },
        { text: 'Excavator EX-04 hydraulic pressure dropping. Probable failure within 48h.', confidence: 94, tag: 'Maintenance' },
        { text: 'Engineering team shows 18% higher burnout risk this sprint cycle.', confidence: 76, tag: 'Morale' },
    ]);
});

export default router;
