const { initializeApp } = require("@firebase/app");
const { getStorage} = require("@firebase/storage");
require("dotenv").config()

const firebaseConfig = {
  apiKey:process.env.apiKey,
  authDomain:process.env.authDomain,
  projectId:process.env.projectId,
  storageBucket:process.env.storageBucket,
  messagingSenderId:process.env.messagingSenderId,
  appId:process.env.appId,
  measurementId:process.env.measurementId,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);


// const uploadFiles= (async(files)=>{
//   const downloadUrls = [];
//   for (const file of files) {
//     const uniqueFilename = `${file.originalname}-${Date.now()}`;
//     const storageRef = ref(storage, `${uniqueFilename}`);
//     await uploadBytes(storageRef, file.buffer);
//     const downloadUrl = await getDownloadURL(storageRef);
//     downloadUrls.push(downloadUrl);
//   }

// return downloadUrls;
// })

// const uploadSingleFile = (async(file)=>{
//   const uniqueFilename = `${file.originalname}-${Date.now()}`;
//   const storageRef = ref(storage, `${uniqueFilename}`);
//   await uploadBytes(storageRef, file.buffer);
//   const result= await getDownloadURL(storageRef);
//   let downloadUrl=result;
//   return downloadUrl
// })

// const uploadSingleFile2 = (async(file)=>{
//   const uniqueFilename = `${file[0].originalname}-${Date.now()}`;
//   const storageRef = ref(storage, `${uniqueFilename}`);
//   await uploadBytes(storageRef, file[0].buffer);
//   const result= await getDownloadURL(storageRef);
//   let downloadUrl=result;
//   return downloadUrl
// })



module.exports = {storage}
