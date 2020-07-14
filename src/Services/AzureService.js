const { BlobServiceClient} = require("@azure/storage-blob");
const account = "mediumdemo";
const sas = "https://mediumdemo.blob.core.windows.net/?sv=2019-10-10&ss=bfqt&srt=sco&sp=rwdlacupx&se=2020-07-20T04:57:23Z&st=2020-07-12T20:57:23Z&spr=https,http&sig=6XD1J2guFtWk9myStmOk1P32Z%2FBdGibLVxspvvsVNvw%3D"
const blobServiceClient = new BlobServiceClient(sas);

const blobUri = 'https://' + account + '.blob.core.windows.net'
const Name = "mycontainer"
// Get a container client from the BlobServiceClient
const containerClient = blobServiceClient.getContainerClient(Name);


const createContainer = async (containerName) => {
  try {
     console.log(`Creating container "${containerName}"...`);
     await containerClient.create()   
      console.log(`Done.`);
  } catch (error) {
      console.log(error.message);
  }
};


const uploadFiles = async (files) => {
  try {
      console.log("Uploading files...");
      const promises = [];
      for (const file of files) {
          const blockBlobClient = containerClient.getBlockBlobClient(file.name);
          promises.push(blockBlobClient.uploadBrowserData(file));
      }
      await Promise.all(promises);
      console.log("Done.");
     return `${blobUri}/${Name}/${files[0].name}`
  }
  catch (error) {
 
 console.log(error.message);
  }
}


function Upload(files){
    createContainer(Name)
   return uploadFiles(files)
}

module.exports={
Upload
}


/// `https://${account}.blob.core.windows.net${sas}`  