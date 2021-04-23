//install the client library!
//npm install @google-cloud/vision

//const express = require('express');
//const app = express();
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient({
  keyFilename: 'APIKey.json'
});

// Performs label detection on the image
client
  .objectLocalization('gs://seeingi2/Object.jpeg')
  .then(results => {
    const objects = results[0].localizedObjectAnnotations;

    objects.forEach(object => myConsole.log(`${object.name}`));
    objects.forEach(object => console.log(`${object.name}`));
    
  })

  //catches if there is any error
  .catch(err => {
    console.error('ERROR:', err);
  });

//app.listen(5000, '127.0.0.1', () => console.log('Server running'));


const fs = require('fs');
const myConsole = new console.Console(fs.createWriteStream('./output.txt'))



/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
const bucketName = 'seeingi2';
const filename = 'output.txt';

// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');

// Creates a client
const storage = new Storage();

async function uploadFile() {
  // Uploads a local file to the bucket
  await storage.bucket(bucketName).upload(filename, {
    // Support for HTTP requests made with `Accept-Encoding: gzip`
    gzip: true,
    // By setting the option `destination`, you can change the name of the
    // object you are uploading to a bucket.
    metadata: {
      // Enable long-lived HTTP caching headers
      // Use only if the contents of the file will never change
      // (If the contents will change, use cacheControl: 'no-cache')
      cacheControl: 'public, max-age=31536000',
    },
  });

  console.log(`${filename} uploaded to ${bucketName}.`);
}

uploadFile();
