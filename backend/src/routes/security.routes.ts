import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const router = Router();
const prisma = new PrismaClient();

// Add a new CCTV camera
router.post('/cameras', authenticate, async (req, res) => {
    const { name, rtspUrl, location, organizationId } = req.body;
    try {
        const camera = await prisma.camera.create({
            data: { name, rtspUrl, location, organizationId, status: 'ONLINE' }
        });

        // Trigger AI service to start analyzing stream
        // axios.post(`${process.env.AI_SERVICE_URL}/api/v1/security/start-monitoring`, {
        //  cameraId: camera.id,
        //  rtspUrl,
        //  organizationId
        // });

        res.status(201).json(camera);
    } catch (error) {
        res.status(500).json({ message: 'Error adding camera', error });
    }
});

// Get all cameras for an organization
router.get('/cameras/:orgId', authenticate, async (req, res) => {
    const { orgId } = req.params;
    try {
        const cameras = await prisma.camera.findMany({
            where: { organizationId: orgId }
        });
        res.json(cameras);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cameras' });
    }
});

// Webhook for AI to push Security Events (e.g. Motion detected)
router.post('/events/webhook', async (req, res) => {
    const { type, description, confidence, videoClipUrl, cameraId, organizationId } = req.body;
    try {
        const event = await prisma.securityEvent.create({
            data: { type, description, confidence, videoClipUrl, cameraId, organizationId }
        });

        // Trigger automation workflows (e.g., Send SMS, Sound Alarm)
        // await triggerWorkflow(organizationId, 'SECURITY_EVENT', event);

        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Error logging security event', error });
    }
});

// Get security event logs
router.get('/events/:orgId', authenticate, async (req, res) => {
    const { orgId } = req.params;
    try {
        const events = await prisma.securityEvent.findMany({
            where: { organizationId: orgId },
            include: { camera: true },
            orderBy: { createdAt: 'desc' },
            take: 50
        });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events' });
    }
});

export default router;
