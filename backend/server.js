import express from 'express';
import cors from 'cors';
import { getGames, addGame, getCategory } from './index.js'; // Replace 'yourProvidedCodeFile' with the name of the file that contains the provided code.

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/games', async (req, res) => {
    const { prop, val } = req.query;
    try {
        const games = await getGames(prop && val ? { prop, val } : undefined);
        res.status(200).json(games);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

app.get('/games/category/:category', async (req, res) => {
    const { category } = req.params;
    try {
        const games = await getCategory(category);
        res.status(200).json(games);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

app.post('/games', async (req, res) => {
    try {
        await addGame(req.body);
        res.status(201).send('Game Added');
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
