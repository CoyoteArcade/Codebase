import { getStorage, ref, uploadBytes, getDownloadURL, listAll, deleteObject } from "firebase/storage";
import { updateRating, getRating } from "/Users/Yair-/Documents/CSE4550/Coyote-Arcade/Codebase/backend/index.js";

const storage = getStorage();

// const submitRating = async (gameId, vote) => {
//     const gameRef = firebase.firestore().collection('games').doc(gameId);

//     try {
//         await firebase.firestore().runTransaction(async (transaction) => {
//             const gameDoc = await transaction.get(gameRef);
//             if (!gameDoc.exists) {
//                 throw new Error("Document does not exist!");
//             }

//             const newRating = gameDoc.data().rating || { upvotes: 0, downvotes: 0 };
//             if (vote === 'upvote') {
//                 newRating.upvotes += 1;
//             } else if (vote === 'downvote') {
//                 newRating.downvotes += 1;
//             }

//             transaction.update(gameRef, { rating: newRating });
//         });
//     } catch (error) {
//         console.error('Error submitting rating:', error);
//         throw error;
//     }
// };


// const getRatings = async (gameId) => {
//     try {
//         const gameDoc = await firebase.firestore().collection('games').doc(gameId).get();
//         if (!gameDoc.exists) {
//             throw new Error("Document does not exist!");
//         }

//         return gameDoc.data().rating || { upvotes: 0, downvotes: 0 };
//     } catch (error) {
//         console.error('Error retrieving ratings:', error);
//         throw error;
//     }
// };


const main = async () => {
    getRating('2JeMZBuTsjtQhbDEvtKe').then((rating) => {
            console.log(rating);
        }
    );
};

 main()
// const uploadFile = async (file, path) => {
//     if (!file) return;
//     const storageRef = ref(storage, path);
//     try {
//         const snapshot = await uploadBytes(storageRef, file);
//         console.log("Uploaded a blob or file!", snapshot);
//         return snapshot;
//     } catch (error) {
//         console.error("Error uploading file", error);
//         throw error;
//     }
// };

// const getFileUrl = async (path) => {
//     const storageRef = ref(storage, path);
//     try {
//         const url = await getDownloadURL(storageRef);
//         return url;
//     } catch (error) {
//         console.error('Error getting file URL', error);
//         throw error;
//     }
// };

// const deleteFile = async (path) => {
//     const storageRef = ref(storage, path);
//     try {
//         await deleteObject(storageRef);
//         console.log('File deleted successfully');
//     } catch (error) {
//         console.error('Error deleting file', error);
//         throw error;
//     }
// };

// const listFiles = async (path) => {
//     const listRef = ref(storage, path);
//     try {
//         const res = await listAll(listRef);
//         return res.items; // Array of file references
//     } catch (error) {
//         console.error('Error listing files', error);
//         throw error;
//     }
// };

// const main = async () => {
//     const path = "test/test.txt";
//     const uploadedFile = await deleteFile(path);
//     return uploadedFile;
// };