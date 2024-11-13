// import {
  // collection,
  // getDocs,
  // addDoc,
  // query,
  // where,
  // getDoc,
  // updateDoc,
  // doc,
  // setDoc,
// } from 'firebase-admin/firestore';
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue, Filter } from 'firebase-admin/firestore';
import { getDownloadURL, getStorage } from 'firebase-admin/storage';
// import {
//   getAuth,
//   signInWithEmailAndPassword,
//   updateProfile,
//   createUserWithEmailAndPassword,
//   sendPasswordResetEmail,
// } from 'firebase/auth';
// import {
//   getStorage,
//   ref,
//   uploadBytes,
//   getDownloadURL,
//   listAll,
//   deleteObject,
// } from 'firebase/storage';

import 'dotenv/config';
import serviceAccount from './serviceAccountKey.json' assert { type: 'json' };

// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
//   measurementId: process.env.FIREBASE_MEASUREMENT_ID,
// };

const app = initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore(app);

// const auth = getAuth(app);

const storage = getStorage().bucket(process.env.FIREBASE_STORAGE_BUCKET);

/**
 * Get all games or games that match a specific query.
 * @param {Object} q - Query object with property and value to filter games.
 * @param {string} q.prop - Property to filter games.
 * @param {string} q.val - Value to filter games.
 * @returns {Array} - Array of game objects.
 */
const getGames = async (q = undefined) => {
  const gamesCol = db.collection('games');
  let gameSnapshot;
  if (q === undefined) {
    try {
      gameSnapshot = await gamesCol.get();
    } catch (error) {
      console.error('Error getting documents', error);
      throw error;
    }
  } else {
    const { prop, val } = q;
    gameSnapshot = await gamesCol.where(prop, '==', val).get();
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
  const gamesCol = db.collection('games');
  const parsedQuery = gamesCol.where('categories', 'array-contains', category);
  const gameSnapshot = await parsedQuery.get();
  const gameList = gameSnapshot.docs.map((doc) => {
    const gameObj = doc.data();
    return { id: doc.id, ...gameObj };
  });
  return gameList;
};

/**
 * Add a new game to the database.
 * @param {Object} game - Game object to add to the database.
 * @param {string} game.title - Title of the game.
 * @param {string} game.description - Description of the game.
 * @param {Array} game.categories - Array of categories the game belongs to.
 * @param {string} game.developer - Publisher or developer of the game.
 * @param {number} game.rating - Rating of the game.
 * @param {string} game.releaseDate Date - Release date of the game.
 * @param {Array} game.images - Array of URLs for screenshots or images of the game.
 * @param {Array} game.platforms - Array of platforms the game is available on.
 * @param {string} game.tagline - Short tagline or slogan for the game.
 * @param {string} game.video - URL for a video trailer or gameplay footage.
 */
const addGame = async (game = undefined) => {
  if (game === undefined) return;
  try {
    const docRef = await db.collection('games').add(game);
    console.log('Document written with ID: ', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding document: ', error);
    throw error;
  }
};

// const signIn = async (email, password) => {
//   let result;
//   try {
//     const userCredential = await signInWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     const user = userCredential.user;
//     console.log('Signed in as: ', user.email);
//     console.log('User ID: ', user.uid);
//     console.log(user);
//     result = { message: 'Signed in', user: user };
//   } catch (error) {
//     console.log('Error signing in: ', error);
//     result = { message: 'Error signing in', error: error };
//   }
//   return result;
// };

// const signOut = async () => {
//   let result = {};
//   try {
//     await auth.signOut();
//     console.log('Signed out');
//     result = { message: 'Signed out' };
//   } catch (error) {
//     console.log('Error signing out: ', error);
//     result = { message: 'Error signing out', error: error };
//   }
//   return result;
// };

// const signUp = async (email, password, username) => {
//   let result = {};
//   console.log('signup function called');
//   try {
//     const userCredential = await createUserWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     console.log('createUserWithEmailAndPassword called');
//     const user = userCredential.user;
//     await updateProfile(user, {
//       displayName: username,
//     });
//     await setDoc(doc(db, 'users', user.uid), {
//       username: username,
//       email: email,
//       favorites: [],
//       purchases: [],
//       uploads: [],
//       voted: [],
//     });
//     console.log('user updated');
//     result = { message: 'Signed up', user: user };
//   } catch (error) {
//     console.log('createUserWithEmailAndPassword error');
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     result = { message: 'Error signing up', errorCode, errorMessage };
//     console.log(result);
//   }
//   return result;
// };

// const passwordReset = async (email) => {
//   let result = {};
//   return sendPasswordResetEmail(auth, email)
//     .then(() => {
//       result = { message: 'Password reset email sent to ' + email };
//       // console.log(result);
//       return result;
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       result = { message: 'Error resetting password', errorCode, errorMessage };
//       // console.log(result);
//       return result;
//     });
// };

/**
 * Get the image urls for all provided game IDs.
 * @param {Array} gameIds 
 * @returns {Object} - Object with game IDs as keys and image URLs as values.
 * @example
 * {
 *  'gameId1': ['url1', 'url2', 'url3'],
 * 'gameId2': ['url4', 'url5', 'url6'],
 * }
 */
const getGameImages = async (gameIds) => {
  let images = {};
  // console.log('Getting images for game IDs:', gameIds);
  try {
    for (const gameId of gameIds) {
      const imageUrls = [];
      const [files] = await storage.getFiles({ prefix: `images/${gameId}/` });

      for (const file of files) {
        const url = await getDownloadURL(file);
        imageUrls.push(url);
      }

      images[gameId] = imageUrls;
    }

    return images;
  }
  catch (error) {
    console.error('Error getting game images:', error);
    throw error;
  }
};
  

// const uploadFile = async (file, path) => {
//   if (!file) return;
//   const storageRef = ref(storage, path);
//   try {
//     const snapshot = await uploadBytes(storageRef, file);
//     console.log('Uploaded a blob or file!', snapshot);
//     return snapshot;
//   } catch (error) {
//     console.error('Error uploading file', error);
//     throw error;
//   }
// };

// const deleteFile = async (path) => {
//   const storageRef = ref(storage, path);
//   try {
//     await deleteObject(storageRef);
//     console.log('File deleted successfully');
//   } catch (error) {
//     console.error('Error deleting file', error);
//     throw error;
//   }
// };

// const updateRating = async (gameId, ratingChange) => {
//   const gameRef = doc(db, 'games', gameId);
//   try {
//     const gameDoc = await getDoc(gameRef);
//     if (!gameDoc.exists()) {
//       console.log('No such document!');
//     } else {
//       const game = gameDoc.data();
//       let newRating = game.rating;
//       if (ratingChange === 'add') {
//         newRating = game.rating + 1;
//       } else if (ratingChange === 'remove') {
//         newRating = game.rating - 1;
//       }
//       await updateDoc(gameRef, { rating: newRating });
//       console.log('Document updated');
//     }
//   } catch (error) {
//     console.error('Error updating document', error);
//     throw error;
//   }
// };

// const getRating = async (gameId) => {
//   const gameRef = doc(db, 'games', gameId);

//   try {
//     const gameDoc = await getDoc(gameRef);
//     if (!gameDoc.exists()) {
//       throw new Error('Game document does not exist!');
//     }

//     // Return the rating of the game
//     return gameDoc.data().rating || 0;
//   } catch (error) {
//     console.error('Error retrieving game rating:', error);
//     throw error;
//   }
// };

// const displayUserProfile = async (userId) => {
//   if (!userId) {
//     console.error('Error: User ID is required');
//     return;
//   }
//   const userRef = doc(db, 'users', userId);

//   try {
//     const userDoc = await getDoc(userRef);
//     if (!userDoc.exists()) {
//       throw new Error('User document does not exist!');
//     }

//     const userData = userDoc.data();
//     console.log('User Profile:', userData);
//     return userData;
//   } catch (error) {
//     console.error('Error displaying user profile:', error);
//     throw error;
//   }
// };

// const addToFavorites = async (userId, itemId) => {
//   if (!userId) {
//     console.error('Error: User ID is required');
//     return;
//   }
//   const userRef = doc(db, 'users', userId);
//   try {
//     const userDoc = await getDoc(userRef);
//     if (!userDoc.exists()) {
//       throw new Error('User document does not exist!');
//     }
//     const userData = userDoc.data();
//     const favorites = new Set(userData.favorites || []);
//     favorites.add(itemId);
//     await updateDoc(userRef, { favorites: Array.from(favorites) });
//     console.log('Favorites updated');
//     return Array.from(favorites);
//   } catch (error) {
//     console.error('Error updating favorites:', error);
//     throw error;
//   }
// };

// const removeFromFavorites = async (userId, itemId) => {
//   if (!userId) {
//     console.error('Error: User ID is required');
//     return;
//   }
//   const userRef = doc(db, 'users', userId);
//   try {
//     const userDoc = await getDoc(userRef);
//     if (!userDoc.exists()) {
//       throw new Error('User document does not exist!');
//     }
//     const userData = userDoc.data();
//     const favorites = new Set(userData.favorites || []);
//     favorites.delete(itemId);
//     await updateDoc(userRef, { favorites: Array.from(favorites) });
//     console.log('Favorite removed');
//     return Array.from(favorites);
//   } catch (error) {
//     console.error('Error removing favorite:', error);
//     throw error;
//   }
// };

// const addToPurchases = async (userId, itemId) => {
//   if (!userId) {
//     console.error('Error: User ID is required');
//     return;
//   }
//   const userRef = doc(db, 'users', userId);
//   try {
//     const userDoc = await getDoc(userRef);
//     if (!userDoc.exists()) {
//       throw new Error('User document does not exist!');
//     }
//     const userData = userDoc.data();
//     const purchases = new Set(userData.purchases || []);
//     purchases.add(itemId);
//     await updateDoc(userRef, { purchases: Array.from(purchases) });
//     console.log('Purchases updated');
//   } catch (error) {
//     console.error('Error updating purchases:', error);
//     throw error;
//   }
// };

// const removeFromPurchases = async (userId, itemId) => {
//   if (!userId) {
//     console.error('Error: User ID is required');
//     return;
//   }
//   const userRef = doc(db, 'users', userId);
//   try {
//     const userDoc = await getDoc(userRef);
//     if (!userDoc.exists()) {
//       throw new Error('User document does not exist!');
//     }
//     const userData = userDoc.data();
//     const purchases = new Set(userData.purchases || []);
//     purchases.delete(itemId);
//     await updateDoc(userRef, { purchases: Array.from(purchases) });
//     console.log('Purchase removed');
//   } catch (error) {
//     console.error('Error removing purchase:', error);
//     throw error;
//   }
// };

// const addToUploads = async (userId, itemId) => {
//   if (!userId) {
//     console.error('Error: User ID is required');
//     return;
//   }
//   const userRef = doc(db, 'users', userId);
//   try {
//     const userDoc = await getDoc(userRef);
//     if (!userDoc.exists()) {
//       throw new Error('User document does not exist!');
//     }
//     const userData = userDoc.data();
//     const uploads = new Set(userData.uploads || []);
//     uploads.add(itemId);
//     await updateDoc(userRef, { uploads: Array.from(uploads) });
//     console.log('Uploads updated');
//   } catch (error) {
//     console.error('Error updating uploads:', error);
//     throw error;
//   }
// };

// const removeFromUploads = async (userId, itemId) => {
//   if (!userId) {
//     console.error('Error: User ID is required');
//     return;
//   }
//   const userRef = doc(db, 'users', userId);
//   try {
//     const userDoc = await getDoc(userRef);
//     if (!userDoc.exists()) {
//       throw new Error('User document does not exist!');
//     }
//     const userData = userDoc.data();
//     const uploads = new Set(userData.uploads || []);
//     uploads.delete(itemId);
//     await updateDoc(userRef, { uploads: Array.from(uploads) });
//     console.log('Upload removed');
//   } catch (error) {
//     console.error('Error removing upload:', error);
//     throw error;
//   }
// };

// const addVote = async (userId, itemId) => {
//   if (!userId) {
//     console.error('Error: User ID is required');
//     return;
//   }
//   const userRef = doc(db, 'users', userId);
//   try {
//     const userDoc = await getDoc(userRef);
//     if (!userDoc.exists()) {
//       throw new Error('User document does not exist!');
//     }
//     const userData = userDoc.data();
//     const voted = new Set(userData.voted || []); // Make sure 'voted' is defined
//     if (voted.has(itemId)) {
//       console.log('User has already voted for this item');
//       return;
//     }
//     updateRating(itemId, 'add');
//     voted.add(itemId);
//     await updateDoc(userRef, { voted: Array.from(voted) }); // Use 'voted' here
//     console.log('Vote updated');
//   } catch (error) {
//     console.error('Error updating votes:', error);
//     throw error;
//   }
// };

// const removeVote = async (userId, itemId) => {
//   if (!userId) {
//     console.error('Error: User ID is required');
//     return;
//   }
//   const userRef = doc(db, 'users', userId);
//   try {
//     const userDoc = await getDoc(userRef);
//     if (!userDoc.exists()) {
//       throw new Error('User document does not exist!');
//     }
//     const userData = userDoc.data();
//     const voted = new Set(userData.voted || []);
//     if (!voted.has(itemId)) {
//       console.log('User has not voted for this item');
//       return;
//     }
//     updateRating(itemId, 'remove');
//     voted.delete(itemId);
//     await updateDoc(userRef, { voted: Array.from(voted) });
//     console.log('Vote removed');
//   } catch (error) {
//     console.error('Error removing vote:', error);
//     throw error;
//   }
// };

export {
  getGames,
  addGame,
  getCategory,
  // signIn,
  // signOut,
  // signUp,
  // passwordReset,
  getGameImages,
  // uploadFile,
  // deleteFile,
  // updateRating,
  // getRating,
  // displayUserProfile,
  // addToFavorites,
  // removeFromFavorites,
  // addToPurchases,
  // removeFromPurchases,
  // addToUploads,
  // removeFromUploads,
  // addVote,
  // removeVote,
};
