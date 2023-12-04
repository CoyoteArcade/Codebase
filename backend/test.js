import { getStorage, ref, uploadBytes, getDownloadURL, listAll, deleteObject } from "firebase/storage";
import { listFiles, addVote, removeVote, addToFavorites, removeFromFavorites, addToPurchases, removeFromPurchases, addToUploads, removeFromUploads } from "./index.js";



const main = async () => {
    const path = "images/FH35cKnCfDdJemAgT1hH/";
    const files = await listFiles(path);
    console.log(files);
};

main();


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