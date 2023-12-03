
import { getFirestore, collection, getDocs, addDoc, query, where, getDoc, updateDoc, doc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, updateProfile, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL, listAll, deleteObject } from "firebase/storage";

import  "dotenv/config";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

const storage = getStorage(app);

/**
 * Get all games or games that match a specific query.
 * @param {Object} q - Query object with property and value to filter games.
 * @param {string} q.prop - Property to filter games.
 * @param {string} q.val - Value to filter games.
 * @returns {Array} - Array of game objects.
 */
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

/**
 * Get all games that belong to a specific category.
 * @param {string} category - Category to filter games.
 * @returns {Array} - Array of game objects.
 */
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
const addGame = async (game=undefined) => {
    if(game === undefined) return;
    const docRef = await addDoc(collection(db, "games"), game);
    console.log("Document written with ID: ", docRef.id);
};

const signIn = async (email, password) => {
    let result;
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("Signed in as: ", user.email);
        console.log("User ID: ", user.uid);
        console.log(user);
        result = { message: "Signed in", user: user };
    } catch (error) {
        console.log("Error signing in: ", error);
        result = { message: "Error signing in", error: error };

    }
    return result;
};

const signOut = async () => {
    let result = {};
    try {
        await auth.signOut();
        console.log("Signed out");
        result = { message: "Signed out" };
    } catch (error) {
        console.log("Error signing out: ", error);
        result = { message: "Error signing out", error: error };
    }
    return result;
};

const signUp = async (email, password, username) => {
    let result = {};
    console.log("signup function called");
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("createUserWithEmailAndPassword called");
        const user = userCredential.user;
        await updateProfile(user, {
            displayName: username
        });
        console.log('user updated');
        result = { message: "Signed up", user: user };
    } catch (error) {
        console.log("createUserWithEmailAndPassword error");
        const errorCode = error.code;
        const errorMessage = error.message;
        result = { message: "Error signing up", errorCode, errorMessage };
        console.log(result);
    }
    return result;
};

const passwordReset = async (email) => {
    let result = {};
    return sendPasswordResetEmail(auth, email)
  .then(() => {
    result = { message: "Password reset email sent to " + email };
    // console.log(result);
    return result;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    result = { message: "Error resetting password", errorCode, errorMessage };
    // console.log(result);
    return result;
  });
};


const listFiles = async (path) => {
    const listRef = ref(storage, path);
    try {
        const res = await listAll(listRef);
        // res.items.forEach(async (itemRef) => {
        //     const url = await getDownloadURL(itemRef);
        //     console.log(url);
        // });
        return res.items; // Array of file references

    } catch (error) {
        console.error('Error listing files', error);
        throw error;
    }
};

const getFileUrl = async (path) => {
    const storageRef = ref(storage, path);
    try {
        const url = await getDownloadURL(storageRef);
        return url;
    } catch (error) {
        console.error('Error getting file URL', error);
        throw error;
    }
};

const uploadFile = async (file, path) => {
    if (!file) return;
    const storageRef = ref(storage, path);
    try {
        const snapshot = await uploadBytes(storageRef, file);
        console.log("Uploaded a blob or file!", snapshot);
        return snapshot;
    } catch (error) {
        console.error("Error uploading file", error);
        throw error;
    }
};

const deleteFile = async (path) => {
    const storageRef = ref(storage, path);
    try {
        await deleteObject(storageRef);
        console.log('File deleted successfully');
    } catch (error) {
        console.error('Error deleting file', error);
        throw error;
    }
};


const updateRating = async (gameId) => {
    const gameRef = doc(db, "games", gameId);
    try {
        const gameDoc = await getDoc(gameRef);
        if (!gameDoc.exists()) {
            console.log('No such document!');
        } else {
            const game = gameDoc.data();
            const newRating = game.rating + 1;
            await updateDoc(gameRef, { rating: newRating });
            console.log('Document updated');
        } 
    } catch (error) {
        console.error('Error updating document', error);
        throw error;
    }  
};

const getRating = async (gameId) => {
    const gameRef = doc(db, 'games', gameId);

    try {
        const gameDoc = await getDoc(gameRef);
        if (!gameDoc.exists()) {
            throw new Error("Game document does not exist!");
        }

        // Return the rating of the game
        return gameDoc.data().rating || 0;
    } catch (error) {
        console.error('Error retrieving game rating:', error);
        throw error;
    }
};


export { getGames, addGame, getCategory, signIn, signOut, signUp, passwordReset, listFiles , getFileUrl, uploadFile, deleteFile, updateRating, getRating};