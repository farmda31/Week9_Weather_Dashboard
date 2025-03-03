import { Router } from 'express';
import apiRoutes from './api/index.js';
import htmlRoutes from './htmlRoutes.js';
import express from 'express';
import path from 'path';

const router = Router();

// Get the directory name from the current module URL
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

// Absolute path to the index.html file
// const absolutePathToIndex = path.join(__dirname, '../../Develop/client/index.html');
const absolutePathToIndex = 'C:\\Users\\danie\\bootcamp\\Git-Lab-Repository\\KU-VIRT-FSF-PT-09-2024-U-LOLC\\09-Servers-and-APIs\\04_Challenge_DF\\Develop\\client\\index.html';

// Serve the index.html file for the root route
router.get('/', (req, res) => {
    console.log(`Request received for root route: ${req.method} ${req.url}`);
    res.sendFile(absolutePathToIndex);
});

// Use API routes
router.use('/api', apiRoutes);

// Serve static files from the Develop/client directory
router.use(express.static(path.join(__dirname, '../../Develop/client'))); // Adjust if needed

// Use HTML routes
router.use('/', htmlRoutes);

export default router;