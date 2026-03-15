import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import workspaceRoutes from './routes/workspace.routes';
import officeRoutes from './routes/office.routes';
import securityRoutes from './routes/security.routes';
import aiRoutes from './routes/ai.routes';

dotenv.config();

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/workspaces', workspaceRoutes);
app.use('/api/v1/office', officeRoutes);
app.use('/api/v1/security', securityRoutes);
app.use('/api/v1/ai', aiRoutes);

// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', service: 'Vexel-Backend' });
});

export default app;
