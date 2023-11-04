import { getFirestore, collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

initializeApp(firebaseConfig);

const db = getFirestore();

/**
 * Get all games or games that match a specific query.
 * @param {Object} q - Query object with property and value to filter games.
 * @param {string} q.prop - Property to filter games.
 * @param {string} q.val - Value to filter games.
 * @returns {Array} - Array of game objects.
 */
const getGames = async (q = undefined) => {
  const gamesCol = collection(db, 'games');
  let gameSnapshot;
  if (q === undefined) {
    gameSnapshot = await getDocs(gamesCol);
  } else {
    const { prop, val } = q;
    const parsedQuery = query(gamesCol, where(prop, '==', val));
    gameSnapshot = await getDocs(parsedQuery);
  }
  const gameList = gameSnapshot.docs.map((doc) => {
    const gameObj = doc.data();
    return { id: doc.id, ...gameObj };
  });
  return gameList;
};

/**
 * Get all games that belong to a specific category.
 * @param {string} category - Category to filter games.
 * @returns {Array} - Array of game objects.
 */
const getCategory = async (category = undefined) => {
  if (category === undefined) return;
  const gamesCol = collection(db, 'games');
  const parsedQuery = query(gamesCol, where('Category', 'array-contains', category));
  const gameSnapshot = await getDocs(parsedQuery);
  const gameList = gameSnapshot.docs.map((doc) => {
    let gameObj = doc.data();
    return { id: doc.id, ...gameObj };
  });
  return gameList;
};

/**
 * Add a new game to the database.
 * @param {Object} game - Game object to add to the database.
 * @param {string} game.Title - Title of the game.
 * @param {string} game.Description - Description of the game.
 * @param {Array} game.Category - Array of categories the game belongs to.
 * @param {string} game.Publisher/Developer - Publisher or developer of the game.
 * @param {number} game.Rating - Rating of the game.
 * @param {string} game.Release Date - Release date of the game.
 * @param {Array} game.Screenshots/Images - Array of URLs for screenshots or images of the game.
 * @param {Object} game.System Requirements - Object containing system requirements for the game.
 * @param {string} game.System Requirements.Graphics - Graphics card required for the game.
 * @param {string} game.System Requirements.Memory - Amount of memory required for the game.
 * @param {string} game.System Requirements.OS - Operating system required for the game.
 * @param {string} game.System Requirements.Processor - Processor required for the game.
 * @param {string} game.System Requirements.Storage - Amount of storage required for the game.
 */
const addGame = async (game = undefined) => {
  if (game === undefined) return;
  const docRef = await addDoc(collection(db, 'games'), game);
  // console.log('Document written with ID: ', docRef.id);
};

export { getGames, addGame, getCategory };
