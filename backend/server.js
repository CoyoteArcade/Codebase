import express from 'express';
import cors from 'cors';
import {
  getGames,
  addGame,
  getCategory,
  signIn,
  signUp,
  signOut,
  passwordReset,
  displayUserProfile,
  getFileUrl,
  listFiles,
  listPrefixes,
  addToFavorites,
  removeFromFavorites,
  addToPurchases,
  removeFromPurchases,
  addToUploads,
  removeFromUploads,
  addVote,
  removeVote,
  updateRating,
} from './index.js';

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
    res.status(201).send({ message: 'Game Added', gameID });
  } catch (error) {
    res.status(500).send({ message: 'Server Error', error });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    let result = await signIn(email, password);
    res.status(200).send(result);
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
    console.log('result', result);
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
    }
    const macFiles = await listFiles(macPath);
    if (macFiles.length > 0) {
      mac = await getFileUrl(`${macPath}${macFiles[0].name}`);
    }
    const linuxFiles = await listFiles(linuxPath);
    if (linuxFiles.length > 0) {
      linux = await getFileUrl(`${linuxPath}${linuxFiles[0].name}`);
    }
    const imageFiles = await listFiles(imagePath);

    for (const file of imageFiles) {
      // console.log(file.name);
      const filePath = `${imagePath}${file.name}`;
      const url = await getFileUrl(filePath);
      imageUrls.push(url);
    }
    res
      .status(200)
      .json({ message: 'Success', images: imageUrls, windows, mac, linux });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Server Error', error });
  }
});

// Grabs all game file urls in one request for GameGrid
app.get('/games/url/gamefiles', async (req, res) => {
  const gameFiles = [];

  try {
    const gameIdFolders = await listPrefixes('/gameFiles');
    for (const gameIdFolder of gameIdFolders) {
      const gameIdPath = gameIdFolder
        .toString()
        .substring(gameIdFolder.root.toString().length);
      const gameId = gameIdPath.replace('gameFiles/', '');
      const windowsPath = `${gameIdPath}/windows/`;
      const macPath = `${gameIdPath}/mac/`;
      const linuxPath = `${gameIdPath}/linux/`;

      let windowsUrl = '';
      let macUrl = '';
      let linuxUrl = '';

      const windowsFiles = await listFiles(windowsPath);
      if (windowsFiles.length > 0) {
        windowsUrl = await getFileUrl(`${windowsPath}${windowsFiles[0].name}`);
      }
      const macFiles = await listFiles(macPath);
      if (macFiles.length > 0) {
        macUrl = await getFileUrl(`${macPath}${macFiles[0].name}`);
      }
      const linuxFiles = await listFiles(linuxPath);
      if (linuxFiles.length > 0) {
        linuxUrl = await getFileUrl(`${linuxPath}${linuxFiles[0].name}`);
      }
      gameFiles.push({
        id: gameId,
        windows: windowsUrl,
        mac: macUrl,
        linux: linuxUrl,
      });
    }
    res.status(200).json({ message: 'Success', gameFiles: gameFiles });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Server Error', error });
  }
});

// Grabs all image urls in one request for use in GameGrid
app.get('/games/url/images', async (req, res) => {
  const images = [];

  try {
    const imageSubFolders = await listPrefixes('/images');
    for (const subFolder of imageSubFolders) {
      const imageUrls = [];
      const gameId = subFolder
        .toString()
        .substring(subFolder.root.toString().length)
        .replace('images/', '');

      const imageFiles = await listFiles(subFolder);
      for (const file of imageFiles) {
        const imagePath = file
          .toString()
          .substring(file.root.toString().length);
        const url = await getFileUrl(imagePath);
        imageUrls.push(url);
      }

      images.push({ id: gameId, urls: imageUrls });
    }
    res.status(200).json({ message: 'Success', images: images });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Server Error', error });
  }
});

app.post('/profile/:id/favorites/update', async (req, res) => {
  // console.log("req.body",req.body);
  // console.log("req.params",req.params);
  const { id } = req.params;
  const { itemId, action } = req.body;
  try {
    let result;
    if (action === 'add') {
      result = await addToFavorites(id, itemId);
    } else if (action === 'remove') {
      result = await removeFromFavorites(id, itemId);
    } else {
      return res.status(400).send({ message: 'Invalid action' });
    }
    res.status(200).send(result);
  } catch (error) {
    // console.log(error);
    res.status(500).send({ message: 'Server Error', error });
  }
});

app.post('/profile/:id/purchases/update', async (req, res) => {
  const { id } = req.params;
  const { itemId, action } = req.body;
  try {
    let result;
    if (action === 'add') {
      result = await addToPurchases(id, itemId);
    } else if (action === 'remove') {
      result = await removeFromPurchases(id, itemId);
    } else {
      return res.status(400).send({ message: 'Invalid action' });
    }
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: 'Server Error', error });
  }
});

app.post('/profile/:id/uploads/update', async (req, res) => {
  const { id } = req.params;
  const { itemId, action } = req.body;
  try {
    let result;
    if (action === 'add') {
      result = await addToUploads(id, itemId);
    } else if (action === 'remove') {
      result = await removeFromUploads(id, itemId);
    } else {
      return res.status(400).send({ message: 'Invalid action' });
    }
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: 'Server Error', error });
  }
});

app.post('/profile/:id/votes/update', async (req, res) => {
  const { id } = req.params;
  const { itemId, action } = req.body;
  try {
    let result;
    if (action === 'add') {
      result = await addVote(id, itemId);
    } else if (action === 'remove') {
      result = await removeVote(id, itemId);
    } else {
      return res.status(400).send({ message: 'Invalid action' });
    }
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: 'Server Error', error });
  }
});

// start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
