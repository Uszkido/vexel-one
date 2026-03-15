import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Knowledge Base Management
router.post('/knowledge-base', authenticate, async (req, res) => {
    const { name, description, organizationId } = req.body;
    try {
        const kb = await prisma.knowledgeBase.create({
            data: { name, description, organizationId }
        });
        res.status(201).json(kb);
    } catch (error) {
        res.status(500).json({ message: 'Error creating knowledge base', error });
    }
});

// Document Upload (Placeholder for file handling)
router.post('/documents', authenticate, async (req, res) => {
    const { title, fileUrl, knowledgeBaseId } = req.body;
    try {
        const doc = await prisma.document.create({
            data: { title, fileUrl, knowledgeBaseId, status: 'PROCESSING' }
        });
        // Trigger AI service to process document
        res.status(201).json(doc);
    } catch (error) {
        res.status(500).json({ message: 'Error uploading document', error });
    }
});

// Meeting Summary
router.post('/meetings', authenticate, async (req, res) => {
    const { title, date, transcript, organizationId } = req.body;
    try {
        const meeting = await prisma.meeting.create({
            data: { title, date: new Date(date), transcript, organizationId }
        });
        // Trigger AI service to summarize
        res.status(201).json(meeting);
    } catch (error) {
        res.status(500).json({ message: 'Error recording meeting', error });
    }
});

// Get Productivity Insights
router.get('/insights/:orgId', authenticate, async (req: any, res) => {
    const { orgId } = req.params;
    try {
        const insights = await prisma.productivityInsight.findMany({
            where: { organizationId: orgId },
            orderBy: { date: 'desc' }
        });
        res.json(insights);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching insights' });
    }
});

export default router;
