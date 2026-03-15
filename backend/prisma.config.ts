import { defineConfig } from '@prisma/config';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export default defineConfig({
    earlyAccess: true,
    // Schema configuration is implicitly handled or define explicit URL access if needed
});
