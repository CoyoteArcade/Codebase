
const { getFirestore, collection, getDocs, addDoc, query, where } = require("firebase/firestore");
const { initializeApp } = require("firebase/app");

require("dotenv").config();

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

initializeApp(firebaseConfig);

const db = getFirestore();

const getGames = async (q=undefined) => {
    const gamesCol = collection(db, "games");
    let gameSnapshot;
    if(q === undefined) {
        gameSnapshot = await getDocs(gamesCol);
    } else {
        const { prop, val} = q;
        const parsedQuery = query(gamesCol, where(prop, "==", val));
        gameSnapshot = await getDocs(parsedQuery);
    }
    const gameList = gameSnapshot.docs.map(doc => { 
        const gameObj = doc.data();
        return { id:doc.id, ...gameObj };
    });
    return gameList;
};

const getCategory = async (category=undefined) => {
    if(category === undefined) return;
    const gamesCol = collection(db, "games");
    const parsedQuery = query(gamesCol, where("Category", "array-contains", category));
    const gameSnapshot = await getDocs(parsedQuery);
    const gameList = gameSnapshot.docs.map(doc => {
        let gameObj = doc.data();
        return { id:doc.id, ...gameObj };
    });
    return gameList;
};

const addGame = async (game) => {
    // Add a new document with a generated id.
    // game =  { Title: string, Description: string, Category: [string], "Publisher/Developer": string, Rating: integer, "Release Date": string, "Screenshots/Images": [string], "System Requirements": { Graphics: string, Memory: string, OS: string, Processor: string, Storage: string } };
    const docRef = await addDoc(collection(db, "games"), game);
    console.log("Document written with ID: ", docRef.id);
};

// const newGame = {
//     Title: "Cyberpunk 2077",
//     Description: "Cyberpunk 2077 is an open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification. You play as V, a mercenary outlaw going after a one-of-a-kind implant that is the key to immortality. You can customize your character’s cyberware, skillset and playstyle, and explore a vast city where the choices you make shape the story and the world around you.",
//     Category: ["Action", "Adventure", "RPG"],
//     "Publisher/Developer": "CD Projekt Red",
//     Rating: 44,
//     "Release Date": "2020-12-10",
//     "Screenshots/Images": ["https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/ss_3a0d6d1c7f8b8f9e6b9c7b7b3b6d7b9b2a4f7f7b.jpg?t=1633018251", "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/ss_4a9b6c1e4e1f6e9a0e1c8b4b7a9c7b1b5b7f7f7b.jpg?t=1633018251", "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/ss_7e3a9a1f4c4d3d8e0e8f8b3b9a6d7b1b7b4f7f7b.jpg?t=1633018251"],
//     "System Requirements": {
//         Graphics: "NVIDIA GeForce GTX 780 3GB / AMD Radeon RX 470",
//         Memory: "8 GB",
//         OS: "Windows 10 64-bit",
//         Processor: "Intel Core i5-3570K / AMD FX-8310",
//         Storage: "70 GB"
//     }
// }

// addGame(newGame).then(() => {
//     console.log("Game added");
// });

// getGames().then(games => {
//     console.log(games);
//     process.exit();
// });

module.exports = { getGames, addGame, getCategory };