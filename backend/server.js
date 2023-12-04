import express from 'express';
import cors from 'cors';
import { getGames, addGame, getCategory, signIn, signUp, signOut, passwordReset, displayUserProfile, getFileUrl, listFiles } from './index.js';

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
        const gameID = await addGame(req.body);
        res.status(201).send({message:'Game Added', gameID});
    } catch (error) {
        res.status(500).send({message:'Server Error', error});
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        let result = await signIn(email, password);
        res.status(200).send( result );
    } catch (error) {
        res.status(500).send({ message: 'Server Error' });
    }
});

app.get('/signout', async (req, res) => {
    let result = {};
    try {
        await signOut();
        result = { message: 'Signed out' };
        res.status(200).send(result);
    } catch (error) {
        result = { message: 'Error signing out', error: error };
        res.status(500).send(result);
    }
});

app.post('/signup', async (req, res) => {
    const { email, password, username } = req.body;
    console.log(req.headers);
    console.log(req.body);
    try {
        let result = await signUp(email, password, username);
        console.log("result",result);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ message: 'Server Error', error });
    }
});

app.post('/passwordreset', async (req, res) => {
    const { email } = req.body;
    let result = {};
    // console.log("passwordreset called");
    try {
        result = await passwordReset(email);
        console.log(result);
        res.status(200).send(result);
    } catch (error) {
        result = { message: 'Error resetting password', error: error };
        console.log(result);
        res.status(500).send(result);
    }
});

app.get('/profile/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await displayUserProfile(id);
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
});

app.get('/games/:id/url', async (req, res) => { 
    const { id } = req.params;
    const imagePath = `images/${id}/`;
    const gamePath = `gameFiles/${id}/`;
    const windowsPath = `${gamePath}windows/`;
    const macPath = `${gamePath}mac/`;
    const linuxPath = `${gamePath}linux/`;
    let imageUrls = [];
    let windows = '';
    let mac = '';
    let linux = '';
    try {
        const windowsFiles = await listFiles(windowsPath);
        if (windowsFiles.length > 0) {
            windows = await getFileUrl(`${windowsPath}${windowsFiles[0].name}`);
        };
        const macFiles = await listFiles(macPath);
        if (macFiles.length > 0) {
            mac = await getFileUrl(`${macPath}${macFiles[0].name}`);
        };
        const linuxFiles = await listFiles(linuxPath);
        if (linuxFiles.length > 0) {
            linux = await getFileUrl(`${linuxPath}${linuxFiles[0].name}`);
        };
        const imageFiles = await listFiles(imagePath);
        for (const file of imageFiles) {
            console.log(file.name);
            const filePath = `${imagePath}${file.name}`;
            const url = await getFileUrl(filePath);
            imageUrls.push(url);
        }
        res.status(200).json({message: "Success",images:imageUrls, windows, mac, linux});
    } catch (error) {
        console.log(error);
        res.status(500).send({message:'Server Error', error});
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
